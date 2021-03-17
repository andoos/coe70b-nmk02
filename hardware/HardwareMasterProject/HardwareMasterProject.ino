#include <ESP8266WiFi.h>
#include <PubSubClient.h>
extern "C" {
#include "libb64/cdecode.h"
}

#include <SoftwareSerial.h>
#include <Wire.h>
#include "Protocentral_MAX30205.h"
MAX30205 tempSensor;

#ifndef D5
#if defined(ESP8266)
#define D5 (14)
#define D6 (12)
#endif
#endif

SoftwareSerial BTserial(D5,D6); // RX | TX

const char* ssid = "TheEmpireDidNothingWrong";
const char* password = "kenobi69";

// Find this awsEndpoint in the AWS Console: Manage - Things, choose your thing
// choose Interact, its the HTTPS Rest endpoint 
const char* awsEndpoint = "a3prhhzdllh9mt-ats.iot.us-east-2.amazonaws.com";

// For the two certificate strings below paste in the text of your AWS 
// device certificate and private key, comment out the BEGIN and END 
// lines, add a quote character at the start of each line and a quote 
// and backslash at the end of each line:

// xxxxxxxxxx-certificate.pem.crt
const String certificatePemCrt = \
//-----BEGIN CERTIFICATE-----
"MIIDWTCCAkGgAwIBAgIUINi5Xwxo8zT5mEjSnsWhjlnfUm8wDQYJKoZIhvcNAQEL" \
"BQAwTTFLMEkGA1UECwxCQW1hem9uIFdlYiBTZXJ2aWNlcyBPPUFtYXpvbi5jb20g" \
"SW5jLiBMPVNlYXR0bGUgU1Q9V2FzaGluZ3RvbiBDPVVTMB4XDTIxMDIyMzAwNDU0" \
"NFoXDTQ5MTIzMTIzNTk1OVowHjEcMBoGA1UEAwwTQVdTIElvVCBDZXJ0aWZpY2F0" \
"ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK26ssUm7SF/vl5yEdb7" \
"XMytbzDAhCZQsdmWFX9BelMWGiRL4O8rPBYEnqoedK5K8ROh2PPNLinMvuE7+pzO" \
"MBmTi6+l6Mc3DUXmBa/m0C1yxKWWWnEJQydsIRpHOxjJkFUfSIVrOWc47D1BwpGg" \
"5uYSVFMxGkAKomYZbn7876rMbXLuMtV2v1iAgEX8zT99sXeaulbUplwOzsed8491" \
"TtIDSo/EC+PmuVQplRHL79YMWjvCRhT4s7V33b8waNN66w1fWLuMnnVd6rT39I5A" \
"lHGSywCl3EIwkVXukvbmuDrJOqqj+yDdzHJzsY7SLu3rHYYLrYU0cQfXCwfhAGXs" \
"dEsCAwEAAaNgMF4wHwYDVR0jBBgwFoAU8kA5mRV8p8I3I6rwL2eaZlXWgq8wHQYD" \
"VR0OBBYEFFdz2PQBuI0uWI/IsJsbADTccMWOMAwGA1UdEwEB/wQCMAAwDgYDVR0P" \
"AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4IBAQAYkmRu53BQsKMDgEXKfKem6rb4" \
"jVmOTTR7WQPUXI8g5Wx2r7gAySs96fhdB23Lf2oXJuuaTluvctjQ4gxyQqMlHGXx" \
"Ewr1MXxBxtV8yCibNFwh73tk6OnOw6s4b1mPQBCVfN0phac7uQZLqSRMBBi7hNOz" \
"fM++olsa5J5JE+M2sKeT8j3MAwt4Bjo/zjREnq+jfBszbcs2o+wkCjv1Iz1eN7X+" \
"vWaS1FiFXmP125KB8tVxVfuopbF0i5MQafGuKpi/fJYEmZnjac2VGvVLZurrTVL8" \
"5WZJBlRolyqTJ1SZyTnUyGerayuKJFUbfAkBnjQsB81tJK5jQq6JHjCVYjvA";
//-----END CERTIFICATE-----

