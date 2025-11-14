#include "LoRa_Relay.h"

// Global variables definition
String loraStatus = "Initializing";
bool loraInitialized = false;
std::vector<PacketInfo> packetHistory;
std::map<String, unsigned long> packetHashes;
unsigned long lastCleanup = 0;
int totalReceived = 0;
int totalForwarded = 0;
int totalDuplicates = 0;
String lastReceivedFrom = "None";

// Hardware reset function
void resetLoRaHardware() {
  pinMode(LORA_RST, OUTPUT);
  digitalWrite(LORA_RST, LOW);
  delay(10);
  digitalWrite(LORA_RST, HIGH);
  delay(100);
}

// SPI test function
bool testSPI() {
  SPI.begin();
  pinMode(LORA_SS, OUTPUT);
  digitalWrite(LORA_SS, HIGH);
  delay(10);
  digitalWrite(LORA_SS, LOW);
  delay(10);
  digitalWrite(LORA_SS, HIGH);
  return true;
}

bool initializeLoRaRelay(int syncWord) {
  const int maxRetries = 10;
  const int baseDelay = 300;
  
  Serial.println("=== LoRa Relay System Initialization ===");
  
  // Configure pins
  pinMode(LORA_SS, OUTPUT);
  pinMode(LORA_RST, OUTPUT);
  pinMode(LORA_DIO0, INPUT);
  digitalWrite(LORA_SS, HIGH);
  
  delay(500);
  
  // Test SPI bus
  for (int spiTest = 0; spiTest < 3; spiTest++) {
    if (testSPI()) {
      Serial.println("SPI test passed");
      break;
    }
    if (spiTest == 2) {
      Serial.println("SPI test failed!");
      loraInitialized = false;
      loraStatus = "SPI Failed";
      return false;
    }
    delay(100);
  }
  
  // Initialize LoRa at 433MHz
  const long targetFreq = 433E6;
  Serial.print("Initializing LoRa Relay at ");
  Serial.print(targetFreq / 1E6);
  Serial.println(" MHz");
  
  for (int attempt = 1; attempt <= maxRetries; attempt++) {
    Serial.print("LoRa relay init attempt ");
    Serial.print(attempt);
    Serial.print("/");
    Serial.println(maxRetries);
      
    resetLoRaHardware();
    delay(50);
    
    SPI.end();
    delay(10);
    SPI.begin();
    delay(10);
    
    LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
    
    if (LoRa.begin(targetFreq)) {
      // Configure LoRa for optimal relay performance
      LoRa.setSyncWord(syncWord);
      LoRa.setSpreadingFactor(7);      // Good balance for range/speed
      LoRa.setSignalBandwidth(125E3);  // Standard bandwidth
      LoRa.setCodingRate4(5);          // Error correction
      LoRa.setPreambleLength(8);       // Standard preamble
      LoRa.setTxPower(17);            // Moderate power for relay
      LoRa.enableCrc();               // Enable error checking
      LoRa.receive();                 // Set to receive mode
      
      delay(50);
      
      Serial.println("LoRa Relay initialized successfully!");
      Serial.print("Sync word: 0x");
      Serial.println(syncWord, HEX);
      Serial.println("Mode: Continuous receive for relay");
      
      loraInitialized = true;
      loraStatus = "Ready (Relay)";
      return true;
    } else {
      Serial.print("LoRa.begin() failed on attempt ");
      Serial.println(attempt);
    }
    
    int delayTime = baseDelay + (attempt * 100);
    if (attempt > 5) delayTime += 500;
    delay(delayTime);
    
    if (attempt % 3 == 0) {
      Serial.println("Forcing SPI reset...");
      SPI.end();
      delay(100);
      SPI.begin();
      delay(100);
    }
  }
  
  // Final attempt with minimal config
  Serial.println("Trying minimal LoRa relay configuration...");
  resetLoRaHardware();
  delay(200);
  
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (LoRa.begin(433E6)) {
    LoRa.setSyncWord(0x12);
    LoRa.receive();
    Serial.println("LoRa relay initialized with minimal config!");
    loraInitialized = true;
    loraStatus = "Ready (Min)";
    return true;
  }
  
  Serial.println("====================================");
  Serial.println("CRITICAL: LoRa Relay initialization failed!");
  Serial.println("Check hardware connections");
  Serial.println("====================================");
  
  loraInitialized = false;
  loraStatus = "FAILED";
  return false;
}

