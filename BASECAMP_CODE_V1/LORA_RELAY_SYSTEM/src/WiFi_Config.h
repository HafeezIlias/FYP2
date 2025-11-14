#pragma once
#ifndef WIFI_CONFIG_H
#define WIFI_CONFIG_H

#include "Common.h"

// === WIFI CONFIGURATION ===
bool initializeWiFi();
void loadWiFiConfig();
void saveWiFiConfig();
bool startConfigPortal();
void stopConfigPortal();
void handleWiFiConfig();
bool connectToWiFi(const String& ssid, const String& password);

// === CONFIG PORTAL HANDLERS ===
void handleRoot(AsyncWebServerRequest *request);
void handleConfig(AsyncWebServerRequest *request);
void handleSave(AsyncWebServerRequest *request);
void handleRelay(AsyncWebServerRequest *request);
void handleAPI(AsyncWebServerRequest *request);

// === WIFI STATUS ===
bool isWiFiConnected();
String getWiFiStatus();
void checkWiFiConnection();
void attemptWiFiReconnection();

#endif // WIFI_CONFIG_H