#pragma once
#ifndef FORWARDER_H
#define FORWARDER_H

#include "Common.h"

// === FORWARDING MECHANISMS ===
enum ForwardType {
  FORWARD_LORA,
  FORWARD_HTTP,
  FORWARD_TCP,
  FORWARD_UDP,
  FORWARD_SERIAL
};

// === FORWARDER FUNCTIONS ===
bool initializeForwarder();
void loadForwardTargets();
void saveForwardTargets();
bool addForwardTarget(const String& name, ForwardType type, const String& address, int port = 0);
bool removeForwardTarget(const String& name);
void enableForwardTarget(const String& name, bool enabled = true);

// === PACKET FORWARDING ===
bool forwardPacket(const String& packet, const String& nodeId);
bool forwardToLoRa(const String& packet, const ForwardTarget& target);
bool forwardToHTTP(const String& packet, const ForwardTarget& target);
bool forwardToTCP(const String& packet, const ForwardTarget& target);
bool forwardToUDP(const String& packet, const ForwardTarget& target);
bool forwardToSerial(const String& packet, const ForwardTarget& target);

// === TARGET MANAGEMENT ===
void checkTargetHealth();
void markTargetFailure(const String& name);
void markTargetSuccess(const String& name);
std::vector<ForwardTarget> getActiveTargets();
void printForwardTargets();

// === RETRY MECHANISM ===
void processRetryQueue();
void retryFailedForwards();

#endif // FORWARDER_H