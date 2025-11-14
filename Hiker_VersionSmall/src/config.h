#ifndef CONFIG_H
#define CONFIG_H

// ============= LIBRARIES =============
#include <Arduino.h>
#include <ArduinoJson.h>

// ============= PIN DEFINITIONS =============
// ESP32-C3 Super Mini Pin Allocation (based on actual pinout):
// GPIO 2: LoRa RST    GPIO 3: Battery ADC   GPIO 5: Config Button
// GPIO 6: SOS Button  GPIO 7: LoRa SS       GPIO 8: I2C SDA
// GPIO 9: I2C SCL     GPIO 10: LoRa DIO0    GPIO 20: GPS RX
// GPIO 21: GPS TX

// LoRa Module
#define LORA_SS     7   // GPIO7 (SS pin on Super Mini)
#define LORA_RST    2   // GPIO2 (A2)
#define LORA_DIO0   10  // GPIO10 (available digital pin)
#define LORA_BAND   433E6  // 433MHz frequency band

// GPS Module - Using dedicated UART pins
#define RXD2        20  // GPS TX → ESP32 RX (dedicated RX pin)
#define TXD2        21  // GPS RX → ESP32 TX (dedicated TX pin)
#define GPS_BAUD    9600

// Buttons
#define CONFIG_BUTTON  0  // Config mode button (GPIO0)
#define SOS_BUTTON     1  // SOS emergency button

// OLED Display - Using GPIO 8 (SDA) and GPIO 9 (SCL) as specified
#define SCREEN_WIDTH   128
#define SCREEN_HEIGHT  64
#define OLED_RESET     -1
#define OLED_ADDRESS   0x3C
#define I2C_SDA        8
#define I2C_SCL        9

// Battery - ADC pin for battery voltage monitoring
#define BATTERY_PIN 3

// ============= CONFIGURATION CONSTANTS =============
const float MAX_BATTERY_VOLTAGE = 4.2;  // fully charged Li-ion
const float MIN_BATTERY_VOLTAGE = 3.3;  // considered empty
const float VOLTAGE_DIVIDER_RATIO = 2.0;  // 100k:100k = divide by 2

const int LONG_PRESS_DURATION = 3000;  // 3 seconds for config mode activation
const String AP_SSID = "CONFIG NODE 01";

// ============= GPS ICON BITMAP =============
#define GPS_ICON_WIDTH  16
#define GPS_ICON_HEIGHT 16
const unsigned char gps_icon_bitmap[] PROGMEM = {
  0b00000000, 0b00000000,
  0b00000000, 0b00000000,
  0b00000111, 0b11100000,
  0b00001111, 0b11110000,
  0b00011100, 0b00111000,
  0b00011100, 0b00111000,
  0b00111000, 0b00011100,
  0b00111000, 0b00011100,
  0b00111000, 0b00011100,
  0b00011100, 0b00111000,
  0b00011111, 0b11111000,
  0b00001111, 0b11110000,
  0b00000111, 0b11100000,
  0b00000000, 0b00000000,
  0b00000000, 0b00000000,
  0b00000000, 0b00000000
};

#endif