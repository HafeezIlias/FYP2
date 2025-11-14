#include "Forwarder.h"
#include <HTTPClient.h>
#include <WiFiUdp.h>

// External references  
extern int totalForwarded;
extern std::vector<ForwardTarget> forwardTargets;

// Local variables
WiFiClient tcpClient;
WiFiUDP udpClient;
std::vector<PacketInfo> retryQueue;

bool initializeForwarder() {
  Serial.println("=== Initializing Packet Forwarder ===");
  
  loadForwardTargets();
  
  Serial.print("Loaded ");
  Serial.print(forwardTargets.size());
  Serial.println(" forward targets");
  
  return true;
}

void loadForwardTargets() {
  prefs.begin("forwarder", true);
  
  // Load number of targets
  int targetCount = prefs.getUInt("target_count", 0);
  forwardTargets.clear();
  
  for (int i = 0; i < targetCount; i++) {
    ForwardTarget target;
    String prefix = "t" + String(i) + "_";
    
    target.name = prefs.getString((prefix + "name").c_str(), "");
    target.type = prefs.getString((prefix + "type").c_str(), "http");
    target.address = prefs.getString((prefix + "addr").c_str(), "");
    target.port = prefs.getInt((prefix + "port").c_str(), 80);
    target.enabled = prefs.getBool((prefix + "enabled").c_str(), true);
    target.lastSuccess = 0;
    target.failureCount = 0;
    
    if (target.name.length() > 0) {
      forwardTargets.push_back(target);
      Serial.print("Loaded target: ");
      Serial.print(target.name);
      Serial.print(" (");
      Serial.print(target.type);
      Serial.print("://");
      Serial.print(target.address);
      if (target.port > 0) {
        Serial.print(":");
        Serial.print(target.port);
      }
      Serial.println(")");
    }
  }
  
  prefs.end();
  
  // Add default HTTP target if none exist
  if (forwardTargets.empty()) {
    Serial.println("No forward targets found, adding default HTTP target");
    addForwardTarget("default-http", FORWARD_HTTP, "httpbin.org", 80);
  }
}

void saveForwardTargets() {
  prefs.begin("forwarder", false);
  prefs.clear(); // Clear all existing data
  
  prefs.putUInt("target_count", forwardTargets.size());
  
  for (int i = 0; i < forwardTargets.size(); i++) {
    String prefix = "t" + String(i) + "_";
    ForwardTarget& target = forwardTargets[i];
    
    prefs.putString((prefix + "name").c_str(), target.name);
    prefs.putString((prefix + "type").c_str(), target.type);
    prefs.putString((prefix + "addr").c_str(), target.address);
    prefs.putInt((prefix + "port").c_str(), target.port);
    prefs.putBool((prefix + "enabled").c_str(), target.enabled);
  }
  
  prefs.end();
  Serial.println("Forward targets saved to preferences");
}

bool addForwardTarget(const String& name, ForwardType type, const String& address, int port) {
  ForwardTarget target;
  target.name = name;
  
  switch (type) {
    case FORWARD_LORA:
      target.type = "lora";
      break;
    case FORWARD_HTTP:
      target.type = "http";
      if (port == 0) port = 80;
      break;
    case FORWARD_TCP:
      target.type = "tcp";
      break;
    case FORWARD_UDP:
      target.type = "udp";
      break;
    case FORWARD_SERIAL:
      target.type = "serial";
      break;
  }
  
  target.address = address;
  target.port = port;
  target.enabled = true;
  target.lastSuccess = 0;
  target.failureCount = 0;
  
  forwardTargets.push_back(target);
  saveForwardTargets();
  
  Serial.print("Added forward target: ");
  Serial.println(name);
  
  return true;
}

bool removeForwardTarget(const String& name) {
  for (auto it = forwardTargets.begin(); it != forwardTargets.end(); ++it) {
    if (it->name == name) {
      forwardTargets.erase(it);
      saveForwardTargets();
      Serial.print("Removed forward target: ");
      Serial.println(name);
      return true;
    }
  }
  return false;
}

void enableForwardTarget(const String& name, bool enabled) {
  for (auto& target : forwardTargets) {
    if (target.name == name) {
      target.enabled = enabled;
      saveForwardTargets();
      Serial.print("Target ");
      Serial.print(name);
      Serial.println(enabled ? " enabled" : " disabled");
      return;
    }
  }
}

bool forwardPacket(const String& packet, const String& nodeId) {
  bool anySuccess = false;
  
  Serial.println("=== Forwarding Packet ===");
  Serial.print("From: ");
  Serial.println(nodeId);
  
  for (auto& target : forwardTargets) {
    if (!target.enabled) {
      continue;
    }
    
    Serial.print("Forwarding to ");
    Serial.print(target.name);
    Serial.print(" (");
    Serial.print(target.type);
    Serial.println(")...");
    
    bool success = false;
    
    if (target.type == "lora") {
      success = forwardToLoRa(packet, target);
    } else if (target.type == "http") {
      success = forwardToHTTP(packet, target);
    } else if (target.type == "tcp") {
      success = forwardToTCP(packet, target);
    } else if (target.type == "udp") {
      success = forwardToUDP(packet, target);
    } else if (target.type == "serial") {
      success = forwardToSerial(packet, target);
    }
    
    if (success) {
      markTargetSuccess(target.name);
      anySuccess = true;
      Serial.println("✓ Forward successful");
    } else {
      markTargetFailure(target.name);
      Serial.println("✗ Forward failed");
    }
  }
  
  if (anySuccess) {
    totalForwarded++;
  }
  
  Serial.println("======================");
  return anySuccess;
}

