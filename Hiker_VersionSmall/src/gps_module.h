#ifndef GPS_MODULE_H
#define GPS_MODULE_H

#include <TinyGPS++.h>
#include "config.h"

// GPS Data structure
struct GPSData {
  float latitude;
  float longitude;
  String timeStr;
};

// GPS objects (definition)
HardwareSerial gpsSerial(0);  // 
TinyGPSPlus gps;

// Function declarations
void initGPS();
void updateGPS();
bool isGPSValid();
GPSData getGPSData();

// Function implementations
void initGPS() {
  Serial.printf("GPS: Initializing on pins RX=%d, TX=%d\n", RXD2, TXD2);
  gpsSerial.begin(GPS_BAUD, SERIAL_8N1, RXD2, TXD2,false);
  delay(100); // Give GPS module time to start
  Serial.println("GPS: Serial port initialized");
}

void updateGPS() {
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }
}

bool isGPSValid() {
  return gps.location.isValid();
}

GPSData getGPSData() {
  GPSData data;
  data.latitude = 0;
  data.longitude = 0;
  data.timeStr = "N/A";
  if (gps.location.isValid()) {
    data.latitude = gps.location.lat();
    data.longitude = gps.location.lng();
    // Prepare time string (add 8 hours for local time)
    if (gps.time.isValid()) {
      char buffer[10];
      sprintf(buffer, "%02d:%02d:%02d", (gps.time.hour() + 8) % 24, gps.time.minute(), gps.time.second());
      data.timeStr = String(buffer);
    }
  }
  return data;
}

#endif // GPS_MODULE_H