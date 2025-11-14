#ifndef BATTERY_H
#define BATTERY_H

#include "config.h"

// Function declarations
void initBattery();
float readBatteryVoltage();
int getBatteryPercentage(float voltage);

void initBattery() {
  analogReadResolution(12);  // 0-4095
  analogSetAttenuation(ADC_11db);  // allow full 3.3V range
  Serial.println("Battery monitoring initialized");
}

float readBatteryVoltage() {
  int raw = analogRead(BATTERY_PIN);
  float voltage = (raw / 4095.0) * 3.3 * VOLTAGE_DIVIDER_RATIO;
  return voltage;
}

int getBatteryPercentage(float voltage) {
  if (voltage >= MAX_BATTERY_VOLTAGE) return 100;
  if (voltage <= MIN_BATTERY_VOLTAGE) return 0;
  return (int)(((voltage - MIN_BATTERY_VOLTAGE) / (MAX_BATTERY_VOLTAGE - MIN_BATTERY_VOLTAGE)) * 100);
}

#endif  // BATTERY_H
// End of battery.h