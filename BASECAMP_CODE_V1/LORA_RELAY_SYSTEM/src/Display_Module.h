#pragma once
#ifndef DISPLAY_MODULE_H
#define DISPLAY_MODULE_H

#include "Common.h"

// === DISPLAY FUNCTIONS ===
bool initializeDisplay();
void updateRelayDisplay();
void showSplashScreen();
void showRelayStatus();
void showStatistics();
void showNetworkStatus();
void showConfigMode();

// === DISPLAY PAGES ===
enum DisplayPage {
  PAGE_STATUS,
  PAGE_STATISTICS,
  PAGE_NETWORK,
  PAGE_CONFIG
};

extern DisplayPage currentPage;
extern unsigned long lastDisplayUpdate;

// === DISPLAY UTILITIES ===
void clearDisplay();
void nextDisplayPage();
void refreshDisplay();
void displayMessage(const String& message, int duration = 2000);

#endif // DISPLAY_MODULE_H