String generatePacketHash(const String& packet, const String& nodeId) {
  // Simple hash based on packet content + node ID + time window
  // Time window ensures same packet from same node within 1 minute is considered duplicate
  unsigned long timeWindow = millis() / PACKET_DUPLICATE_WINDOW;
  
  String hashInput = packet + nodeId + String(timeWindow);
  
  // Simple hash algorithm (could be improved with proper hash function)
  unsigned long hash = 0;
  for (int i = 0; i < hashInput.length(); i++) {
    hash = hash * 31 + hashInput.charAt(i);
  }
  
  return String(hash, HEX);
}

bool isPacketDuplicate(const String& packet, const String& nodeId) {
  String hash = generatePacketHash(packet, nodeId);
  
  // Check if this hash exists in recent history
  if (packetHashes.find(hash) != packetHashes.end()) {
    // Check if the duplicate is within our detection window
    unsigned long lastSeen = packetHashes[hash];
    if (millis() - lastSeen < PACKET_DUPLICATE_WINDOW) {
      totalDuplicates++;
      Serial.print("Duplicate packet detected from ");
      Serial.print(nodeId);
      Serial.print(" (hash: ");
      Serial.print(hash);
      Serial.println(")");
      return true;
    }
  }
  
  // Not a duplicate, add to hash map
  packetHashes[hash] = millis();
  return false;
}

void addToPacketHistory(const String& packet, const String& nodeId, int rssi) {
  PacketInfo info;
  info.packetHash = generatePacketHash(packet, nodeId);
  info.nodeId = nodeId;
  info.timestamp = millis();
  info.rssi = rssi;
  info.data = packet;
  info.forwarded = false;
  info.forwardAttempts = 0;
  
  packetHistory.push_back(info);
  
  // Limit history size
  if (packetHistory.size() > MAX_PACKET_HISTORY) {
    packetHistory.erase(packetHistory.begin());
  }
}

void cleanupPacketHistory() {
  unsigned long currentTime = millis();
  
  // Remove old entries from packet hashes
  auto it = packetHashes.begin();
  while (it != packetHashes.end()) {
    if (currentTime - it->second > PACKET_DUPLICATE_WINDOW * 2) {
      it = packetHashes.erase(it);
    } else {
      ++it;
    }
  }
  
  // Remove old entries from packet history
  auto histIt = packetHistory.begin();
  while (histIt != packetHistory.end()) {
    if (currentTime - histIt->timestamp > PACKET_CLEANUP_INTERVAL) {
      histIt = packetHistory.erase(histIt);
    } else {
      ++histIt;
    }
  }
  
  lastCleanup = currentTime;
  Serial.println("Cleaned up packet history and hash cache");
}

JsonDocument parseLoRaPacket(const String& packet) {
  JsonDocument doc;
  DeserializationError error = deserializeJson(doc, packet);
  
  if (error) {
    Serial.print("JSON parse error: ");
    Serial.println(error.c_str());
  }
  
  return doc;
}

bool extractNodeId(const String& packet, String& nodeId) {
  JsonDocument doc = parseLoRaPacket(packet);
  
  if (doc.containsKey("node_id")) {
    nodeId = doc["node_id"].as<String>();
    return true;
  }
  
  // Fallback: try to extract from different possible keys
  if (doc.containsKey("nodeId")) {
    nodeId = doc["nodeId"].as<String>();
    return true;
  }
  
  if (doc.containsKey("id")) {
    nodeId = doc["id"].as<String>();
    return true;
  }
  
  // If no ID found, use "UNKNOWN"
  nodeId = "UNKNOWN";
  return false;
}

