#include "WiFi_Config.h"

// External references
extern String ssid;
extern String password;
extern bool configMode;
extern String relayId;

// WiFi connection state
bool wifiConnected = false;
unsigned long lastWiFiCheck = 0;
const unsigned long WIFI_CHECK_INTERVAL = 30000; // 30 seconds

bool initializeWiFi() {
  Serial.println("=== Initializing WiFi ===");
  
  loadWiFiConfig();
  
  if (ssid.length() > 0) {
    Serial.print("Attempting to connect to: ");
    Serial.println(ssid);
    
    if (connectToWiFi(ssid, password)) {
      Serial.println("WiFi connected successfully");
      wifiConnected = true;
      return true;
    } else {
      Serial.println("Failed to connect to saved WiFi");
    }
  }
  
  Serial.println("Starting configuration portal");
  return startConfigPortal();
}

void loadWiFiConfig() {
  prefs.begin("wifi", true);
  ssid = prefs.getString("ssid", "");
  password = prefs.getString("password", "");
  relayId = prefs.getString("relay_id", "RELAY_01");
  prefs.end();
  
  if (ssid.length() > 0) {
    Serial.print("Loaded WiFi config - SSID: ");
    Serial.println(ssid);
    Serial.print("Relay ID: ");
    Serial.println(relayId);
  }
}

void saveWiFiConfig() {
  prefs.begin("wifi", false);
  prefs.putString("ssid", ssid);
  prefs.putString("password", password);
  prefs.putString("relay_id", relayId);
  prefs.end();
  
  Serial.println("WiFi configuration saved");
}

bool connectToWiFi(const String& ssid, const String& password) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), password.c_str());
  
  int attempts = 0;
  const int maxAttempts = 20;
  
  while (WiFi.status() != WL_CONNECTED && attempts < maxAttempts) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  Serial.println();
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Connected to WiFi! IP: ");
    Serial.println(WiFi.localIP());
    return true;
  }
  
  return false;
}

bool startConfigPortal() {
  Serial.println("Starting WiFi configuration portal");
  
  WiFi.mode(WIFI_AP);
  WiFi.softAP("LoRa-Relay", "");
  
  Serial.print("Config portal started at: ");
  Serial.println(WiFi.softAPIP());
  
  // Setup web server routes
  server.on("/", HTTP_GET, handleRoot);
  server.on("/config", HTTP_GET, handleConfig);
  server.on("/save", HTTP_POST, handleSave);
  server.on("/relay", HTTP_GET, handleRelay);
  server.on("/api/status", HTTP_GET, handleAPI);
  
  server.begin();
  configMode = true;
  
  return true;
}

void stopConfigPortal() {
  server.end();
  WiFi.softAPdisconnect(true);
  configMode = false;
  Serial.println("Configuration portal stopped");
}

void handleRoot(AsyncWebServerRequest *request) {
  String html = "<!DOCTYPE html><html><head>";
  html += "<title>LoRa Relay Configuration</title>";
  html += "<style>body{font-family:Arial;margin:40px;background:#f0f0f0}";
  html += ".container{background:white;padding:30px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}";
  html += "h1{color:#333;text-align:center}";
  html += "form{margin:20px 0}";
  html += "input[type=text],input[type=password]{width:100%;padding:10px;margin:10px 0;border:1px solid #ddd;border-radius:5px}";
  html += "button{background:#007cba;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;width:100%}";
  html += "button:hover{background:#005a87}";
  html += ".info{background:#e8f4f8;padding:15px;border-radius:5px;margin:10px 0}";
  html += "</style></head><body>";
  html += "<div class='container'>";
  html += "<h1>LoRa Relay Configuration</h1>";
  html += "<div class='info'>";
  html += "<h3>System Information</h3>";
  html += "<p><strong>Relay ID:</strong> " + relayId + "</p>";
  html += "<p><strong>Status:</strong> Configuration Mode</p>";
  html += "<p><strong>LoRa:</strong> " + getLoRaRelayStatus() + "</p>";
  html += "</div>";
  html += "<h3>WiFi Configuration</h3>";
  html += "<form action='/save' method='POST'>";
  html += "<input type='text' name='relay_id' placeholder='Relay ID' value='" + relayId + "'>";
  html += "<input type='text' name='ssid' placeholder='WiFi SSID' value='" + ssid + "'>";
  html += "<input type='password' name='password' placeholder='WiFi Password'>";
  html += "<button type='submit'>Save & Connect</button>";
  html += "</form>";
  html += "<p><a href='/relay'>View Relay Status</a> | <a href='/api/status'>API Status</a></p>";
  html += "</div></body></html>";
  
  request->send(200, "text/html", html);
}

void handleConfig(AsyncWebServerRequest *request) {
  // Redirect to root
  request->redirect("/");
}

