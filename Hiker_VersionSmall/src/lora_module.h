#ifndef LORA_MODULE_H
#define LORA_MODULE_H

#include <SPI.h>
#include <LoRa.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include "config.h"

// Forward declaration
extern Adafruit_SSD1306 display;

// Global variables for LoRa status
extern String loraStatus;
extern int packetCount;

void initLoRa() {
  // Get stored sync word or use default
  Preferences prefs;
  prefs.begin("config", false);
  int storedSync = prefs.getUInt("sync_word", 0xF3);
  prefs.end();
  
  // Initialize LoRa
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);

  int retries = 0;
  const int maxRetries = 5;
  while (!LoRa.begin(LORA_BAND)) {
    Serial.printf("LoRa init failed! Retrying... (%d/%d)\n", retries + 1, maxRetries);
    
    // Show error on display
    display.clearDisplay();
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.print("LoRa init fail ");
    display.print(retries + 1);
    display.print("/");
    display.println(maxRetries);
    display.display();

    retries++;
    delay(1000);  // 1 second delay between retries

    if (retries >= maxRetries) {
      Serial.println("LoRa initialization failed after max retries. Continuing without LoRa.");
      display.clearDisplay();
      display.setCursor(0, 0);
      display.println("LoRa init failed!");
      display.setCursor(0, 10);
      display.println("Continuing...");
      display.display();
      delay(2000);
      return; // Continue without LoRa rather than halt
    }
  }
  // Set sync word (network ID)
  LoRa.setSyncWord(storedSync);
  Serial.println("LoRa started successfully");
  Serial.printf("LoRa sync word: 0x%02X\n", storedSync);
}

void sendLoRaPacket(String jsonData) {
  Serial.println("Sending LoRa packet: " + jsonData);
  
  LoRa.beginPacket();
  LoRa.print(jsonData);
  LoRa.endPacket();
  
  loraStatus = "Sent!";
  Serial.println("📡 LoRa packet sent successfully");
}

bool isLoRaPacketAvailable() {
  return LoRa.parsePacket() > 0;
}

String readLoRaPacket() {
  String packet = "";
  while (LoRa.available()) {
    packet += (char)LoRa.read();
  }
  return packet;
}

void relayLoRaPacket(String receivedPacket) {
  // Parse the JSON to check if it should be relayed
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, receivedPacket);
  
  if (error) {
    Serial.println("❌ Failed to parse received packet for relay");
    return;
  }
  
  // Get max hops from preferences
  Preferences prefs;
  prefs.begin("config", false);
  int maxHops = prefs.getUChar("max_hops", 5);
  prefs.end();
  
  // Check if packet already has relay count to prevent infinite loops
  int relayCount = doc["relay_count"] | 0;
  
  // Only relay if relay count is less than max hops
  if (relayCount < maxHops) {
    // Add relay information
    doc["relay_count"] = relayCount + 1;
    doc["relayed_by"] = "NODE_01"; // or your node ID
    doc["relayed_at"] = millis();
    
    // Convert back to JSON string
    String relayPacket;
    serializeJson(doc, relayPacket);
    
    // Small delay before relaying to avoid collision
    delay(random(100, 500));
    
    // Relay the packet
    sendLoRaPacket(relayPacket);
    Serial.println("🔄 Packet relayed with count: " + String(relayCount + 1));
  } else {
    Serial.println("⛔ Packet not relayed - max hop count reached");
  }
}

void receiveLoRaPackets() {
  // Check for incoming LoRa packets
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // Read packet
    String packet = readLoRaPacket();
    
    Serial.println("Received LoRa packet: " + packet);
    loraStatus = "Received!";
    packetCount++;
    
    // Get RSSI (signal strength) of received packet
    int rssi = LoRa.packetRssi();
    Serial.printf("Packet RSSI: %d dBm\n", rssi);
    
    // Relay the packet to other nodes
    relayLoRaPacket(packet);
  }
}

void handleLoRaReception() {
  if (isLoRaPacketAvailable()) {
    String packet = readLoRaPacket();
    Serial.println("Received: " + packet);
    loraStatus = "Received!";
    packetCount++;
    
    // Simple relay without detailed logging
    relayLoRaPacket(packet);
  }
}

#endif