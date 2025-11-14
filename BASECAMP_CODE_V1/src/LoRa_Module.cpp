#include "LoRa_Module.h"

// External references
extern String loraStatus;
extern int packetCount;

// Forward declaration
void forwardPacketToFirebase(String packet);

// Global LoRa status
static bool loraInitialized = false;

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

bool initializeLoRa(int syncWord) {
  const int maxRetries = 10; // Increased from 5 to 10
  const int baseDelay = 300;  // Reduced base delay
  
  Serial.println("Starting LoRa initialization...");
  
  // Configure pins with pull-ups/downs
  pinMode(LORA_SS, OUTPUT);
  pinMode(LORA_RST, OUTPUT);
  pinMode(LORA_DIO0, INPUT);
  digitalWrite(LORA_SS, HIGH);  // Ensure SS is high initially
  
  // Extended power stabilization
  delay(500);
  
  // Test SPI bus multiple times
  for (int spiTest = 0; spiTest < 3; spiTest++) {
    if (testSPI()) {
      Serial.println("SPI test passed");
      break;
    }
    if (spiTest == 2) {
      Serial.println("SPI test failed after multiple attempts!");
      loraInitialized = false;
      return false;
    }
    delay(100);
  }
  
  // Focus on 433MHz with aggressive retry strategy
  const long targetFreq = 433E6; // 433MHz only
  Serial.print("Initializing LoRa at ");
  Serial.print(targetFreq / 1E6);
  Serial.println(" MHz");
  
  for (int attempt = 1; attempt <= maxRetries; attempt++) {
    Serial.print("LoRa init attempt ");
    Serial.print(attempt);
    Serial.print("/");
    Serial.print(maxRetries);
    Serial.println(" (433MHz)");
      
      // Extended hardware reset sequence
      resetLoRaHardware();
      delay(50); // Additional settling time
      
      // Re-initialize SPI
      SPI.end();
      delay(10);
      SPI.begin();
      delay(10);
      
      // Configure LoRa pins
      LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
      
    // Attempt initialization at 433MHz
    if (LoRa.begin(targetFreq)) {
      // Success! Configure LoRa settings optimized for 433MHz
      LoRa.setSyncWord(syncWord);
      LoRa.setSpreadingFactor(7);      // SF7 - good balance of range/speed
      LoRa.setSignalBandwidth(125E3);  // 125kHz - standard for 433MHz
      LoRa.setCodingRate4(5);          // 4/5 coding rate
      LoRa.setPreambleLength(8);       // 8 symbol preamble
      LoRa.setTxPower(20);            // Maximum power for 433MHz
      LoRa.enableCrc();               // Enable error checking
      
      // Small delay for settings to take effect
      delay(50);
      
      Serial.println("LoRa 433MHz initialized successfully!");
      Serial.print("Sync word: 0x");
      Serial.println(syncWord, HEX);
      loraInitialized = true;
      loraStatus = "Ready";
      return true;
    } else {
      Serial.print("LoRa.begin(433MHz) failed on attempt ");
      Serial.println(attempt);
    }
    
    // Progressive delay strategy
    int delayTime = baseDelay + (attempt * 100);
    if (attempt > 5) delayTime += 500; // Longer delays for later attempts
    delay(delayTime);
    
    // Force SPI reset every few attempts
    if (attempt % 3 == 0) {
      Serial.println("Forcing SPI reset for 433MHz...");
      SPI.end();
      delay(100);
      SPI.begin();
      delay(100);
    }
  }
  
  // Ultimate fallback - try with minimal settings
  Serial.println("Trying minimal LoRa configuration as last resort...");
  resetLoRaHardware();
  delay(200);
  
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (LoRa.begin(433E6)) {
    // Minimal configuration
    LoRa.setSyncWord(0x12); // Default sync word
    Serial.println("LoRa initialized with minimal config!");
    loraInitialized = true;
    loraStatus = "Ready (Min)";
    return true;
  }
  
  // All attempts failed
  Serial.println("====================================");
  Serial.println("CRITICAL: LoRa initialization failed!");
  Serial.println("Check hardware connections:");
  Serial.println("- SS pin (GPIO 5)");
  Serial.println("- RST pin (GPIO 14)"); 
  Serial.println("- DIO0 pin (GPIO 2)");
  Serial.println("- Power supply (3.3V)");
  Serial.println("- Antenna connection");
  Serial.println("====================================");
  
  loraInitialized = false;
  loraStatus = "FAILED";
  return false;
}

void handleLoRaPackets() {
  if (!loraInitialized) {
    return; // Skip if LoRa not initialized
  }
  
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // Read packet
    String packet = "";
    while (LoRa.available()) {
      packet += (char)LoRa.read();
    }
    
    String message = "Received packet: ";
    message += packet;
    Serial.println(message);
    
    loraStatus = "Received!";
    packetCount++;
    
    // Forward packet to Firebase
    forwardPacketToFirebase(packet);
  }
}

void setLoRaStatus(String status) {
  loraStatus = status;
}

int getPacketCount() {
  return packetCount;
}

bool isLoRaInitialized() {
  return loraInitialized;
}

bool attemptLoRaRecovery(int syncWord) {
  if (loraInitialized) {
    return true; // Already working
  }
  
  Serial.println("Attempting LoRa recovery...");
  
  // Try quick recovery first (3 attempts)
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
      LoRa.setTxPower(20);
      LoRa.enableCrc();
      
      delay(50);
      Serial.println("LoRa recovery successful!");
      loraInitialized = true;
      loraStatus = "Recovered";
      return true;
    }
    
    delay(500 * attempt); // Progressive delay
  }
  
  Serial.println("LoRa recovery failed");
  loraStatus = "Recovery Failed";
  return false;
} 