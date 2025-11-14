#include "Common.h"

// Global variable definitions
String relayId = "RELAY_01";
String ssid = "";
String password = "";
bool configMode = false;
Preferences prefs;

// Display
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Relay system globals
std::vector<PacketInfo> packetHistory;
std::vector<ForwardTarget> forwardTargets;
std::map<String, unsigned long> packetHashes;
unsigned long lastCleanup = 0;
int totalReceived = 0;
int totalForwarded = 0;
int totalDuplicates = 0;
String lastReceivedFrom = "None";

// Network
AsyncWebServer server(80);