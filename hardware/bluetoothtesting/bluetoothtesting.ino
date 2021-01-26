//  Sketc: basicSerialWithNL_001
// 
//  Uses hardware serial to talk to the host computer and software serial 
//  for communication with the Bluetooth module
//  Intended for Bluetooth devices that require line end characters "\r\n"
//
//  Pins
//  Arduino 5V out TO BT VCC
//  Arduino GND to BT GND
//  Arduino D9 to BT RX through a voltage divider
//  Arduino D8 BT TX (no need voltage divider)
//
//  When a command is entered in the serial monitor on the computer 
//  the Arduino will relay it to the bluetooth module and display the result.
//
 
 
#include <SoftwareSerial.h>

#ifndef D5
#if defined(ESP8266)
#define D5 (14)
#define D6 (12)
#define D7 (13)
#define D8 (15)
#define TX (1)
#endif
#endif

SoftwareSerial BTserial(D5,D6); // RX | TX
 
const long baudRate = 38400; //default baudrate of AT commands
char c=' ';
char d = ' ';
boolean NL = true;
 
void setup() 
{
    Serial.begin(38400);
    Serial.print("Sketch:   ");   Serial.println(__FILE__);
    Serial.print("Uploaded: ");   Serial.println(__DATE__);
    Serial.println(" ");
 
    BTserial.begin(baudRate);  
    Serial.print("BTserial started at "); Serial.println(baudRate);
    Serial.println(" ");
    delay(1000);
}
 
void loop()
{
 
    // Read from the Bluetooth module and send to the Arduino Serial Monitor
    if (BTserial.available())// if theres data on the software serial read it and print it to serial
    {
        
        d = BTserial.read();
        Serial.write(d);
    }
 
 
    // Read from the Serial Monitor and send to the Bluetooth module
    if (Serial.available())//take input from serial window and send it to software serial bus to hc05
    {
        c = Serial.read();
        BTserial.write(c);

        // Echo the user input to the serial window.
        if (NL) { Serial.print(">");  NL = false; }
        Serial.write(c);
        if (c==10) { NL = true; }
    }
 
}
