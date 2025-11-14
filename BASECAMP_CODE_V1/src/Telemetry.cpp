#include "Telemetry.h"
#include "GPS_Module.h"
#include "Common.h"

// External references
extern String nodeId;
extern bool signupOK;
extern bool sos_status;
extern unsigned long deviceStartTime;

// === TELEMETRY VARIABLES ===
float batteryVoltage = 0.0;
int wifiRSSI = 0;
float cpuTemp = 0.0;
unsigned long uptime = 0;

// === COOLING SYSTEM VARIABLES ===
bool coolingActive = false;
float tempThreshold = 70.0;  // Default threshold for ESP32 (adjust as needed)

void updateTelemetry() {
  batteryVoltage = readBatteryVoltage();
  wifiRSSI = WiFi.RSSI();
  cpuTemp = readCPUTemperature();
  uptime = millis() - deviceStartTime;
  
  // Update cooling system based on current temperature
  updateCoolingSystem();
}

void sendTelemetryToFirebase() {
  if (!signupOK) return;

  // === VALIDATION: Check all telemetry data before sending ===
  bool validationFailed = false;

  // Validate node ID
  if (!isValidNodeId(nodeId)) {
    Serial.println("⚠️ Telemetry validation failed: Invalid node_id");
    validationFailed = true;
  }

  // Validate battery voltage (0-5V range for ESP32 ADC with voltage divider)
  if (!isValidFloat(batteryVoltage, 0.0, 5.0)) {
    Serial.print("⚠️ Telemetry validation failed: Invalid battery voltage: ");
    Serial.println(batteryVoltage);
    validationFailed = true;
  }

  // Validate WiFi RSSI (-120 to 0 dBm)
  if (!isValidInt(wifiRSSI, -120, 0)) {
    Serial.print("⚠️ Telemetry validation failed: Invalid WiFi RSSI: ");
    Serial.println(wifiRSSI);
    validationFailed = true;
  }

  // Validate CPU temperature (-40 to 125°C, ESP32 operating range)
  if (!isValidFloat(cpuTemp, -40.0, 125.0)) {
    Serial.print("⚠️ Telemetry validation failed: Invalid CPU temperature: ");
    Serial.println(cpuTemp);
    validationFailed = true;
  }

  // Validate uptime (should not be negative or unreasonably large)
  if (uptime == 0 || uptime > 4294967295UL) { // Max unsigned long
    Serial.print("⚠️ Telemetry validation failed: Invalid uptime: ");
    Serial.println(uptime);
    validationFailed = true;
  }

  // Validate free heap (should be positive and less than total heap)
  uint32_t freeHeap = ESP.getFreeHeap();
  if (freeHeap == 0 || freeHeap > ESP.getHeapSize()) {
    Serial.print("⚠️ Telemetry validation failed: Invalid free heap: ");
    Serial.println(freeHeap);
    validationFailed = true;
  }

  // Validate temperature threshold
  if (!isValidFloat(tempThreshold, 0.0, 125.0)) {
    Serial.print("⚠️ Telemetry validation failed: Invalid temp threshold: ");
    Serial.println(tempThreshold);
    validationFailed = true;
  }

  // If GPS is enabled, validate GPS data
  if (gpsEnabled && isGPSValid()) {
    float lat = getCurrentLatitude();
    float lon = getCurrentLongitude();

    if (!isValidLatitude(lat)) {
      Serial.print("⚠️ Telemetry validation failed: Invalid GPS latitude: ");
      Serial.println(lat);
      validationFailed = true;
    }

    if (!isValidLongitude(lon)) {
      Serial.print("⚠️ Telemetry validation failed: Invalid GPS longitude: ");
      Serial.println(lon);
      validationFailed = true;
    }
  }

  // If any validation failed, do not send to Firebase
  if (validationFailed) {
    Serial.println("❌ Telemetry NOT sent to Firebase due to validation errors");
    return;
  }

  // === All validation passed, build and send JSON ===
  FirebaseJson telemetryJson;

  telemetryJson.set("node_id", nodeId);
  telemetryJson.set("type", "telemetry");
  telemetryJson.set("battery", batteryVoltage);
  telemetryJson.set("wifi_rssi", wifiRSSI);
  telemetryJson.set("cpu_temp", cpuTemp);
  telemetryJson.set("uptime_ms", uptime);
  telemetryJson.set("free_heap", freeHeap);
  telemetryJson.set("sos_status", sos_status);
  telemetryJson.set("cooling_active", coolingActive);
  telemetryJson.set("temp_threshold", tempThreshold);
  telemetryJson.set("timestamp", millis());

  // Add GPS data if enabled and valid (already validated above)
  if (gpsEnabled && isGPSValid()) {
    telemetryJson.set("latitude", getCurrentLatitude());
    telemetryJson.set("longitude", getCurrentLongitude());
    telemetryJson.set("gps_time", getGPSTimeString());
  }

  if (Firebase.RTDB.pushJSON(&fbdo, "/basecamp/telemetry", &telemetryJson)) {
    Serial.println("📊 ✓ Validated telemetry pushed to Firebase");
  } else {
    Serial.print("❌ Telemetry error: ");
    Serial.println(fbdo.errorReason());
  }
}

float readBatteryVoltage() {
  int rawValue = analogRead(BATTERY_PIN);
  float voltage = (rawValue / 4095.0) * 3.3 * BATTERY_DIVIDER_RATIO;
  return voltage;
}

float readCPUTemperature() {
  return temperatureRead();
}

String getUptimeString() {
  unsigned long seconds = uptime / 1000;
  unsigned long minutes = seconds / 60;
  unsigned long hours = minutes / 60;
  unsigned long days = hours / 24;
  
  if (days > 0) {
    String result = String(days);
    result += "d ";
    result += String(hours % 24);
    result += "h";
    return result;
  } else if (hours > 0) {
    String result = String(hours);
    result += "h ";
    result += String(minutes % 60);
    result += "m";
    return result;
  } else {
    String result = String(minutes);
    result += "m ";
    result += String(seconds % 60);
    result += "s";
    return result;
  }
}

// === COOLING SYSTEM FUNCTIONS ===
void initializeCoolingSystem() {
  pinMode(COOLING_MOSFET_PIN, OUTPUT);
  digitalWrite(COOLING_MOSFET_PIN, LOW);  // Start with cooling OFF
  coolingActive = false;
  Serial.println("🌡️ Cooling system initialized on GPIO 26");
}

void updateCoolingSystem() {
  if (cpuTemp > tempThreshold && !coolingActive) {
    activateCooling();
  } else if (cpuTemp < (tempThreshold - 5.0) && coolingActive) {  // 5°C hysteresis
    deactivateCooling();
  }
}

void activateCooling() {
  digitalWrite(COOLING_MOSFET_PIN, HIGH);  // Turn ON IRLZ44N MOSFET
  coolingActive = true;
  Serial.print("🔥 Cooling ACTIVATED - CPU temp: ");
  Serial.print(cpuTemp);
  Serial.println("°C");
}

void deactivateCooling() {
  digitalWrite(COOLING_MOSFET_PIN, LOW);   // Turn OFF IRLZ44N MOSFET
  coolingActive = false;
  Serial.print("❄️ Cooling DEACTIVATED - CPU temp: ");
  Serial.print(cpuTemp);
  Serial.println("°C");
}