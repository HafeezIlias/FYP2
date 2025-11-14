/**
 * TrailBeacon Sender Node - Main File
 * 
 * A GPS location tracking device with LoRa transmission capabilities.
 * Features OLED display, configuration portal, and SOS functionality.
 * 
 * Created by Hafeez
 */


#include "config.h"
#include "display.h"
#include "gps_module.h"
#include "lora_module.h"
#include "battery.h"
#include "config_portal.h"
#include "buttons.h"
#include <esp_task_wdt.h> // For watchdog timer

// ============= GLOBAL VARIABLES =============
unsigned long lastSendTime = 0;
String loraStatus = "Waiting...";
int packetCount = 0;
bool sos_status = false;
String NODE_ID = "NODE_01";

// Button state variables
unsigned long buttonPressStart = 0;
bool configMode = false;

// =================== SETUP ===================
void setup() {
  Serial.begin(115200);
  delay(1000); // Give serial time to initialize
  Serial.println("=== TrailBeacon Starting ===");
  
  // Configure watchdog timer (30 seconds timeout)
  esp_task_wdt_init(30, true);
  esp_task_wdt_add(NULL);
  Serial.println("Watchdog timer initialized");
  
  // Initialize all modules with error handling
  Serial.println("Initializing buttons...");
  initButtons();
  esp_task_wdt_reset(); // Reset watchdog
  
  Serial.println("Initializing battery...");
  initBattery();
  esp_task_wdt_reset(); // Reset watchdog
  
  Serial.println("Initializing display...");
  initDisplay();
  esp_task_wdt_reset(); // Reset watchdog
  
  Serial.println("Showing splash screen...");
  showSplash();
  esp_task_wdt_reset(); // Reset watchdog
  
  Serial.println("Initializing GPS...");
  initGPS();
  esp_task_wdt_reset(); // Reset watchdog
  
  Serial.println("Initializing LoRa...");
  initLoRa();
  esp_task_wdt_reset(); // Reset watchdog
  
  Serial.println("=== TrailBeacon initialized successfully ===");
}

// =================== MAIN LOOP ===================
void loop() {
  // Reset watchdog at start of loop
  esp_task_wdt_reset();
  
  // Check for config mode activation
  checkConfigButton();
  esp_task_wdt_reset(); // Reset watchdog
  
  // Read battery status
  float voltage = readBatteryVoltage();
  int batteryPercent = getBatteryPercentage(voltage);
  esp_task_wdt_reset(); // Reset watchdog

  // Check SOS button status
  checkSOSButton();
  esp_task_wdt_reset(); // Reset watchdog
  
  // Read GPS data
  updateGPS();
  esp_task_wdt_reset(); // Reset watchdog
  
  // Check for incoming LoRa packets
  receiveLoRaPackets();
  esp_task_wdt_reset(); // Reset watchdog
  
  // Process GPS data if valid
  if (isGPSValid()) {
    GPSData gpsData = getGPSData();
    
    // Create JSON data packet - Using new JsonDocument
    JsonDocument doc;
    doc["node_id"] = NODE_ID;
    doc["latitude"] = gpsData.latitude;
    doc["longitude"] = gpsData.longitude;
    doc["elevation"] = gpsData.elevation;
    doc["time"] = gpsData.timeStr;
    doc["battery"] = batteryPercent;
    doc["sos_status"] = sos_status;
    
    String output;
    serializeJson(doc, output);
    esp_task_wdt_reset(); // Reset watchdog
    
    // Update display with current GPS data
    updateDisplay(gpsData.latitude, gpsData.longitude, gpsData.elevation, gpsData.timeStr, batteryPercent, loraStatus, packetCount, sos_status);
    esp_task_wdt_reset(); // Reset watchdog
    
    // Send data automatically every 5 seconds
    if (millis() - lastSendTime > 5000) {
      sendLoRaPacket(output);
      indicateTransmission(); // Light up transmit LED
      loraStatus = "Sent!";
      packetCount++;
      lastSendTime = millis();
      Serial.println(output);
      esp_task_wdt_reset(); // Reset watchdog
    }
  } else {
    // Show searching for GPS screen
    showGPSSearching(loraStatus, lastSendTime);
    esp_task_wdt_reset(); // Reset watchdog
  }
  
  delay(1000);
  esp_task_wdt_reset(); // Reset watchdog at end of loop
}