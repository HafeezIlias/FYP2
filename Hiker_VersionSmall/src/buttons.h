#ifndef BUTTONS_H
#define BUTTONS_H

#include "config.h"

// Forward declarations
extern Adafruit_SSD1306 display;
void startConfigPortal();

// Button state variables
extern unsigned long buttonPressStart;
extern bool configMode;
extern bool sos_status;

void initButtons() {
  pinMode(CONFIG_BUTTON, INPUT_PULLUP);
  pinMode(SOS_BUTTON, INPUT_PULLUP);
  Serial.println("Buttons initialized (Config and SOS only)");
}

void checkConfigButton() {
  if (digitalRead(CONFIG_BUTTON) == LOW) {
    if (buttonPressStart == 0) buttonPressStart = millis();
    
    // Enter config mode after long press
    if (!configMode && millis() - buttonPressStart >= LONG_PRESS_DURATION) {
      display.clearDisplay();
      display.setTextSize(1);
      display.setTextColor(WHITE);
      
      display.setCursor(0, 0);
      display.print("CONFIG MODE ACTIVE");
      
      display.setCursor(0, 12);
      display.print("SSID: ");
      display.println(AP_SSID);
      
      display.setCursor(0, 24);
      display.print("GO TO: 192.168.4.1");
      display.display();
      
      configMode = true;
      startConfigPortal();
      // Stay in config mode but yield to watchdog
      while (configMode) {
        delay(100);
        yield(); // Yield to watchdog timer
        // Handle config portal tasks here if needed
        // The device can be restarted through the web interface
      }
    }
  } else {
    buttonPressStart = 0;
  }
}

void checkSOSButton() {
  if (digitalRead(SOS_BUTTON) == LOW) {
    Serial.println("SOS BUTTON CLICK");
    sos_status = !sos_status;  // Toggle SOS status
    delay(300);  // Simple debounce
  }
}

#endif