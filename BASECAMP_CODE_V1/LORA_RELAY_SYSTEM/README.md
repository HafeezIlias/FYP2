# LoRa Relay System

A dedicated LoRa packet relay system that receives data from BASECAMP nodes and forwards it to various destinations while avoiding packet duplication.

## Features

- **LoRa Reception**: Continuously listens for LoRa packets on 433MHz
- **Deduplication**: Advanced duplicate packet detection using hash-based filtering
- **Multi-Protocol Forwarding**: Supports HTTP, TCP, UDP, LoRa re-transmission, and Serial output
- **Web Configuration**: Easy setup via built-in web portal
- **OLED Display**: Real-time status and statistics display
- **Automatic Recovery**: Self-healing capabilities for LoRa and WiFi connections
- **Statistics Tracking**: Comprehensive packet counting and success rate monitoring

## Hardware Requirements

- ESP32 development board
- LoRa module (SX1276/SX1278) on 433MHz
- 128x64 OLED display (SSD1306)
- Push buttons for configuration and reset

## Pin Configuration

```cpp
// LoRa Module
#define LORA_SS     5    // SPI Slave Select
#define LORA_RST    14   // Reset pin
#define LORA_DIO0   2    // Interrupt pin

// Buttons
#define CONFIG_BUTTON 0  // Boot button - hold 3s for config
#define RESET_BUTTON  4  // Reset statistics

// I2C Display (default pins)
SDA: GPIO 21
SCL: GPIO 22
```

## Quick Start

1. **Build and Upload**
   ```bash
   pio run --target upload
   ```

2. **First Time Setup**
   - Hold CONFIG button (GPIO 0) for 3 seconds
   - Connect to "LoRa-Relay" WiFi network
   - Open browser to http://192.168.4.1
   - Configure WiFi credentials and Relay ID

3. **Operation**
   - System automatically receives LoRa packets
   - Duplicates are filtered out within 1-minute window
   - Packets forwarded to configured destinations
   - Display shows real-time status and statistics

## Web Interface

### Configuration Portal
- **URL**: http://192.168.4.1 (in config mode)
- **Features**:
  - WiFi network configuration
  - Relay ID setting
  - System status monitoring

### API Endpoints
- `GET /` - Configuration interface
- `GET /relay` - Real-time relay status
- `GET /api/status` - JSON status API

## Packet Format

Expected LoRa packet format (JSON):
```json
{
  "node_id": "BASECAMP_01",
  "timestamp": 1234567890,
  "data": {
    "temperature": 25.5,
    "humidity": 60.0,
    "location": {
      "lat": 12.345678,
      "lon": 98.765432
    }
  },
  "rssi": -85
}
```

## Forwarding Configuration

### Built-in Forward Targets

1. **HTTP Forward**
   - Default: httpbin.org:80/post
   - Sends JSON POST with relay metadata

2. **LoRa Re-transmission**
   - Forwards packets to other LoRa devices
   - Adds relay prefix to prevent loops

3. **Serial Output**
   - Outputs to serial console with "RELAY_DATA:" prefix
   - Always available for debugging

### Adding Custom Targets

Modify `Forwarder.cpp` to add custom forward destinations:

```cpp
// Example: Add MQTT forwarding
bool forwardToMQTT(const String& packet, const ForwardTarget& target) {
  // Implementation here
}
```

## Duplicate Detection

The system uses multiple strategies to prevent packet duplication:

1. **Hash-based Detection**: Creates unique hash from packet + node ID + time window
2. **Time Window**: 1-minute duplicate detection window
3. **History Tracking**: Maintains packet history for analysis
4. **Automatic Cleanup**: Periodically cleans old entries

## Display Pages

The OLED display cycles through 4 pages every 3 seconds:

1. **Status**: LoRa status, last received node, WiFi status, uptime
2. **Statistics**: Received, forwarded, duplicate counts, success rate  
3. **Network**: WiFi SSID, IP address, signal strength, MAC address
4. **Config**: Configuration portal access information

## Statistics and Monitoring

### Available Metrics
- Total packets received
- Total packets forwarded
- Duplicate packets detected
- Success rate percentage
- Last received node ID
- System uptime
- Forward target health

### Reset Statistics
Press RESET_BUTTON (GPIO 4) to clear all statistics.

## Configuration Storage

Settings are stored in ESP32 NVS (Non-Volatile Storage):

- **WiFi**: SSID, password, relay ID
- **LoRa**: Sync word, frequency settings
- **Forwarder**: Target configurations, enable/disable states

## Recovery Mechanisms

### LoRa Recovery
- Automatic retry every 60 seconds if LoRa fails
- Progressive delay strategy for initialization attempts
- Hardware reset and SPI bus recovery

### WiFi Recovery  
- Connection monitoring every 30 seconds
- Automatic reconnection attempts
- Fallback to configuration portal

### Target Health Monitoring
- Tracks forward success/failure rates
- Automatic target disabling after 5 consecutive failures
- Re-enabling after 10-minute cooldown period

## Troubleshooting

### LoRa Not Working
1. Check hardware connections (SS, RST, DIO0 pins)
2. Verify 3.3V power supply
3. Ensure antenna is connected
4. Check for SPI conflicts

### WiFi Issues
1. Hold CONFIG button to enter setup mode
2. Check stored credentials via serial monitor
3. Verify network availability and password

### No Packets Received
1. Verify BASECAMP nodes are transmitting
2. Check sync word compatibility (default: 0xF3)
3. Confirm frequency settings (433MHz)
4. Monitor serial output for debugging

### Display Not Working
1. Check I2C connections (SDA/SCL)
2. Verify display address (0x3C)
3. System continues working without display

## Advanced Configuration

### Custom Sync Words
```cpp
// In setup(), modify sync word
prefs.begin("lora", false);
prefs.putUInt("sync_word", 0xAB); // Custom sync word
prefs.end();
```

### Packet Processing Hooks
Extend `processReceivedPacket()` in `LoRa_Relay.cpp` for custom packet handling.

### Forward Target Extensions
Add new forward types by extending the `ForwardType` enum and implementing corresponding forward functions.

## Performance Notes

- **Memory Usage**: ~50KB RAM for packet history and buffers
- **Packet Processing**: <100ms processing time per packet
- **Duplicate Detection**: O(1) lookup using hash map
- **Storage**: ~16KB NVS for configuration data

## Contributing

1. Follow existing code structure and naming conventions
2. Test with actual BASECAMP hardware
3. Document any new configuration options
4. Ensure backward compatibility with stored settings

## License

This project is part of the BASECAMP system and follows the same licensing terms.