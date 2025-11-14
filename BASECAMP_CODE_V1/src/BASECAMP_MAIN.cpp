// === BASECAMP NODE - MODULAR VERSION ===
// LATEST UPDATE WITH GPS CONFIGURATION & TELEMETRY

#include "Common.h"
#include "GPS_Module.h"
#include "Display_Module.h"
#include "LoRa_Module.h"
#include "Firebase_Module.h"
#include "WiFi_Config.h"
#include "Telemetry.h"

void setup() {
  Serial.begin(115200);
  pinMode(SOSBUTTON, INPUT_PULLUP);
  pinMode(CONFIG, INPUT_PULLUP);
  pinMode(SENDBUTTON, INPUT_PULLUP);
  
  // Initialize cooling system
  initializeCoolingSystem();
  
  // Record start time for uptime calculation
  deviceStartTime = millis();

  // Load Firebase configuration
  loadFirebaseConfig();

  // Initialize display
  initializeDisplay();
  showSplash();
  display.clearDisplay();

  // Load preferences
  prefs.begin("config", false);
  String storedNode = prefs.getString("nodeId", "BASECAMP_01");
  int storedSync = prefs.getUInt("sync_word", 0xF3);
  gpsEnabled = prefs.getBool("gps_enabled", false);
  prefs.end();

  // Use stored node ID if available
  if (storedNode.length() > 0) {
    nodeId = storedNode;
  }

  // Initialize GPS if enabled
  if (gpsEnabled) {
    initializeGPS();
    display.setCursor(0,0);
    display.println("GPS Module Started");
    display.display();
    delay(500);
  }

  // Initialize LoRa with proper display handling
  delay(1000);
  display.clearDisplay();
  display.setCursor(0,0);
  display.setTextSize(1);
  display.println("Starting LoRa...");
  display.display();
  
  bool loraSuccess = initializeLoRa(storedSync);
  
  display.clearDisplay();
  display.setCursor(0,0);
  display.setTextSize(1);
  if (loraSuccess) {
    display.println("LoRa: READY");
    display.setCursor(0,10);
    display.println("Frequency: 433MHz");
    display.setCursor(0,20);
    display.println("Power: Max");
  } else {
    display.println("LoRa: FAILED");
    display.setCursor(0,10);
    display.println("Retrying in loop...");
    display.setCursor(0,20);
    display.println("Check connections");
  }
  display.display();
  delay(3000);

  // Initialize WiFi and Firebase
  initializeWiFi();
  
  // Initial telemetry update
  updateTelemetry();
  if (signupOK) {
    sendTelemetryToFirebase();
  }
}

void loop() {
  // Check for config mode activation
  checkConfigButton();
  
  // Update GPS if enabled
  if (gpsEnabled) {
    updateGPS();
  }
  
  // Check if it's time to update telemetry
  if (millis() - lastTelemetryUpdate > telemetryInterval) {
    updateTelemetry();
    if (signupOK) {
      sendTelemetryToFirebase();
    }
    lastTelemetryUpdate = millis();
  }

  // Handle LoRa packets or attempt recovery
  if (isLoRaInitialized()) {
    handleLoRaPackets();
  } else {
    // Attempt LoRa recovery every 30 seconds
    static unsigned long lastRecoveryAttempt = 0;
    if (millis() - lastRecoveryAttempt > 30000) {
      Serial.println("LoRa not initialized, attempting recovery...");
      prefs.begin("config", false);
      int storedSync = prefs.getUInt("sync_word", 0xF3);
      prefs.end();
      
      if (attemptLoRaRecovery(storedSync)) {
        Serial.println("LoRa recovery successful!");
      }
      lastRecoveryAttempt = millis();
    }
  }

  // Update display
  updateDisplay();
  
  // Check SOS button
  if (digitalRead(SOSBUTTON) == LOW) {
    sos_status = true;
    Serial.println("🚨 SOS Activated - will be reported in next telemetry update");
  } else {
    sos_status = false;
  }
  
  // Check token status periodically
  if (millis() - lastTokenCheck > tokenCheckInterval) {
    lastTokenCheck = millis();
    
    // Check if token needs refresh
    if (tokenNeedsRefresh) {
      refreshFirebaseToken();
    }
  }

  delay(100);
} 