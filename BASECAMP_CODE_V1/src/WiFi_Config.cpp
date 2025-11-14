#include "WiFi_Config.h"
#include <Adafruit_SSD1306.h>
#include "Common.h"

// External references
extern Adafruit_SSD1306 display;
extern Preferences prefs;
extern AsyncWebServer server;
extern DNSServer dns;
extern const char* apSSID;
extern bool signupOK;
extern bool configModeActive;

// Forward declarations
void initializeFirebase();

// === CONFIG BUTTON HANDLING ===
void checkConfigButton() {
  static unsigned long lastDebounceTime = 0;
  static bool lastButtonState = HIGH;
  static bool configMode = false;
  
  bool currentButtonState = digitalRead(CONFIG);
  
  if (currentButtonState != lastButtonState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > 50) {
    if (currentButtonState == LOW && !configMode) {
      configMode = true;
      configModeActive = true; // Set global flag
      
      display.clearDisplay();
      display.setCursor(0,0);
      display.setTextSize(1);
      display.println("CONFIG MODE");
      display.setCursor(0,10);
      display.println("Starting Portal...");
      display.display();
      delay(1000);
      
      startConfigPortal();
    }
  }
  
  lastButtonState = currentButtonState;
}

void initializeWiFi() {
  display.clearDisplay();
  display.setCursor(0,0);
  display.setTextSize(1);
  display.println("WiFi Connecting...");
  display.display();
  
  // Load stored WiFi credentials
  prefs.begin("config", false);
  String wifiSSID = prefs.getString("wifi_ssid", WIFI_SSID);
  String wifiPassword = prefs.getString("wifi_password", WIFI_PASSWORD);
  prefs.end();
  
  Serial.print("Connecting to WiFi: ");
  Serial.println(wifiSSID);
  
  WiFi.begin(wifiSSID.c_str(), wifiPassword.c_str());
  int wifiAttempts = 0;
  
  while (WiFi.status() != WL_CONNECTED && wifiAttempts < 20) {
    delay(300);
    Serial.print(".");
    
    // Update progress on display without overlap
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("WiFi Connecting...");
    display.setCursor(0,10);
    // Truncate SSID if too long for display
    String displaySSID = wifiSSID;
    if (displaySSID.length() > 16) {
      displaySSID = displaySSID.substring(0, 16);
    }
    display.print("SSID: ");
    display.println(displaySSID);
    display.setCursor(0,20);
    for (int i = 0; i < (wifiAttempts / 2); i++) {
      display.print(".");
    }
    display.setCursor(0,30);
    display.print("Attempt: ");
    display.print(wifiAttempts + 1);
    display.print("/20");
    display.display();
    
    wifiAttempts++;
  }
  
  display.clearDisplay();
  display.setCursor(0,0);
  display.setTextSize(1);
  
  if (WiFi.status() == WL_CONNECTED) {
    display.println("WiFi: Connected");
    display.setCursor(0,10);
    display.print("IP: ");
    display.println(WiFi.localIP());
    display.setCursor(0,20);
    display.println("Initializing Firebase...");
    display.display();
    Serial.println("\nWiFi connected");
    
    initializeFirebase();
    
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("WiFi: Connected");
    display.setCursor(0,10);
    display.println("Firebase: Ready");
    display.setCursor(0,20);
    display.print("IP: ");
    display.println(WiFi.localIP());
    display.display();
  } else {
    display.println("WiFi: Failed");
    display.setCursor(0,10);
    display.println("Operating offline");
    display.setCursor(0,20);
    display.println("No network access");
    Serial.println("\nWiFi connection failed");
  }
  display.display();
  delay(2000);
}

void showConfigPortalDisplay(IPAddress apIP) {
  // Persistent config portal display
  display.clearDisplay();
  display.setCursor(0,0);
  display.setTextSize(1);
  display.println("CONFIG PORTAL");
  display.setCursor(0,10);
  display.print("SSID: ");
  display.println(apSSID);
  display.setCursor(0,20);
  display.print("IP: ");
  display.println(apIP);
  display.setCursor(0,30);
  display.println("Connect & browse to:");
  display.setCursor(0,40);
  display.println(apIP);
  display.setCursor(0,50);
  display.println("Press RESET to exit");
  display.display();
}