void handleSave(AsyncWebServerRequest *request) {
  if (request->hasParam("relay_id", true)) {
    relayId = request->getParam("relay_id", true)->value();
  }
  
  if (request->hasParam("ssid", true)) {
    ssid = request->getParam("ssid", true)->value();
  }
  
  if (request->hasParam("password", true)) {
    password = request->getParam("password", true)->value();
  }
  
  saveWiFiConfig();
  
  String html = "<!DOCTYPE html><html><head>";
  html += "<title>Configuration Saved</title>";
  html += "<meta http-equiv='refresh' content='5;url=/'>";
  html += "</head><body>";
  html += "<h1>Configuration Saved!</h1>";
  html += "<p>Attempting to connect to: " + ssid + "</p>";
  html += "<p>Device will restart in a few seconds...</p>";
  html += "</body></html>";
  
  request->send(200, "text/html", html);
  
  // Attempt connection
  delay(1000);
  stopConfigPortal();
  
  if (connectToWiFi(ssid, password)) {
    wifiConnected = true;
    Serial.println("WiFi connected after configuration");
  } else {
    Serial.println("Failed to connect, restarting config portal");
    delay(2000);
    ESP.restart();
  }
}

void handleRelay(AsyncWebServerRequest *request) {
  String html = "<!DOCTYPE html><html><head>";
  html += "<title>LoRa Relay Status</title>";
  html += "<meta http-equiv='refresh' content='10'>";
  html += "<style>body{font-family:Arial;margin:20px;background:#f0f0f0}";
  html += ".container{background:white;padding:20px;border-radius:10px}";
  html += ".status{background:#e8f4f8;padding:10px;border-radius:5px;margin:10px 0}";
  html += ".stat{display:inline-block;margin:10px;padding:10px;background:#f8f8f8;border-radius:5px}";
  html += "</style></head><body>";
  html += "<div class='container'>";
  html += "<h1>LoRa Relay Status</h1>";
  html += "<div class='status'>";
  html += "<h3>System Status</h3>";
  html += "<p><strong>Relay ID:</strong> " + relayId + "</p>";
  html += "<p><strong>LoRa Status:</strong> " + getLoRaRelayStatus() + "</p>";
  html += "<p><strong>WiFi Status:</strong> " + getWiFiStatus() + "</p>";
  html += "<p><strong>Last Received From:</strong> " + lastReceivedFrom + "</p>";
  html += "</div>";
  html += "<h3>Statistics</h3>";
  html += "<div class='stat'>Received: " + String(getTotalReceivedPackets()) + "</div>";
  html += "<div class='stat'>Forwarded: " + String(getTotalForwardedPackets()) + "</div>";
  html += "<div class='stat'>Duplicates: " + String(getTotalDuplicatePackets()) + "</div>";
  html += "<p><a href='/'>Back to Configuration</a></p>";
  html += "</div></body></html>";
  
  request->send(200, "text/html", html);
}

void handleAPI(AsyncWebServerRequest *request) {
  JsonDocument doc;
  doc["relay_id"] = relayId;
  doc["lora_status"] = getLoRaRelayStatus();
  doc["wifi_status"] = getWiFiStatus();
  doc["last_received_from"] = lastReceivedFrom;
  doc["stats"]["received"] = getTotalReceivedPackets();
  doc["stats"]["forwarded"] = getTotalForwardedPackets();
  doc["stats"]["duplicates"] = getTotalDuplicatePackets();
  doc["uptime"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  request->send(200, "application/json", jsonString);
}

void handleWiFiConfig() {
  // Handle any WiFi configuration tasks
  if (configMode) {
    // In config mode, just keep the server running
    return;
  }
  
  checkWiFiConnection();
}

bool isWiFiConnected() {
  return WiFi.status() == WL_CONNECTED;
}

String getWiFiStatus() {
  switch (WiFi.status()) {
    case WL_CONNECTED:
      return "Connected (" + WiFi.localIP().toString() + ")";
    case WL_NO_SSID_AVAIL:
      return "SSID not available";
    case WL_CONNECT_FAILED:
      return "Connection failed";
    case WL_CONNECTION_LOST:
      return "Connection lost";
    case WL_DISCONNECTED:
      return "Disconnected";
    default:
      return "Unknown";
  }
}

void checkWiFiConnection() {
  unsigned long currentTime = millis();
  
  if (currentTime - lastWiFiCheck > WIFI_CHECK_INTERVAL) {
    lastWiFiCheck = currentTime;
    
    if (!isWiFiConnected() && !configMode) {
      Serial.println("WiFi disconnected, attempting reconnection...");
      attemptWiFiReconnection();
    }
  }
}

void attemptWiFiReconnection() {
  if (ssid.length() > 0) {
    Serial.print("Reconnecting to ");
    Serial.println(ssid);
    
    if (connectToWiFi(ssid, password)) {
      Serial.println("WiFi reconnected successfully");
      wifiConnected = true;
    } else {
      Serial.println("WiFi reconnection failed");
      wifiConnected = false;
    }
  }
}