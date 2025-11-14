#ifndef WIFI_CONFIG_H
#define WIFI_CONFIG_H

#include <WiFi.h>
#include <DNSServer.h>
#include <ESPAsyncWebServer.h>
#include <Preferences.h>
#include "Common.h"

// === WiFi Configuration ===
#define WIFI_SSID "SS2DM02"
#define WIFI_PASSWORD "passwordwifi"

// === WIFI & CONFIG FUNCTIONS ===
void initializeWiFi();
void startConfigPortal();
void checkConfigButton();
void showConfigPortalDisplay(IPAddress apIP);

#endif 