bool forwardToLoRa(const String& packet, const ForwardTarget& target) {
  // Forward via LoRa (re-transmission)
  // This could be used to create a mesh network
  
  if (!LoRa.beginPacket()) {
    return false;
  }
  
  // Add relay prefix to indicate this is a forwarded packet
  String relayPacket = "{\"relay\":\"" + target.address + "\",\"data\":" + packet + "}";
  
  LoRa.print(relayPacket);
  bool success = LoRa.endPacket();
  
  if (success) {
    Serial.print("LoRa forward to ");
    Serial.print(target.address);
    Serial.println(" completed");
  }
  
  return success;
}

bool forwardToHTTP(const String& packet, const ForwardTarget& target) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected, skipping HTTP forward");
    return false;
  }
  
  HTTPClient http;
  String url = "http://" + target.address;
  
  if (target.port != 80) {
    url += ":" + String(target.port);
  }
  
  // Default path for testing
  url += "/post";
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("User-Agent", "LoRa-Relay/1.0");
  
  // Create forwarded packet with metadata
  JsonDocument doc;
  doc["relay_id"] = relayId;
  doc["timestamp"] = millis();
  doc["original_packet"] = packet;
  doc["rssi"] = -80; // TODO: Get actual RSSI
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  int httpResponseCode = http.POST(jsonString);
  
  bool success = (httpResponseCode >= 200 && httpResponseCode < 300);
  
  if (success) {
    Serial.print("HTTP forward successful (");
    Serial.print(httpResponseCode);
    Serial.println(")");
  } else {
    Serial.print("HTTP forward failed (");
    Serial.print(httpResponseCode);
    Serial.println(")");
  }
  
  http.end();
  return success;
}

bool forwardToTCP(const String& packet, const ForwardTarget& target) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected, skipping TCP forward");
    return false;
  }
  
  if (tcpClient.connect(target.address.c_str(), target.port)) {
    // Send packet with newline delimiter
    tcpClient.println(packet);
    tcpClient.stop();
    
    Serial.print("TCP forward to ");
    Serial.print(target.address);
    Serial.print(":");
    Serial.print(target.port);
    Serial.println(" completed");
    
    return true;
  } else {
    Serial.println("TCP connection failed");
    return false;
  }
}

bool forwardToUDP(const String& packet, const ForwardTarget& target) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected, skipping UDP forward");
    return false;
  }
  
  udpClient.begin(8080); // Local port
  
  if (udpClient.beginPacket(target.address.c_str(), target.port)) {
    udpClient.print(packet);
    bool success = udpClient.endPacket();
    
    if (success) {
      Serial.print("UDP forward to ");
      Serial.print(target.address);
      Serial.print(":");
      Serial.print(target.port);
      Serial.println(" completed");
    }
    
    return success;
  }
  
  return false;
}

bool forwardToSerial(const String& packet, const ForwardTarget& target) {
  // Forward to serial port (useful for debugging or connecting to other systems)
  Serial.print("RELAY_DATA: ");
  Serial.println(packet);
  
  return true; // Serial always "succeeds"
}

void markTargetSuccess(const String& name) {
  for (auto& target : forwardTargets) {
    if (target.name == name) {
      target.lastSuccess = millis();
      target.failureCount = 0;
      return;
    }
  }
}

void markTargetFailure(const String& name) {
  for (auto& target : forwardTargets) {
    if (target.name == name) {
      target.failureCount++;
      
      // Disable target after too many failures
      if (target.failureCount >= 5) {
        Serial.print("Disabling target ");
        Serial.print(name);
        Serial.println(" due to repeated failures");
        target.enabled = false;
        saveForwardTargets();
      }
      return;
    }
  }
}

void checkTargetHealth() {
  unsigned long currentTime = millis();
  
  for (auto& target : forwardTargets) {
    if (!target.enabled) continue;
    
    // Re-enable targets after 10 minutes if they were disabled due to failures
    if (target.failureCount >= 5 && currentTime - target.lastSuccess > 600000) {
      Serial.print("Re-enabling target ");
      Serial.print(target.name);
      Serial.println(" after cooldown period");
      
      target.enabled = true;
      target.failureCount = 0;
      saveForwardTargets();
    }
  }
}

std::vector<ForwardTarget> getActiveTargets() {
  std::vector<ForwardTarget> active;
  
  for (const auto& target : forwardTargets) {
    if (target.enabled) {
      active.push_back(target);
    }
  }
  
  return active;
}

void printForwardTargets() {
  Serial.println("=== Forward Targets ===");
  
  for (const auto& target : forwardTargets) {
    Serial.print(target.enabled ? "[✓] " : "[✗] ");
    Serial.print(target.name);
    Serial.print(" (");
    Serial.print(target.type);
    Serial.print("://");
    Serial.print(target.address);
    
    if (target.port > 0) {
      Serial.print(":");
      Serial.print(target.port);
    }
    
    Serial.print(") Failures: ");
    Serial.println(target.failureCount);
  }
  
  Serial.println("======================");
}

void processRetryQueue() {
  // Implementation for retry mechanism
  // This would handle packets that failed to forward
  // For now, we keep it simple and don't implement retry queue
}

void retryFailedForwards() {
  // Check for any packets in retry queue and attempt to forward them again
  processRetryQueue();
}