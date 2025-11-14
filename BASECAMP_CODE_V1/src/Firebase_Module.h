#ifndef FIREBASE_MODULE_H
#define FIREBASE_MODULE_H

#include <Firebase_ESP_Client.h>
#include "Common.h"

// === GLOBAL VARIABLES ===
extern bool signupOK;
extern unsigned long lastTokenCheck;
extern unsigned long tokenCheckInterval;
extern bool tokenNeedsRefresh;

// === FIREBASE FUNCTIONS ===
void initializeFirebase();
bool refreshFirebaseToken();
void forwardPacketToFirebase(String packet);

// === TOKEN MANAGEMENT ===
void setupTokenCallback();

#endif 