void processReceivedPacket(const String& packet, int rssi) {
  totalReceived++;
  
  String nodeId;
  extractNodeId(packet, nodeId);
  lastReceivedFrom = nodeId;
  
  Serial.println("=== Received LoRa Packet ===");
  Serial.print("From: ");
  Serial.println(nodeId);
  Serial.print("RSSI: ");
  Serial.println(rssi);
  Serial.print("Data: ");
  Serial.println(packet);
  
  // Check for duplicates
  if (isPacketDuplicate(packet, nodeId)) {
    Serial.println("Packet marked as duplicate, skipping forward");
    return;
  }
  
  // Add to history
  addToPacketHistory(packet, nodeId, rssi);
  
  // Forward packet (will be implemented in forwarding module)
  Serial.println("Packet ready for forwarding");
  Serial.println("========================");
}

void handleIncomingLoRaPackets() {
  if (!loraInitialized) {
    return;
  }
  
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String packet = "";
    while (LoRa.available()) {
      packet += (char)LoRa.read();
    }
    
    int rssi = LoRa.packetRssi();
    processReceivedPacket(packet, rssi);
    
    loraStatus = "Received";
  }
  
  // Periodic cleanup
  if (millis() - lastCleanup > PACKET_CLEANUP_INTERVAL) {
    cleanupPacketHistory();
  }
}

bool attemptLoRaRecovery(int syncWord) {
  if (loraInitialized) {
    return true;
  }
  
  Serial.println("Attempting LoRa Relay recovery...");
  
  for (int attempt = 1; attempt <= 3; attempt++) {
    Serial.print("Recovery attempt ");
    Serial.println(attempt);
    
    resetLoRaHardware();
    delay(100);
    
    LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
    
    if (LoRa.begin(LORA_BAND)) {
      LoRa.setSyncWord(syncWord);
      LoRa.setSpreadingFactor(7);
      LoRa.setSignalBandwidth(125E3);
      LoRa.setCodingRate4(5);
      LoRa.setPreambleLength(8);
      LoRa.setTxPower(17);
      LoRa.enableCrc();
      LoRa.receive(); // Set to receive mode
      
      delay(50);
      Serial.println("LoRa Relay recovery successful!");
      loraInitialized = true;
      loraStatus = "Recovered";
      return true;
    }
    
    delay(500 * attempt);
  }
  
  Serial.println("LoRa Relay recovery failed");
  loraStatus = "Recovery Failed";
  return false;
}

void setLoRaRelayStatus(const String& status) {
  loraStatus = status;
}

String getLoRaRelayStatus() {
  return loraStatus;
}

int getTotalReceivedPackets() {
  return totalReceived;
}

int getTotalForwardedPackets() {
  return totalForwarded;
}

int getTotalDuplicatePackets() {
  return totalDuplicates;
}

void resetStatistics() {
  totalReceived = 0;
  totalForwarded = 0;
  totalDuplicates = 0;
  packetHistory.clear();
  packetHashes.clear();
  lastReceivedFrom = "None";
  Serial.println("Relay statistics reset");
}

void printRelayStatistics() {
  Serial.println("=== LoRa Relay Statistics ===");
  Serial.print("Total Received: ");
  Serial.println(totalReceived);
  Serial.print("Total Forwarded: ");
  Serial.println(totalForwarded);
  Serial.print("Total Duplicates: ");
  Serial.println(totalDuplicates);
  Serial.print("Last Received From: ");
  Serial.println(lastReceivedFrom);
  Serial.print("History Size: ");
  Serial.println(packetHistory.size());
  Serial.print("Hash Cache Size: ");
  Serial.println(packetHashes.size());
  Serial.println("===========================");
}