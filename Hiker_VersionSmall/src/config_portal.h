#ifndef CONFIG_PORTAL_H
#define CONFIG_PORTAL_H

#include <WiFi.h>
#include <DNSServer.h>
#include <ESPAsyncWebServer.h>
#include <Preferences.h>
#include "config.h"

// Config portal objects
AsyncWebServer server(80);
DNSServer dns;

void startConfigPortal() {
  WiFi.softAP(AP_SSID);
  dns.start(53, "*", WiFi.softAPIP());
  
  // Load current configuration
  Preferences prefs;
  prefs.begin("config", false);
  uint32_t currentSync = prefs.getUInt("sync_word", 0xF3);
  String currentMode = prefs.getString("mode", "Hiker");
  uint8_t currentMaxHops = prefs.getUChar("max_hops", 5);
  String currentDeviceId = prefs.getString("device_id", "H_001");
  String currentFirebaseUrl = prefs.getString("firebase_url", "");
  prefs.end();
  
  // Convert sync word to hex string
  char syncBuffer[10];
  sprintf(syncBuffer, "%02X", currentSync);
  String sync = String(syncBuffer);
  
  // Serve configuration web page
  server.on("/", HTTP_GET, [sync, currentMode, currentMaxHops, currentDeviceId, currentFirebaseUrl](AsyncWebServerRequest *request) {
    String html = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TrailBeacon Configuration</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      padding: 40px;
      max-width: 500px;
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .header {
      text-align: center;
      margin-bottom: 35px;
    }
    
    .title {
      font-size: 32px;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      color: #718096;
      font-size: 16px;
      font-weight: 500;
    }
    
    .form-group {
      margin-bottom: 25px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #2d3748;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .form-input, .form-select {
      width: 100%;
      padding: 16px 20px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 16px;
      background: #ffffff;
      color: #2d3748;
      transition: all 0.3s ease;
      outline: none;
    }
    
    .form-input:focus, .form-select:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-1px);
    }
    
    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 16px center;
      background-repeat: no-repeat;
      background-size: 16px;
      padding-right: 50px;
    }
    
    .current-value {
      font-size: 12px;
      color: #718096;
      margin-top: 4px;
      font-weight: 500;
    }
    
    .firebase-group {
      display: none;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .firebase-group.show {
      display: block;
      opacity: 1;
    }
    
    .submit-btn {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 10px;
    }
    
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }
    
    .submit-btn:active {
      transform: translateY(0);
    }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    @media (max-width: 600px) {
      .container {
        padding: 30px 25px;
        margin: 10px;
      }
      
      .title {
        font-size: 28px;
      }
      
      .grid-2 {
        grid-template-columns: 1fr;
        gap: 15px;
      }
    }
    
    .device-hint {
      font-size: 12px;
      color: #a0aec0;
      margin-top: 4px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">TrailBeacon</h1>
      <p class="subtitle">Device Configuration Portal</p>
    </div>
    
    <form method="POST" action="/save" id="configForm">
      <div class="grid-2">
        <div class="form-group">
          <label class="form-label">Sync Word</label>
          <input type="text" name="sync" class="form-input" placeholder="F3" value=")rawliteral";
    html += sync;
    html += R"rawliteral(" required pattern="[0-9A-Fa-f]{1,2}">
          <div class="current-value">Current: )rawliteral";
    html += sync;
    html += R"rawliteral(</div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Max Hops</label>
          <input type="number" name="max_hops" class="form-input" min="1" max="10" value=")rawliteral";
    html += String(currentMaxHops);
    html += R"rawliteral(" required>
          <div class="current-value">Current: )rawliteral";
    html += String(currentMaxHops);
    html += R"rawliteral(</div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Device Mode</label>
        <select name="mode" class="form-select" id="modeSelect" required>
          <option value="Hiker" )rawliteral";
    if (currentMode == "Hiker") html += "selected";
    html += R"rawliteral(>Hiker</option>
          <option value="HikSen" )rawliteral";
    if (currentMode == "HikSen") html += "selected";
    html += R"rawliteral(>HikSen (Hiker + Sensor)</option>
          <option value="Tower" )rawliteral";
    if (currentMode == "Tower") html += "selected";
    html += R"rawliteral(>Tower</option>
          <option value="BaseCamp" )rawliteral";
    if (currentMode == "BaseCamp") html += "selected";
    html += R"rawliteral(>BaseCamp</option>
        </select>
        <div class="current-value">Current: )rawliteral";
    html += currentMode;
    html += R"rawliteral(</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Device ID</label>
        <input type="text" name="device_id" class="form-input" id="deviceId" value=")rawliteral";
    html += currentDeviceId;
    html += R"rawliteral(" required pattern="[HT]_[0-9]{3}|BC_[0-9]{3}">
        <div class="device-hint">Format: H_001 (Hiker/HikSen), T_001 (Tower), BC_001 (BaseCamp)</div>
        <div class="current-value">Current: )rawliteral";
    html += currentDeviceId;
    html += R"rawliteral(</div>
      </div>
      
      <div class="form-group firebase-group" id="firebaseGroup">
        <label class="form-label">Firebase URL</label>
        <input type="url" name="firebase_url" class="form-input" placeholder="https://your-project.firebaseio.com" value=")rawliteral";
    html += currentFirebaseUrl;
    html += R"rawliteral(">
        <div class="current-value">Current: )rawliteral";
    html += (currentFirebaseUrl.length() > 0 ? currentFirebaseUrl : "Not set");
    html += R"rawliteral(</div>
      </div>
      
      <button type="submit" class="submit-btn">Save & Restart Device</button>
    </form>
  </div>
  
  <script>
    const modeSelect = document.getElementById('modeSelect');
    const firebaseGroup = document.getElementById('firebaseGroup');
    const deviceIdInput = document.getElementById('deviceId');
    
    function updateUI() {
      const mode = modeSelect.value;
      
      // Show/hide Firebase URL field
      if (mode === 'BaseCamp') {
        firebaseGroup.classList.add('show');
      } else {
        firebaseGroup.classList.remove('show');
      }
      
      // Update device ID prefix based on mode
      const currentId = deviceIdInput.value;
      const idNumber = currentId.split('_')[1] || '001';
      
      let newPrefix;
      switch(mode) {
        case 'Hiker':
        case 'HikSen':
          newPrefix = 'H_';
          break;
        case 'Tower':
          newPrefix = 'T_';
          break;
        case 'BaseCamp':
          newPrefix = 'BC_';
          break;
        default:
          newPrefix = 'H_';
      }
      
      deviceIdInput.value = newPrefix + idNumber;
    }
    
    // Initialize UI
    updateUI();
    
    // Update UI when mode changes
    modeSelect.addEventListener('change', updateUI);
    
    // Form submission
    document.getElementById('configForm').addEventListener('submit', function(e) {
      const submitBtn = document.querySelector('.submit-btn');
      submitBtn.innerHTML = 'Saving...';
      submitBtn.disabled = true;
    });
  </script>