// xxxxxxxxxx-private.pem.key
const String privatePemKey = \
//-----BEGIN RSA PRIVATE KEY-----
"MIIEowIBAAKCAQEArbqyxSbtIX++XnIR1vtczK1vMMCEJlCx2ZYVf0F6UxYaJEvg" \
"7ys8FgSeqh50rkrxE6HY880uKcy+4Tv6nM4wGZOLr6XoxzcNReYFr+bQLXLEpZZa" \
"cQlDJ2whGkc7GMmQVR9IhWs5ZzjsPUHCkaDm5hJUUzEaQAqiZhlufvzvqsxtcu4y" \
"1Xa/WICARfzNP32xd5q6VtSmXA7Ox53zj3VO0gNKj8QL4+a5VCmVEcvv1gxaO8JG" \
"FPiztXfdvzBo03rrDV9Yu4yedV3qtPf0jkCUcZLLAKXcQjCRVe6S9ua4Osk6qqP7" \
"IN3McnOxjtIu7esdhguthTRxB9cLB+EAZex0SwIDAQABAoIBAHKPOnNnR9dfNVly" \
"PvFUr80IUNoFGR9q9txUa7iOpOtFF9f3cUxFZkneogHsM2T7Zh1cDIQ4OMi3iudb" \
"ddcQ4Ab9lI8vCGDVnJsLI5TqzzwpAiNvEhSX1wCX/PwnHIEr6VE4X8oa+q9mieGb" \
"C4KcZ6YvUAvLxVOVr6FEA+kZQbGOJcK0XYiPEFLXZZz56sXwyq9G+0MjKC2GFZT/" \
"eeG+dcEK8E57y+kFYb8G+Fso4RhLfs7ZZEXDQn142tYXEO5l44bS+T7RauHSAR+/" \
"BbBnzQJTjD4mNRVHh2d8/kJ1TM617NFyutbuvgds3Ew/VRZ6HkrwOo8bb2s8AOaG" \
"fJlTMYECgYEA35XBJpgcXznTynNlcpQnfBrGpSjnpD+/sn+GaNj9d52+mEDYKTN9" \
"UUVaX6yK2JeJq3iZFIDLuw+8qFqVzn0WQcAdo5cUljHdraqy7/Sp0ZbVVu1WLzKC" \
"bdCB8yUIMMPz9zZK5weNE1uuUNadyCqgnx7OnrOkJh36Vnz+6tyfXi8CgYEAxuqT" \
"H8hR+3PV++8HJfj809V5IGXzMllzxZZZnCUfFRkoQS4mllznNcxpd1l+h72hWWY6" \
"bNI2NfcstJf2l6a5211s7T3OgjnaEnlBepqld6JXw2VgPkpectuNktaWT7XAJ3Nn" \
"IL38VvSV90VDRh/M+ifW8pQEH0Z9MLBfRQWnQKUCgYEAhhze+hZ91kTqnGJxtLPX" \
"p2KsSv9pSyWOCDTkW9nk2C4/2DX1M2mWPvyZxA/MTTVAuCEjuZ+0FOXQpS+I8o4n" \
"npLtdGY4TAtnTDe7E6Ivhu+x0m2Up8TlZZePi1hoPFAd8+iWL1RhM/5nZkgF5r5j" \
"EG87QwjAarjKo7xgcGKcGbMCgYAoIMhfYAUR6hNgCJ9zjKBMh8MwwwBlxt/xG1ym" \
"gGKd2f5h79J/AOzv0HXySs6YyauUImhk7Z9cEaomIIXxoAPceiNwVMilQtB4a5fH" \
"CQ2abdiwpXHd/xjAqQQNfFbEa9EA5GoIk+slC6B5SrLAocezK3hUZYHTYV/+A4ak" \
"oPhVtQKBgD0CkAV+tHKoTGvsrjVOA56T5BUa6k1wNrfoG69mbfOGw+SnedtnUzPO" \
"c3UNZqL7s/Sxc4AYsKcHdOEPFLZwaIWiZiE9TGXpdHpguGKJvV/mBkLjpsG8QiBL" \
"+Evn3DwoH++j0oWiNKzjezQZostJ4DszHTQ7OWCn4QCogf+svqB6";
//-----END RSA PRIVATE KEY-----

