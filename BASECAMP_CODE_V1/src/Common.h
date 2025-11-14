#ifndef COMMON_H
#define COMMON_H

#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include <DNSServer.h>
#include <ESPAsyncWebServer.h>
#include <Firebase_ESP_Client.h>
#include <TinyGPS++.h>

// === GLOBAL CONSTANTS ===
extern const char* apSSID;
extern String nodeId;

// === PIN DEFINITIONS ===
#define SOSBUTTON 13
#define CONFIG 0
#define SENDBUTTON 4
#define BATTERY_PIN 33
#define BATTERY_DIVIDER_RATIO 2.0
#define COOLING_MOSFET_PIN 26

// === LoRa SETTINGS ===
#define LORA_SS    5
#define LORA_RST   14
#define LORA_DIO0  2
#define LORA_BAND  433E6

// === OLED SETTINGS ===
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// === GPS SETTINGS ===
#define RXD2 16
#define TXD2 17
#define GPS_BAUD 9600

// === WiFi Configuration ===
#define WIFI_SSID "SS2DM02"
#define WIFI_PASSWORD "passwordwifi"

// === Firebase Configuration (Default Values) ===
#define DEFAULT_API_KEY "AIzaSyASPVcTGt_-Her5-40LHWcw7nlq-kI_o1g"
#define DEFAULT_DATABASE_URL "https://trackers-5dd51-default-rtdb.asia-southeast1.firebasedatabase.app/"

// === Firebase Runtime Configuration ===
extern String firebaseAPIKey;
extern String firebaseDatabaseURL;

// === CONFIGURATION FUNCTIONS ===
void loadFirebaseConfig();
void saveFirebaseConfig(String apiKey, String databaseURL);

// === DATA VALIDATION FUNCTIONS ===
bool isValidFloat(float value, float minValue, float maxValue);
bool isValidInt(int value, int minValue, int maxValue);
bool isValidString(String str, int maxLength);
bool isValidNodeId(String nodeId);
bool isValidJSON(String jsonStr);
bool isValidLatitude(float lat);
bool isValidLongitude(float lon);

// === GLOBAL OBJECTS ===
extern Preferences prefs;
extern AsyncWebServer server;
extern DNSServer dns;
extern Adafruit_SSD1306 display;
extern FirebaseData fbdo;
extern FirebaseAuth auth;
extern FirebaseConfig config;

// === GLOBAL STATUS VARIABLES ===
extern bool sos_status;
extern bool signupOK;
extern bool configModeActive;
extern unsigned long deviceStartTime;
extern unsigned long lastTelemetryUpdate;
extern const long telemetryInterval;

#endif 