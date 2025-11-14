#include "Display_Module.h"
#include "GPS_Module.h"
#include "Telemetry.h"

// External references
extern Adafruit_SSD1306 display;
extern String nodeId;
extern bool sos_status;
extern bool gpsEnabled;
extern bool configModeActive;

// === GPS ICON BITMAP ===
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

// === DISPLAY VARIABLES ===
String loraStatus = "Waiting...";
int packetCount = 0;

void initializeDisplay() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED failed");
    while (true);
  }
}

void showSplash() {
  display.clearDisplay();

  // Draw large GPS icon at the top center
  display.drawBitmap((SCREEN_WIDTH - GPS_ICON_WIDTH) / 2, 0, gps_icon_bitmap,
                     GPS_ICON_WIDTH, GPS_ICON_HEIGHT, WHITE);

  // Big "TRAILBEACON" title
  display.setTextSize(1);
  display.setTextColor(WHITE);
  int16_t x1, y1;
  uint16_t w, h;
  display.getTextBounds("TRAILBEACON", 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, 20);
  display.println("TRAILBEACON");

  // Smaller "by Hafeez" subtitle
  display.setTextSize(1);
  display.getTextBounds("by Hafeez", 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, 40);
  display.println("by Hafeez");

  display.display();
  delay(2000);
}

void updateDisplay() {
  // Don't update display if in config mode
  if (configModeActive) {
    return;
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  
  // Fixed line positions to prevent overlap (8 pixels height + 2 pixel spacing)
  const int line0 = 0;   // Node ID
  const int line1 = 10;  // First info line
  const int line2 = 20;  // Second info line
  const int line3 = 30;  // LoRa status line
  const int line4 = 40;  // Additional info
  const int line5 = 50;  // SOS/Uptime (bottom line)
  
  // Node ID (truncated to avoid GPS icon overlap)
  display.setCursor(0, line0);
  String truncatedNodeId = nodeId;
  if (truncatedNodeId.length() > 10) {
    truncatedNodeId = truncatedNodeId.substring(0, 10);
  }
  display.println(truncatedNodeId);
  
  if (gpsEnabled) {
    if (isGPSValid()) {
      // GPS coordinates - shortened format
      display.setCursor(0, line1);
      display.print("Lat:");
      display.println(getCurrentLatitude(), 4);
      
      display.setCursor(0, line2);
      display.print("Lng:");
      display.println(getCurrentLongitude(), 4);
      
      // LoRa status - shortened
      display.setCursor(0, line3);
      display.print("LoRa:");
      display.println(loraStatus);
      
      // Packet count
      display.setCursor(0, line4);
      display.print("Pkts:");
      display.println(packetCount);
    } else {
      // GPS waiting
      display.setCursor(0, line1);
      display.println("GPS:Waiting...");
      
      // WiFi RSSI - shortened
      display.setCursor(0, line2);
      display.print("WiFi:");
      display.print(wifiRSSI);
      display.println("dBm");
      
      // LoRa status
      display.setCursor(0, line3);
      display.print("LoRa:");
      display.println(loraStatus);
      
      // Packet count
      display.setCursor(0, line4);
      display.print("Pkts:");
      display.println(packetCount);
    }
  } else {
    // No GPS mode - more space for other info
    display.setCursor(0, line1);
    display.print("WiFi:");
    display.print(wifiRSSI);
    display.println("dBm");
    
    display.setCursor(0, line2);
    display.print("Batt:");
    display.print(batteryVoltage, 2);
    display.println("V");
    
    display.setCursor(0, line3);
    display.print("LoRa:");
    display.println(loraStatus);
    
    display.setCursor(0, line4);
    display.print("Pkts:");
    display.println(packetCount);
  }
  
  // SOS indicator or uptime (bottom line - no overlap)
  display.setCursor(0, line5);
  if (sos_status) {
    display.setTextColor(BLACK, WHITE); // Inverted for visibility
    display.print("SOS ACTIVE");
    display.setTextColor(WHITE); // Reset to normal
  } else {
    display.print("Up:");
    String uptime = getUptimeString();
    if (uptime.length() > 12) {
      uptime = uptime.substring(0, 12); // Truncate if too long
    }
    display.print(uptime);
  }
  
  // GPS icon in top right (only if space available)
  display.drawBitmap(SCREEN_WIDTH - GPS_ICON_WIDTH, 0, gps_icon_bitmap,
                     GPS_ICON_WIDTH, GPS_ICON_HEIGHT, WHITE);
                     
  display.display();
} 