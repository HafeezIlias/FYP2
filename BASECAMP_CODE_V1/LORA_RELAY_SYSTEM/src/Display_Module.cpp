#include "Display_Module.h"

// Global display object
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Display state
DisplayPage currentPage = PAGE_STATUS;
unsigned long lastDisplayUpdate = 0;
unsigned long pageChangeTime = 0;
const unsigned long PAGE_DURATION = 3000; // 3 seconds per page

// External references
extern String loraStatus;
extern String lastReceivedFrom;
extern int totalReceived;
extern int totalForwarded;
extern int totalDuplicates;
extern String relayId;

bool initializeDisplay() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 allocation failed");
    return false;
  }

  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.cp437(true);
  
  Serial.println("Display initialized");
  return true;
}

void showSplashScreen() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0, 0);
  display.println("LoRa");
  display.println("RELAY");
  
  display.setTextSize(1);
  display.setCursor(0, 35);
  display.print("ID: ");
  display.println(relayId);
  
  display.setCursor(0, 45);
  display.println("Starting system...");
  
  display.display();
  delay(2000);
}

void showRelayStatus() {
  display.clearDisplay();
  display.setTextSize(1);
  
  // Header
  display.setCursor(0, 0);
  display.println("=== RELAY STATUS ===");
  
  // LoRa Status
  display.setCursor(0, 12);
  display.print("LoRa: ");
  display.println(loraStatus);
  
  // Last received
  display.setCursor(0, 22);
  display.print("From: ");
  display.println(lastReceivedFrom);
  
  // WiFi Status
  display.setCursor(0, 32);
  display.print("WiFi: ");
  if (WiFi.status() == WL_CONNECTED) {
    display.println("Connected");
  } else {
    display.println("Disconnected");
  }
  
  // Uptime
  display.setCursor(0, 42);
  display.print("Up: ");
  unsigned long uptime = millis() / 1000;
  unsigned long hours = uptime / 3600;
  unsigned long minutes = (uptime % 3600) / 60;
  display.print(hours);
  display.print("h ");
  display.print(minutes);
  display.println("m");
  
  // Current page indicator
  display.setCursor(0, 55);
  display.println("STATUS (1/4)");
}

void showStatistics() {
  display.clearDisplay();
  display.setTextSize(1);
  
  // Header
  display.setCursor(0, 0);
  display.println("=== STATISTICS ===");
  
  // Received count
  display.setCursor(0, 12);
  display.print("Received: ");
  display.println(totalReceived);
  
  // Forwarded count
  display.setCursor(0, 22);
  display.print("Forwarded: ");
  display.println(totalForwarded);
  
  // Duplicates count
  display.setCursor(0, 32);
  display.print("Duplicates: ");
  display.println(totalDuplicates);
  
  // Success rate
  display.setCursor(0, 42);
  display.print("Success: ");
  if (totalReceived > 0) {
    float rate = (float)totalForwarded / totalReceived * 100.0;
    display.print((int)rate);
    display.println("%");
  } else {
    display.println("N/A");
  }
  
  // Page indicator
  display.setCursor(0, 55);
  display.println("STATS (2/4)");
}

void showNetworkStatus() {
  display.clearDisplay();
  display.setTextSize(1);
  
  // Header
  display.setCursor(0, 0);
  display.println("=== NETWORK ===");
  
  if (WiFi.status() == WL_CONNECTED) {
    // SSID
    display.setCursor(0, 12);
    display.print("SSID: ");
    display.println(WiFi.SSID());
    
    // IP Address
    display.setCursor(0, 22);
    display.print("IP: ");
    display.println(WiFi.localIP());
    
    // Signal strength
    display.setCursor(0, 32);
    display.print("RSSI: ");
    display.print(WiFi.RSSI());
    display.println(" dBm");
    
    // MAC Address (partial)
    display.setCursor(0, 42);
    display.print("MAC: ");
    String mac = WiFi.macAddress();
    display.println(mac.substring(9)); // Show last 3 octets
  } else {
    display.setCursor(0, 12);
    display.println("WiFi: Disconnected");
    
    display.setCursor(0, 22);
    display.println("Attempting to");
    display.setCursor(0, 32);
    display.println("reconnect...");
  }
  
  // Page indicator
  display.setCursor(0, 55);
  display.println("NETWORK (3/4)");
}

void showConfigMode() {
  display.clearDisplay();
  display.setTextSize(1);
  
  // Header
  display.setCursor(0, 0);
  display.println("=== CONFIG ===");
  
  display.setCursor(0, 12);
  display.println("Config portal:");
  display.setCursor(0, 22);
  display.println("192.168.4.1");
  
  display.setCursor(0, 32);
  display.println("SSID: LoRa-Relay");
  display.setCursor(0, 42);
  display.println("No password");
  
  // Page indicator
  display.setCursor(0, 55);
  display.println("CONFIG (4/4)");
}

void updateRelayDisplay() {
  unsigned long currentTime = millis();
  
  // Auto-rotate pages every few seconds
  if (currentTime - pageChangeTime > PAGE_DURATION) {
    nextDisplayPage();
    pageChangeTime = currentTime;
  }
  
  // Update display content
  if (currentTime - lastDisplayUpdate > 1000) { // Update every second
    switch (currentPage) {
      case PAGE_STATUS:
        showRelayStatus();
        break;
      case PAGE_STATISTICS:
        showStatistics();
        break;
      case PAGE_NETWORK:
        showNetworkStatus();
        break;
      case PAGE_CONFIG:
        showConfigMode();
        break;
    }
    
    display.display();
    lastDisplayUpdate = currentTime;
  }
}

void nextDisplayPage() {
  switch (currentPage) {
    case PAGE_STATUS:
      currentPage = PAGE_STATISTICS;
      break;
    case PAGE_STATISTICS:
      currentPage = PAGE_NETWORK;
      break;
    case PAGE_NETWORK:
      currentPage = PAGE_CONFIG;
      break;
    case PAGE_CONFIG:
      currentPage = PAGE_STATUS;
      break;
  }
}

void clearDisplay() {
  display.clearDisplay();
  display.display();
}

void refreshDisplay() {
  display.display();
}

void displayMessage(const String& message, int duration) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println(message);
  display.display();
  delay(duration);
}