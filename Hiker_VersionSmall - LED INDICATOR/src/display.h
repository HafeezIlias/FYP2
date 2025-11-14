#ifndef DISPLAY_H
#define DISPLAY_H

#include "config.h"

// Forward declaration for LoRa health check
extern bool isLoRaHealthy();

// LED state variables
bool greenLedState = false;    // Green LED (SCL) - indicates everything working
bool redLedState = false;      // Red LED (SDA) - indicates errors/issues
bool isSystemHealthy = false;  // Overall system health status
unsigned long lastBlinkTime = 0;
unsigned long lastErrorCheck = 0;
const unsigned long BLINK_INTERVAL = 1000;     // 1000ms slow blink when healthy
const unsigned long ERROR_CHECK_INTERVAL = 500; // Check for errors every 500ms

void initDisplay() {
  // Initialize LED pins as outputs
  pinMode(LED_STATUS, OUTPUT);  // Red LED (SDA)
  pinMode(LED_TRANSMIT, OUTPUT); // Green LED (SCL)
  
  // Start with both LEDs off
  digitalWrite(LED_STATUS, LOW);   // Red LED off
  digitalWrite(LED_TRANSMIT, LOW); // Green LED off
  
  Serial.println("LED indicators initialized - Red(GPIO8/SDA) Green(GPIO9/SCL)");
}

void showSplash() {
  // Startup sequence: Flash both LEDs 3 times
  Serial.println("System starting up...");
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_STATUS, HIGH);   // Red LED
    digitalWrite(LED_TRANSMIT, HIGH); // Green LED
    delay(300);
    digitalWrite(LED_STATUS, LOW);    // Red LED
    digitalWrite(LED_TRANSMIT, LOW);  // Green LED
    delay(300);
  }
  delay(1000);  // Additional delay for consistent timing
  Serial.println("Startup sequence completed");
}

void updateDisplay(float lat, float lng, float elevation, String timeStr, int batteryPercent, String loraStatus, int packetCount, bool sos_status) {
  unsigned long currentTime = millis();
  
  // Check system health every 500ms
  if (currentTime - lastErrorCheck >= ERROR_CHECK_INTERVAL) {
    // System is healthy if GPS has valid data and battery is above critical level
    bool gpsHealthy = (lat != 0.0 && lng != 0.0);
    bool batteryHealthy = (batteryPercent > 10);
    bool loraHealthy = isLoRaHealthy();
    
    isSystemHealthy = gpsHealthy && batteryHealthy && loraHealthy;
    
    lastErrorCheck = currentTime;
    
    // Debug output
    Serial.printf("System Health Check: GPS:%s Battery:%s(%.0f%%) LoRa:%s -> Overall:%s\n",
                  gpsHealthy ? "OK" : "FAIL", 
                  batteryHealthy ? "OK" : "LOW", 
                  (float)batteryPercent,
                  loraHealthy ? "OK" : "FAIL",
                  isSystemHealthy ? "HEALTHY" : "ERROR");
  }
  
  // LED Control Logic
  if (isSystemHealthy) {
    // System is healthy - Green LED blinks, Red LED off
    unsigned long blinkRate = sos_status ? 200 : BLINK_INTERVAL;  // Fast blink for SOS
    
    if (currentTime - lastBlinkTime >= blinkRate) {
      greenLedState = !greenLedState;
      digitalWrite(LED_TRANSMIT, greenLedState ? HIGH : LOW);  // Green LED (SCL)
      digitalWrite(LED_STATUS, LOW);                           // Red LED off (SDA)
      lastBlinkTime = currentTime;
      
      Serial.printf("GREEN LED %s - System Working Perfect\n", greenLedState ? "ON" : "OFF");
    }
  } else {
    // System has errors - Red LED blinks, Green LED off
    if (currentTime - lastBlinkTime >= 250) {  // Fast blink for errors
      redLedState = !redLedState;
      digitalWrite(LED_STATUS, redLedState ? HIGH : LOW);      // Red LED (SDA)
      digitalWrite(LED_TRANSMIT, LOW);                         // Green LED off (SCL)
      lastBlinkTime = currentTime;
      
      Serial.printf("RED LED %s - System Error Detected\n", redLedState ? "ON" : "OFF");
    }
  }
  
  // Print detailed status to Serial every 2 seconds
  static unsigned long lastSerialUpdate = 0;
  if (currentTime - lastSerialUpdate >= 2000) {
    Serial.printf("STATUS: Lat: %.8f, Lng: %.8f, Elev: %.2fm, Time: %s, Battery: %d%%, LoRa: %s(%d), SOS: %s\n",
                  lat, lng, elevation, timeStr.c_str(), batteryPercent, loraStatus.c_str(), packetCount,
                  sos_status ? "ACTIVE" : "OFF");
    lastSerialUpdate = currentTime;
  }
}

void showGPSSearching(String loraStatus, unsigned long lastSendTime) {
  // When searching for GPS, system is not healthy - Red LED blinks to indicate GPS error
  unsigned long currentTime = millis();
  
  if (currentTime - lastBlinkTime >= 300) {  // Fast blink to indicate GPS searching
    redLedState = !redLedState;
    digitalWrite(LED_STATUS, redLedState ? HIGH : LOW);    // Red LED blinks (SDA)
    digitalWrite(LED_TRANSMIT, LOW);                       // Green LED off (SCL)
    lastBlinkTime = currentTime;
    
    Serial.printf("RED LED %s - Searching for GPS signal\n", redLedState ? "ON" : "OFF");
  }
  
  // Print GPS search status to Serial
  static unsigned long lastGPSMessage = 0;
  if (currentTime - lastGPSMessage >= 3000) {  // Update every 3 seconds
    Serial.println("ERROR: Waiting for GPS signal... Move to open area with clear sky view");
    Serial.printf("LoRa Status: %s\n", loraStatus.c_str());
    Serial.println("RED LED blinking - GPS not ready");
    lastGPSMessage = currentTime;
  }
}

void indicateTransmission() {
  // Brief flash of green LED to indicate successful transmission
  // Only if system is healthy (otherwise the health status takes priority)
  if (isSystemHealthy) {
    digitalWrite(LED_TRANSMIT, HIGH);  // Green LED brief flash
    Serial.println("GREEN LED FLASH - Data transmitted successfully");
    delay(50);  // Very brief flash
    // LED will return to normal blinking pattern in updateDisplay
  } else {
    Serial.println("Transmission attempted but system not healthy - RED LED continues blinking");
  }
}

#endif // DISPLAY_H