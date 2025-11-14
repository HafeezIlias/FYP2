// === LoRa RELAY SYSTEM - MAIN ===
// Receives LoRa packets and forwards them while avoiding duplication

#include "Common.h"
#include "LoRa_Relay.h"
#include "Forwarder.h"
#include "Display_Module.h"
#include "WiFi_Config.h"

// Button handling
bool configButtonPressed = false;
unsigned long configButtonTime = 0;

void checkConfigButton() {
  if (digitalRead(CONFIG_BUTTON) == LOW) {
    if (!configButtonPressed) {
      configButtonPressed = true;
      configButtonTime = millis();
    } else if (millis() - configButtonTime > 3000) { // 3 second hold
      Serial.println("Config button held - entering config mode");
      
      if (!configMode) {
        displayMessage("Entering Config Mode", 2000);
        startConfigPortal();
      }
      
      configButtonPressed = false;
    }
  } else {
    configButtonPressed = false;
  }
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("=================================");
  Serial.println("LoRa RELAY SYSTEM STARTING");
  Serial.println("=================================");
  
  // Initialize pins
  pinMode(CONFIG_BUTTON, INPUT_PULLUP);
  pinMode(RESET_BUTTON, INPUT_PULLUP);
  
  // Load relay configuration
  prefs.begin("relay", false);
  relayId = prefs.getString("relay_id", "RELAY_01");
  prefs.end();
  
  Serial.print("Relay ID: ");
  Serial.println(relayId);
  
  // Initialize display
  if (initializeDisplay()) {
    showSplashScreen();
  } else {
    Serial.println("Display initialization failed, continuing without display");
  }
  
  // Initialize LoRa relay system
  displayMessage("Initializing LoRa...", 1500);
  
  // Try to load sync word from preferences
  prefs.begin("lora", true);
  int syncWord = prefs.getUInt("sync_word", 0xF3);
  prefs.end();
  
  bool loraSuccess = initializeLoRaRelay(syncWord);
  
  if (loraSuccess) {
    displayMessage("LoRa: READY", 1500);
    Serial.println("LoRa relay system initialized successfully");
  } else {
    displayMessage("LoRa: FAILED", 1500);
    Serial.println("LoRa relay system initialization failed");
  }
  
  // Initialize forwarder
  displayMessage("Init Forwarder...", 1500);
  initializeForwarder();
  
  // Initialize WiFi
  displayMessage("Connecting WiFi...", 1500);
  bool wifiSuccess = initializeWiFi();
  
  if (wifiSuccess && isWiFiConnected()) {
    displayMessage("WiFi: Connected", 1500);
  } else if (configMode) {
    displayMessage("Config Mode Active", 2000);
  } else {
    displayMessage("WiFi: Failed", 1500);
  }
  
  // Print system status
  Serial.println("=================================");
  Serial.println("RELAY SYSTEM READY");
  Serial.print("LoRa: ");
  Serial.println(getLoRaRelayStatus());
  Serial.print("WiFi: ");
  Serial.println(getWiFiStatus());
  Serial.print("Config Mode: ");
  Serial.println(configMode ? "YES" : "NO");
  Serial.println("=================================");
  
  // Show initial statistics
  printRelayStatistics();
  printForwardTargets();
  
  displayMessage("System Ready!", 2000);
}

void loop() {
  // Check configuration button
  checkConfigButton();
  
  // Handle WiFi configuration
  handleWiFiConfig();
  
  // Handle incoming LoRa packets
  handleIncomingLoRaPackets();
  
  // Process any retry forwards
  static unsigned long lastRetryCheck = 0;
  if (millis() - lastRetryCheck > 30000) { // Every 30 seconds
    retryFailedForwards();
    checkTargetHealth();
    lastRetryCheck = millis();
  }
  
  // Update display
  updateRelayDisplay();
  
  // Print statistics periodically
  static unsigned long lastStatsReport = 0;
  if (millis() - lastStatsReport > 60000) { // Every minute
    printRelayStatistics();
    lastStatsReport = millis();
  }
  
  // Handle reset button
  if (digitalRead(RESET_BUTTON) == LOW) {
    delay(50); // Debounce
    if (digitalRead(RESET_BUTTON) == LOW) {
      Serial.println("Reset button pressed - resetting statistics");
      resetStatistics();
      displayMessage("Stats Reset!", 2000);
      delay(1000); // Prevent multiple resets
    }
  }
  
  // Recovery attempt for LoRa if needed
  static unsigned long lastLoRaRecovery = 0;
  if (!loraInitialized && millis() - lastLoRaRecovery > 60000) { // Every minute
    Serial.println("Attempting LoRa recovery...");
    displayMessage("LoRa Recovery...", 1500);
    
    prefs.begin("lora", true);
    int syncWord = prefs.getUInt("sync_word", 0xF3);
    prefs.end();
    
    if (attemptLoRaRecovery(syncWord)) {
      displayMessage("LoRa Recovered!", 2000);
    }
    
    lastLoRaRecovery = millis();
  }
  
  delay(100); // Small delay to prevent overwhelming the CPU
}

// Forward declaration for external access
extern "C" void forwardPacketToRelay(String packet) {
  // This function can be called from other modules to forward packets
  String nodeId;
  if (extractNodeId(packet, nodeId)) {
    if (!isPacketDuplicate(packet, nodeId)) {
      forwardPacket(packet, nodeId);
    }
  }
}