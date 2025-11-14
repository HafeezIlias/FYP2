#ifndef BUTTONS_H
#define BUTTONS_H

#include "Common.h"

// Button constants - mapping Common.h definitions to expected names
#define SEND_BUTTON SENDBUTTON
#define CONFIG_BUTTON CONFIG
#define SOS_BUTTON SOSBUTTON
#define AP_SSID apSSID
#define LONG_PRESS_DURATION 3000  // 3 seconds for long press

// Forward declarations
extern Adafruit_SSD1306 display;
extern unsigned long buttonPressStart;
extern bool configMode;
extern bool sos_status;

// Function declarations
void initButtons();
void checkSOSButton();

// Implementations
void initButtons() {
  pinMode(SEND_BUTTON, INPUT_PULLUP);
  pinMode(CONFIG_BUTTON, INPUT_PULLUP);
  pinMode(SOS_BUTTON, INPUT_PULLUP);
  Serial.println("Buttons initialized");
}

void checkSOSButton() {
  if (digitalRead(SOS_BUTTON) == LOW) {
    Serial.println("SOS BUTTON CLICK");
    sos_status = !sos_status;  // Toggle SOS status
    delay(300);  // Simple debounce
  }
}

#endif