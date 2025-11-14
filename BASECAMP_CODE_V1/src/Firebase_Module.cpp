#include "Firebase_Module.h"
// External references
extern FirebaseData fbdo;
extern FirebaseAuth auth;
extern FirebaseConfig config;
extern bool signupOK;
extern String firebaseAPIKey;
extern String firebaseDatabaseURL;

// === TOKEN MANAGEMENT ===
unsigned long tokenCheckInterval = 60000;
unsigned long lastTokenCheck = 0;
bool tokenNeedsRefresh = false;

void AutoStatusCallback(TokenInfo tokenInfo) {
  Serial.println("Token Info: ");
  Serial.print("Type: ");
  Serial.println(tokenInfo.type == token_type_id_token ? "ID token" : "Access token");
  Serial.print("Status: ");
  
  switch (tokenInfo.status) {
    case token_status_error:
      Serial.println("Error");
      tokenNeedsRefresh = true;
      break;
    case token_status_ready:
      Serial.println("Ready");
      tokenNeedsRefresh = false;
      break;
    case token_status_on_signing:
      Serial.println("Signing");
      break;
    default:
      Serial.println("Unknown");
  }
}

void setupTokenCallback() {
  config.token_status_callback = AutoStatusCallback;
}

void initializeFirebase() {
  // Use configurable Firebase settings
  config.api_key = firebaseAPIKey.c_str();
  config.database_url = firebaseDatabaseURL.c_str();
  setupTokenCallback();

  Serial.print("Initializing Firebase with API Key: ");
  Serial.println(firebaseAPIKey.substring(0, 20) + "...");
  Serial.print("Database URL: ");
  Serial.println(firebaseDatabaseURL);

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase signUp successful");
    signupOK = true;
  } else {
    Serial.print("SignUp failed: ");
    Serial.println(config.signer.signupError.message.c_str());
    signupOK = false;
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

bool refreshFirebaseToken() {
  Serial.println("Refreshing Firebase token...");
  
  // Use current configurable settings
  config.api_key = firebaseAPIKey.c_str();
  config.database_url = firebaseDatabaseURL.c_str();
  setupTokenCallback();

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase token refresh successful");
    signupOK = true;
    tokenNeedsRefresh = false;
    return true;
  } else {
    Serial.print("Token refresh failed: ");
    Serial.println(config.signer.signupError.message.c_str());
    signupOK = false;
    tokenNeedsRefresh = true;
    return false;
  }
}

void manualTokenRefresh() {
  tokenNeedsRefresh = true;
}

void forwardPacketToFirebase(String packet) {
  if (!signupOK) return;

  // === STEP 1: Basic packet validation ===
  if (packet.length() == 0) {
    Serial.println("⚠️ Rejected: Empty packet");
    return;
  }

  if (packet.length() > 2048) {
    Serial.println("⚠️ Rejected: Packet too large (>2048 bytes)");
    return;
  }

  if (!isValidString(packet, 2048)) {
    Serial.println("⚠️ Rejected: Packet contains invalid characters");
    return;
  }

  // === STEP 2: JSON validation ===
  if (!isValidJSON(packet)) {
    Serial.println("⚠️ Rejected: Invalid JSON format");
    Serial.print("Packet content: ");
    Serial.println(packet);
    return;
  }

  FirebaseJson json;
  if (!json.setJsonData(packet)) {
    Serial.println("⚠️ Rejected: Failed to parse JSON");
    return;
  }

  // === STEP 3: Node ID validation ===
  FirebaseJsonData nodeIdResult;
  json.get(nodeIdResult, "node_id");

  if (!nodeIdResult.success) {
    Serial.println("⚠️ Rejected: No node_id found in packet");
    return;
  }

  String receivedNodeId = nodeIdResult.stringValue;
  if (!isValidNodeId(receivedNodeId)) {
    Serial.println("⚠️ Rejected: Invalid node_id format");
    Serial.print("Invalid node_id: ");
    Serial.println(receivedNodeId);
    return;
  }

  // === STEP 4: Validate numeric fields if present ===
  FirebaseJsonData tempResult;

  // Check latitude if present
  if (json.get(tempResult, "latitude") && tempResult.success) {
    float lat = tempResult.floatValue;
    if (!isValidLatitude(lat)) {
      Serial.println("⚠️ Rejected: Invalid latitude value");
      Serial.print("Latitude: ");
      Serial.println(lat);
      return;
    }
  }

  // Check longitude if present
  if (json.get(tempResult, "longitude") && tempResult.success) {
    float lon = tempResult.floatValue;
    if (!isValidLongitude(lon)) {
      Serial.println("⚠️ Rejected: Invalid longitude value");
      Serial.print("Longitude: ");
      Serial.println(lon);
      return;
    }
  }

  // Check heart rate if present (typical range 30-220 bpm)
  if (json.get(tempResult, "heart_rate") && tempResult.success) {
    int hr = tempResult.intValue;
    if (!isValidInt(hr, 30, 220)) {
      Serial.println("⚠️ Rejected: Invalid heart_rate value");
      Serial.print("Heart rate: ");
      Serial.println(hr);
      return;
    }
  }

  // Check temperature if present (range -40 to 85°C for ESP32)
  if (json.get(tempResult, "temperature") && tempResult.success) {
    float temp = tempResult.floatValue;
    if (!isValidFloat(temp, -40.0, 85.0)) {
      Serial.println("⚠️ Rejected: Invalid temperature value");
      Serial.print("Temperature: ");
      Serial.println(temp);
      return;
    }
  }

  // Check battery voltage if present (typical range 2.5-4.5V)
  if (json.get(tempResult, "battery") && tempResult.success) {
    float battery = tempResult.floatValue;
    if (!isValidFloat(battery, 0.0, 5.0)) {
      Serial.println("⚠️ Rejected: Invalid battery voltage");
      Serial.print("Battery: ");
      Serial.println(battery);
      return;
    }
  }

  // Check WiFi RSSI if present (typical range -120 to 0 dBm)
  if (json.get(tempResult, "wifi_rssi") && tempResult.success) {
    int rssi = tempResult.intValue;
    if (!isValidInt(rssi, -120, 0)) {
      Serial.println("⚠️ Rejected: Invalid WiFi RSSI");
      Serial.print("RSSI: ");
      Serial.println(rssi);
      return;
    }
  }

  // === STEP 5: All validation passed, send to Firebase ===
  String pathlogs = "/runners/";
  pathlogs += receivedNodeId;
  pathlogs += "/logs";

  if (Firebase.RTDB.pushJSON(&fbdo, pathlogs.c_str(), &json)) {
    String message = "📥 ✓ Validated log pushed to Firebase for node: ";
    message += receivedNodeId;
    Serial.println(message);
  } else {
    Serial.print("❌ Log push error: ");
    Serial.println(fbdo.errorReason());
  }
}

 