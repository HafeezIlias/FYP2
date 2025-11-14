#ifndef DISPLAY_MODULE_H
#define DISPLAY_MODULE_H

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Wire.h>

// === OLED SETTINGS ===
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// === GPS ICON BITMAP ===
#define GPS_ICON_WIDTH  16
#define GPS_ICON_HEIGHT 16
extern const unsigned char gps_icon_bitmap[] PROGMEM;

// === DISPLAY VARIABLES ===
extern String loraStatus;
extern int packetCount;

// === DISPLAY FUNCTIONS ===
void initializeDisplay();
void showSplash();
void updateDisplay();

#endif 