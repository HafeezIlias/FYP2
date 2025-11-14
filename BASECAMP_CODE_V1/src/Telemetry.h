#ifndef TELEMETRY_H
#define TELEMETRY_H

#include <WiFi.h>
#include <Arduino.h>
#include "Common.h"

// === TELEMETRY VARIABLES ===
extern float batteryVoltage;
extern int wifiRSSI;
extern float cpuTemp;
extern unsigned long uptime;

// === COOLING SYSTEM VARIABLES ===
extern bool coolingActive;
extern float tempThreshold;

// === TELEMETRY FUNCTIONS ===
void updateTelemetry();
void sendTelemetryToFirebase();
float readBatteryVoltage();
float readCPUTemperature();
String getUptimeString();

// === COOLING SYSTEM FUNCTIONS ===
void initializeCoolingSystem();
void updateCoolingSystem();
void activateCooling();
void deactivateCooling();

#endif 