// This is the AWS IoT CA Certificate from: 
// https://docs.aws.amazon.com/iot/latest/developerguide/managing-device-certs.html#server-authentication
// This one in here is the 'RSA 2048 bit key: Amazon Root CA 1' which is valid 
// until January 16, 2038 so unless it gets revoked you can leave this as is:
const String caPemCrt = \
//-----BEGIN CERTIFICATE-----
"MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF" \
"ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6" \
"b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL" \
"MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv" \
"b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj" \
"ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM" \
"9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw" \
"IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6" \
"VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L" \
"93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm" \
"jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC" \
"AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA" \
"A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI" \
"U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs" \
"N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv" \
"o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU" \
"5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy" \
"rqXRfboQnoZsG4q5WTP468SQvvG5";
//-----END CERTIFICATE-----

WiFiClientSecure wiFiClient;
void msgReceived(char* topic, byte* payload, unsigned int len);
PubSubClient pubSubClient(awsEndpoint, 8883, msgReceived, wiFiClient); 

unsigned long lastPublish;

char c=' ';
char d = ' ';
String msg;
String temperature = "0.0";
boolean NL = true;
int n=0;
String currentTime = "0";

void setup() {
  Serial.begin(38400); Serial.println();
  Serial.println("NMK02 Master Hardware Script");

  Serial.print("Connecting to "); Serial.print(ssid);
  WiFi.begin(ssid, password);
  WiFi.waitForConnectResult();
  Serial.print(", WiFi connected, IP address: "); Serial.println(WiFi.localIP()); Serial.println(WiFi.macAddress());

  // get current time, otherwise certificates are flagged as expired
  setCurrentTime();

  uint8_t binaryCert[certificatePemCrt.length() * 3 / 4];
  int len = b64decode(certificatePemCrt, binaryCert);
  wiFiClient.setCertificate(binaryCert, len);
  
  uint8_t binaryPrivate[privatePemKey.length() * 3 / 4];
  len = b64decode(privatePemKey, binaryPrivate);
  wiFiClient.setPrivateKey(binaryPrivate, len);

  uint8_t binaryCA[caPemCrt.length() * 3 / 4];
  len = b64decode(caPemCrt, binaryCA);
  wiFiClient.setCACert(binaryCA, len);

//temperature sensor setup
  Wire.begin();
  tempSensor.scanAvailableSensors();
  tempSensor.begin();
  delay(1000);
}

String deviceMACid = WiFi.macAddress();

void loop() {

  pubSubCheckConnect();

  temperature = String(tempSensor.getTemperature()); // receive a byte as character
  currentTime = String(time(nullptr));
  

  if (millis() - lastPublish > 10000) {
    String msg = String("{\"type\": \"TemperatureEvent\", \"temperature\" : \""+temperature+"\", \"deviceID\" : \""+deviceMACid+"\", \"time\" :  \""+currentTime+"\"}");
    pubSubClient.publish("outTopic", msg.c_str());
    Serial.print("Published: "); Serial.println(msg);
    lastPublish = millis();
  }
}

void msgReceived(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received on "); Serial.print(topic); Serial.print(": ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void pubSubCheckConnect() {
  if ( ! pubSubClient.connected()) {
    Serial.print("PubSubClient connecting to: "); Serial.print(awsEndpoint);
    while ( ! pubSubClient.connected()) {
      Serial.print(".");
      pubSubClient.connect("ESPthing");
    }
    Serial.println(" connected");
    pubSubClient.subscribe("inTopic");
  }
  pubSubClient.loop();
}

int b64decode(String b64Text, uint8_t* output) {
  base64_decodestate s;
  base64_init_decodestate(&s);
  int cnt = base64_decode_block(b64Text.c_str(), b64Text.length(), (char*)output, &s);
  return cnt;
}

void setCurrentTime() {
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: "); Serial.print(asctime(&timeinfo));
}
