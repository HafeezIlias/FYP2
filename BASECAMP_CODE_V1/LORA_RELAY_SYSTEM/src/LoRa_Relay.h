#pragma once
#ifndef LORA_RELAY_H
#define LORA_RELAY_H

#include "Common.h"

// === LORA RELAY FUNCTIONS ===
bool initializeLoRaRelay(int syncWord = 0xF3);
void handleIncomingLoRaPackets();
bool isPacketDuplicate(const String& packet, const String& nodeId);
String generatePacketHash(const String& packet, const String& nodeId);
void addToPacketHistory(const String& packet, const String& nodeId, int rssi);
void cleanupPacketHistory();
bool attemptLoRaRecovery(int syncWord = 0xF3);
void setLoRaRelayStatus(const String& status);
String getLoRaRelayStatus();

// === PACKET PROCESSING ===
JsonDocument parseLoRaPacket(const String& packet);
bool extractNodeId(const String& packet, String& nodeId);
void processReceivedPacket(const String& packet, int rssi);

// === STATISTICS ===
int getTotalReceivedPackets();
int getTotalForwardedPackets();  
int getTotalDuplicatePackets();
void resetStatistics();
void printRelayStatistics();

#endif // LORA_RELAY_H