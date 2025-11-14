#ifndef GPS_MODULE_H
#define GPS_MODULE_H

#include <WiFi.h>
#include <TinyGPS++.h>

// === PIN DEFINITIONS ===
#define RXD2 16
#define TXD2 17
#define GPS_BAUD 9600

// === GPS VARIABLES ===
extern HardwareSerial gpsSerial;
extern TinyGPSPlus gps;
extern bool gpsEnabled;
extern float currentLat;
extern float currentLng;
extern String gpsTimeStr;
extern bool gpsValid;

// === GPS FUNCTIONS ===
void initializeGPS();
void updateGPS();
bool isGPSValid();
float getCurrentLatitude();
float getCurrentLongitude();
String getGPSTimeString();

#endif 