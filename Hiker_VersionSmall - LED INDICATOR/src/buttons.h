#ifndef BUTTONS_H
#define BUTTONS_H

#include "config.h"

// Forward declarations
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
      // Indicate config mode with alternating LED pattern
      for (int i = 0; i < 6; i++) {
        digitalWrite(LED_STATUS, i % 2);
        digitalWrite(LED_TRANSMIT, (i + 1) % 2);
        delay(200);
      }
      
      Serial.println("CONFIG MODE ACTIVE");
      Serial.printf("SSID: %s\n", AP_SSID.c_str());
      Serial.println("GO TO: 192.168.4.1");
      
      configMode = true;
      startConfigPortal();
      Serial.println("Config portal started - device will restart when configuration is saved");
      // Config portal will handle restart when settings are saved
      // No blocking loop needed - device will restart via ESP.restart() in config_portal.h
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