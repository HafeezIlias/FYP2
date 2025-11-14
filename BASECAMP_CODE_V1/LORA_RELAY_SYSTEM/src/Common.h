#pragma once
#ifndef COMMON_H
#define COMMON_H

#include <Arduino.h>
#include <WiFi.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include <LoRa.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <ESPAsyncWebServer.h>
#include <vector>
#include <map>

// === HARDWARE CONFIGURATION ===
// LoRa pins (same as BASECAMP for compatibility)
#define LORA_SS     5
#define LORA_RST    14
#define LORA_DIO0   2
#define LORA_BAND   433E6

// Display pins
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET     -1
#define SCREEN_ADDRESS 0x3C

// Button pins
#define CONFIG_BUTTON 0
#define RESET_BUTTON  4

// === RELAY CONFIGURATION ===
#define MAX_PACKET_HISTORY 1000
#define PACKET_CLEANUP_INTERVAL 300000  // 5 minutes
#define PACKET_DUPLICATE_WINDOW 60000   // 1 minute duplicate detection window
#define MAX_FORWARD_RETRIES 3
#define FORWARD_RETRY_DELAY 1000

// === DATA STRUCTURES ===
struct PacketInfo {
  String packetHash;
  String nodeId;
  unsigned long timestamp;
  int rssi;
  String data;
  bool forwarded;
  int forwardAttempts;
};

struct ForwardTarget {
  String name;
  String type;  // "lora", "http", "tcp", "udp"
  String address;
  int port;
  bool enabled;
  unsigned long lastSuccess;
  int failureCount;
};

// === GLOBAL VARIABLES ===
extern String relayId;
extern String ssid;
extern String password;
extern bool configMode;
extern Preferences prefs;

// Relay system globals
extern std::vector<PacketInfo> packetHistory;
extern std::vector<ForwardTarget> forwardTargets;
extern std::map<String, unsigned long> packetHashes;
extern unsigned long lastCleanup;
extern int totalReceived;
extern int totalForwarded;
extern int totalDuplicates;
extern String lastReceivedFrom;

// Display
extern Adafruit_SSD1306 display;

// LoRa status
extern String loraStatus;
extern bool loraInitialized;

// Network
extern AsyncWebServer server;

#endif // COMMON_H