void startConfigPortal() {
  // Start Access Point
  WiFi.softAP(apSSID);
  IPAddress apIP = WiFi.softAPIP();
  dns.start(53, "*", apIP);
  
  Serial.println("Config Portal Started");
  Serial.print("SSID: ");
  Serial.println(apSSID);
  Serial.print("IP: ");
  Serial.println(apIP);
  
  // Show initial config portal display
  showConfigPortalDisplay(apIP);

  // Load current settings
  prefs.begin("config", false);
  uint32_t currentSync = prefs.getUInt("sync_word", 0xF3);
  bool currentGpsEnabled = prefs.getBool("gps_enabled", false);
  String currentWifiSSID = prefs.getString("wifi_ssid", WIFI_SSID);
  String currentWifiPassword = prefs.getString("wifi_password", WIFI_PASSWORD);
  String currentFirebaseUrl = prefs.getString("firebase_url", DEFAULT_DATABASE_URL);
  String currentFirebaseApiKey = prefs.getString("firebase_api_key", DEFAULT_API_KEY);
  prefs.end();

  // Convert sync word to hex string
  char syncBuffer[10];
  sprintf(syncBuffer, "%02X", currentSync);

  String sync = String(syncBuffer);
  String gpsChecked = currentGpsEnabled ? "checked" : "";

  // Serve web page
  server.on("/", HTTP_GET, [sync, gpsChecked, currentWifiSSID, currentWifiPassword, currentFirebaseUrl, currentFirebaseApiKey](AsyncWebServerRequest *request){
    String html = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TrailBeacon Config</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(to bottom right, #1e3a8a, #2563eb);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background: #ffffff10;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      backdrop-filter: blur(10px);
      max-width: 400px;
      width: 90%;
      text-align: center;
    }
    h2 {
      margin-bottom: 10px;
    }
    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      color: #d1d5db;
      font-size: 14px;
      text-align: left;
      padding-left: 10px;
    }
    .current {
      font-size: 14px;
      margin-bottom: 20px;
      color: #d1d5db;
    }
    input[type='text'], button {
      padding: 12px;
      margin: 10px 0;
      border: none;
      border-radius: 8px;
      font-size: 16px;
    }
    input[type='text'] {
      background-color: #f3f4f6;
      color: #000;
      width: 100%;
      box-sizing: border-box;
    }
    .checkbox-group {
      margin: 15px 0;
      text-align: left;
      padding-left: 20px;
    }
    button {
      background-color: #3b82f6;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: 100%;
    }
    button:hover {
      background-color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>TrailBeacon Config</h2>
    <div class="current">
      Current WiFi: <strong>)rawliteral";
    html += currentWifiSSID;
    html += R"rawliteral(</strong><br>
      Current Sync Word: <strong>)rawliteral";
    html += sync;
    html += R"rawliteral(</strong>
    </div>
    <form method='POST' action='/save'>
      <h3>WiFi Settings</h3>
      <input type='text' name='wifi_ssid' placeholder='WiFi SSID' value=')rawliteral";
    html += currentWifiSSID;
    html += R"rawliteral(' required>
      <input type='password' name='wifi_password' placeholder='WiFi Password' value=')rawliteral";
    html += currentWifiPassword;
    html += R"rawliteral(' required>
      
      <h3>LoRa Settings</h3>
      <input type='text' name='sync' placeholder='Sync Word (e.g. F3)' value=')rawliteral";
    html += sync;
    html += R"rawliteral(' required>
      
      <h3>Firebase Settings</h3>
      <input type='text' name='firebase_api_key' placeholder='Firebase API Key' value=')rawliteral";
    html += currentFirebaseApiKey;
    html += R"rawliteral(' required>
      <input type='url' name='firebase_url' placeholder='Firebase Database URL' value=')rawliteral";
    html += currentFirebaseUrl;
    html += R"rawliteral(' required>
      
      <h3>GPS Settings</h3>
      <div class="checkbox-group">
        <input type="checkbox" id="gpsEnable" name="gps_enabled" )rawliteral";
    html += gpsChecked;
    html += R"rawliteral(>
        <label for="gpsEnable">Enable GPS Module</label>
      </div>
      <button type='submit'>Save & Restart</button>
    </form>
  </div>
</body>
</html>
)rawliteral";

    request->send(200, "text/html", html);
  });

  // Handle saving
  server.on("/save", HTTP_POST, [](AsyncWebServerRequest *request){
    String wifiSSID = request->getParam("wifi_ssid", true)->value();
    String wifiPassword = request->getParam("wifi_password", true)->value();
    String sync = request->getParam("sync", true)->value();
    String firebaseApiKey = request->getParam("firebase_api_key", true)->value();
    String firebaseUrl = request->getParam("firebase_url", true)->value();
    bool gpsEnabled = request->hasParam("gps_enabled", true);
    
    // Save all settings
    prefs.begin("config", false);
    prefs.putString("wifi_ssid", wifiSSID);
    prefs.putString("wifi_password", wifiPassword);
    prefs.putUInt("sync_word", strtoul(sync.c_str(), NULL, 16));
    prefs.putString("firebase_api_key", firebaseApiKey);
    prefs.putString("firebase_url", firebaseUrl);
    prefs.putBool("gps_enabled", gpsEnabled);
    prefs.end();
    
    // Reload Firebase configuration
    loadFirebaseConfig();
    
    Serial.println("Configuration saved:");
    Serial.print("WiFi SSID: ");
    Serial.println(wifiSSID);
    Serial.print("WiFi Password: ");
    Serial.println("********");
    Serial.print("Sync Word: ");
    Serial.println(sync);
    Serial.print("Firebase API Key: ");
    Serial.println(firebaseApiKey.substring(0, 20) + "...");
    Serial.print("Firebase URL: ");
    Serial.println(firebaseUrl);
    Serial.print("GPS Enabled: ");
    Serial.println(gpsEnabled ? "Yes" : "No");
    
    request->send(200, "text/html", 
      "<div style='text-align:center; font-family:Arial; padding:50px;'>"
      "<h2>Configuration Saved!</h2>"
      "<p>Device will restart with new settings...</p>"
      "<p>WiFi: " + wifiSSID + "</p>"
      "<p>Please reconnect to the new WiFi network if changed.</p>"
      "</div>");
    delay(3000);
    ESP.restart();
  });

  server.begin();
  
  // Keep config portal active with persistent display
  while (configModeActive) {
    dns.processNextRequest();
    
    // Refresh display every 5 seconds to ensure it stays visible
    static unsigned long lastDisplayUpdate = 0;
    if (millis() - lastDisplayUpdate > 5000) {
      showConfigPortalDisplay(apIP);
      lastDisplayUpdate = millis();
    }
    
    delay(100);
  }
} 