#include "Common.h"

// === Firebase Runtime Configuration ===
String firebaseAPIKey = "";
String firebaseDatabaseURL = "";

// === GLOBAL OBJECT DEFINITIONS ===
Preferences prefs;
AsyncWebServer server(80);
DNSServer dns;
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// === GLOBAL CONSTANTS ===
const char* apSSID = "BASECAMP 01";
String nodeId = "BASECAMP_01";

// === GLOBAL STATUS VARIABLES ===
bool sos_status = false;
bool signupOK = false;
bool configModeActive = false;
unsigned long deviceStartTime = 0;
unsigned long lastTelemetryUpdate = 0;
const long telemetryInterval = 60000;

// === CONFIGURATION FUNCTIONS ===
void loadFirebaseConfig() {
  prefs.begin("config", false);
  firebaseAPIKey = prefs.getString("firebase_api_key", DEFAULT_API_KEY);
  firebaseDatabaseURL = prefs.getString("firebase_url", DEFAULT_DATABASE_URL);
  prefs.end();
  
  Serial.println("Firebase configuration loaded:");
  Serial.print("API Key: ");
  Serial.println(firebaseAPIKey.length() > 0 ? firebaseAPIKey.substring(0, 20) + "..." : "Not set");
  Serial.print("Database URL: ");
  Serial.println(firebaseDatabaseURL);
}

void saveFirebaseConfig(String apiKey, String databaseURL) {
  prefs.begin("config", false);
  prefs.putString("firebase_api_key", apiKey);
  prefs.putString("firebase_url", databaseURL);
  prefs.end();

  // Update runtime variables
  firebaseAPIKey = apiKey;
  firebaseDatabaseURL = databaseURL;

  Serial.println("Firebase configuration saved and updated");
}

// === DATA VALIDATION FUNCTIONS ===

/**
 * Validates if a float value is within acceptable range and not NaN/Inf
 */
bool isValidFloat(float value, float minValue, float maxValue) {
  // Check for NaN or Infinity
  if (isnan(value) || isinf(value)) {
    return false;
  }
  // Check if within range
  return (value >= minValue && value <= maxValue);
}

/**
 * Validates if an int value is within acceptable range
 */
bool isValidInt(int value, int minValue, int maxValue) {
  return (value >= minValue && value <= maxValue);
}

/**
 * Validates if a string is not empty, not too long, and contains printable characters
 */
bool isValidString(String str, int maxLength) {
  // Check if empty
  if (str.length() == 0) {
    return false;
  }

  // Check length
  if (str.length() > maxLength) {
    return false;
  }

  // Check for printable characters (ASCII 32-126) and some common extensions
  for (unsigned int i = 0; i < str.length(); i++) {
    char c = str.charAt(i);
    // Allow printable ASCII, newline, tab, and carriage return
    if (c < 32 && c != '\n' && c != '\r' && c != '\t') {
      return false;
    }
    // Reject control characters above 126 except extended ASCII letters
    if (c == 127 || (c < 0 && c > -33)) {
      return false;
    }
  }

  return true;
}

/**
 * Validates node ID format (alphanumeric, underscore, hyphen only)
 */
bool isValidNodeId(String nodeId) {
  if (nodeId.length() == 0 || nodeId.length() > 50) {
    return false;
  }

  // Check for valid characters: alphanumeric, underscore, hyphen
  for (unsigned int i = 0; i < nodeId.length(); i++) {
    char c = nodeId.charAt(i);
    if (!isalnum(c) && c != '_' && c != '-') {
      return false;
    }
  }

  return true;
}

/**
 * Validates if string is proper JSON format
 */
bool isValidJSON(String jsonStr) {
  // Basic checks
  if (jsonStr.length() == 0) {
    return false;
  }

  // Must start with { or [
  jsonStr.trim();
  if (jsonStr.charAt(0) != '{' && jsonStr.charAt(0) != '[') {
    return false;
  }

  // Try to parse with ArduinoJson
  StaticJsonDocument<1024> doc;
  DeserializationError error = deserializeJson(doc, jsonStr);

  return (error == DeserializationError::Ok);
}

/**
 * Validates latitude (-90 to 90 degrees)
 */
bool isValidLatitude(float lat) {
  return isValidFloat(lat, -90.0, 90.0);
}

/**
 * Validates longitude (-180 to 180 degrees)
 */
bool isValidLongitude(float lon) {
  return isValidFloat(lon, -180.0, 180.0);
} 