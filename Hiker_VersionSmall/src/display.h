#ifndef DISPLAY_H
#define DISPLAY_H

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "config.h"

// Display object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void initDisplay() {
  // Use valid ESP32-C3 I2C pins: GPIO 5 (SDA), GPIO 6 (SCL)
  Wire.begin(I2C_SDA, I2C_SCL);
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
    Serial.println("OLED initialization failed");
    // Instead of infinite loop, try a few times then continue without display
    for (int retry = 0; retry < 3; retry++) {
      delay(1000);
      yield(); // Yield to watchdog
      if (display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
        Serial.println("Display initialized on retry");
        return;
      }
    }
    Serial.println("Display initialization failed after retries, continuing without display");
    return; // Continue without display rather than halt
  }
  Serial.println("Display initialized");
}

void showSplash() {
  // Check if display is available before trying to use it
  if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
    Serial.println("Display not available for splash screen");
    delay(2500);  // Still delay for consistent timing
    return;
  }
  
  display.clearDisplay();
  
  // Draw large GPS icon at the top center
  display.drawBitmap((SCREEN_WIDTH - GPS_ICON_WIDTH) / 2, 0, gps_icon_bitmap,
                   GPS_ICON_WIDTH, GPS_ICON_HEIGHT, WHITE);
  
  // Display title
  display.setTextSize(1);
  display.setTextColor(WHITE);
  int16_t x1, y1;
  uint16_t w, h;
  
  display.getTextBounds("TRAILBEACON", 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, 20);
  display.println("TRAILBEACON");
  
  // Subtitle
  display.setTextSize(1);
  display.getTextBounds("by Hafeez", 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, 40);
  display.println("by Hafeez");
  
  display.display();
  delay(2500);  // Show splash for 2.5 seconds
}

void updateDisplay(float lat, float lng, String timeStr, int batteryPercent, String loraStatus, int packetCount, bool sos_status) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  
  // Show GPS coordinates
  display.setCursor(0, 0);
  display.print("Lat: ");
  display.println(lat, 8);
  
  display.setCursor(0, 12);
  display.print("Lng: ");
  display.println(lng, 8);
  
  // Show UTC time from GPS
  display.setCursor(0, 24);
  display.print("Time(Local): ");
  display.println(timeStr);
  
  // Show LoRa status
  display.setCursor(0, 36);
  display.print("LoRa: " + loraStatus + "(" + packetCount + ")");

  display.setCursor(0, 47);
  display.print("Battery:");
  display.print(batteryPercent);
  display.println("%");
  
  // Show SOS status
  if (sos_status) {
    display.setCursor(0, 56);
    display.println("SOS ACTIVATED");
  }
  
  // Draw GPS icon
  display.drawBitmap(SCREEN_WIDTH - GPS_ICON_WIDTH, 0, gps_icon_bitmap,
                   GPS_ICON_WIDTH, GPS_ICON_HEIGHT, WHITE);
  
  display.display();
}

void showGPSSearching(String loraStatus, unsigned long lastSendTime) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  
  display.setCursor(0, 0);
  display.println("Waiting for GPS...");
  display.setCursor(0, 12);
  display.println("Move to open area");
  
  display.setCursor(0, 24);
  display.print("LoRa: ");
  display.println(loraStatus);
  
  // Blink GPS icon
  if (millis() - lastSendTime >= 1000) {
    display.drawBitmap(SCREEN_WIDTH - GPS_ICON_WIDTH, 0,
                     gps_icon_bitmap, GPS_ICON_WIDTH, GPS_ICON_HEIGHT, WHITE);
  }
  
  display.display();
}

#endif // DISPLAY_H
// End of DISPLAY_H