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
 
const long baudRate = 38400; //default baudrate of AT commands
char c=' ';
char d = ' ';
String msg;
float temp = 0.0;
boolean NL = true;
int n=0;

void setup() {
  Serial.begin(38400);
  Serial.print("\n");
  Serial.print("\n");
  Serial.print("\n");
  Serial.print("Sketch:   ");   Serial.println(__FILE__);
  Serial.print("Uploaded: ");   Serial.println(__DATE__);
  Serial.println(" ");
  
  Wire.begin();
  tempSensor.scanAvailableSensors();
  tempSensor.begin();
  delay(1000);

  BTserial.begin(baudRate);  
  Serial.print("BTserial started at "); Serial.println(baudRate);
  Serial.println(" ");
  delay(1000);

}

void loop() {
 /* BTserial.write("AT+ROLE=%d", n);
  n = not n;
  delay(100);
  BTserial.read();*/
  while (BTserial.available())// if theres data on the software serial read it and print it to serial
    {
        msg = BTserial.readString();
        Serial.print(msg);
    }
    
    
    
  if (Serial.available())//take input from serial window and send it to software serial bus to hc05
    {
        c = Serial.read();

        if(c =='!'){
          temp = tempSensor.getTemperature(); // receive a byte as character
          Serial.print(temp ,2);         // print the character
          Serial.println("'c" );
          delay(500);   
        }
        
        else{
          BTserial.write(c);
        }

        // Echo the user input to the serial window.
        if (NL) { Serial.print(">");  NL = false; }
        Serial.write(c);
        if (c==10) { NL = true; }
    }
   












  

}