</body>
</html>
)rawliteral";

    request->send(200, "text/html", html);
  });
  
  // Handle configuration saving
  server.on("/save", HTTP_POST, [](AsyncWebServerRequest *request) {
    String sync = request->getParam("sync", true)->value();
    String mode = request->getParam("mode", true)->value();
    String maxHopsStr = request->getParam("max_hops", true)->value();
    String deviceId = request->getParam("device_id", true)->value();
    String firebaseUrl = "";
    
    // Get Firebase URL if BaseCamp mode
    if (mode == "BaseCamp" && request->hasParam("firebase_url", true)) {
      firebaseUrl = request->getParam("firebase_url", true)->value();
    }
    
    // Save all configuration
    Preferences prefs;
    prefs.begin("config", false);
    prefs.putUInt("sync_word", strtoul(sync.c_str(), NULL, 16));
    prefs.putString("mode", mode);
    prefs.putUChar("max_hops", maxHopsStr.toInt());
    prefs.putString("device_id", deviceId);
    prefs.putString("firebase_url", firebaseUrl);
    prefs.end();
    
    String responseHtml = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Configuration Saved</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      color: white;
    }
    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 20px;
      backdrop-filter: blur(20px);
    }
    .checkmark {
      font-size: 64px;
      margin-bottom: 20px;
      animation: bounce 0.6s ease-in-out;
    }
    @keyframes bounce {
      0%, 20%, 60%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      80% { transform: translateY(-5px); }
    }
    h2 { margin: 20px 0; font-size: 28px; }
    p { font-size: 16px; opacity: 0.9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="checkmark">✓</div>
    <h2>Configuration Saved!</h2>
    <p>Device will restart in a few seconds...</p>
  </div>
  <script>
    setTimeout(() => {
      document.body.innerHTML = '<div style="text-align:center; padding:50px; color:white;"><h2>Restarting Device...</h2></div>';
    }, 2000);
  </script>
</body>
</html>
)rawliteral";
    
    request->send(200, "text/html", responseHtml);
    delay(3000);
    ESP.restart();
  });
  
  server.begin();
}

#endif