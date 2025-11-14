#ifndef LORA_MODULE_H
#define LORA_MODULE_H

#include <SPI.h>
#include <LoRa.h>
#include <Arduino.h>

// === LoRa SETTINGS ===
#define LORA_SS    5
#define LORA_RST   14
#define LORA_DIO0  2
#define LORA_BAND  433E6

// === LORA FUNCTIONS ===
bool initializeLoRa(int syncWord);
void handleLoRaPackets();
void setLoRaStatus(String status);
int getPacketCount();
bool isLoRaInitialized();
bool attemptLoRaRecovery(int syncWord);

#endif 