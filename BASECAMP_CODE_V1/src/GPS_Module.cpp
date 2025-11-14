#include "GPS_Module.h"
#include <Arduino.h>

// === GPS VARIABLES ===
HardwareSerial gpsSerial(2);
TinyGPSPlus gps;
bool gpsEnabled = false;
float currentLat = 0.0;
float currentLng = 0.0;
String gpsTimeStr = "N/A";
bool gpsValid = false;

void initializeGPS() {
  if (gpsEnabled) {
    gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2);
    Serial.println("GPS module initialized");
  }
}

void updateGPS() {
  if (!gpsEnabled) return;
  
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
  
  if (gps.location.isValid()) {
    currentLat = gps.location.lat();
    currentLng = gps.location.lng();
    gpsValid = true;
    
    // Format time string
    if (gps.time.isValid()) {
      char buffer[10];
      sprintf(buffer, "%02d:%02d:%02d", gps.time.hour()+8, gps.time.minute(), gps.time.second());
      gpsTimeStr = String(buffer);
    }
  } else {
    gpsValid = false;
  }
}

bool isGPSValid() {
  return gpsEnabled && gpsValid;
}

float getCurrentLatitude() {
  return currentLat;
}

float getCurrentLongitude() {
  return currentLng;
}

String getGPSTimeString() {
  return gpsTimeStr;
} 