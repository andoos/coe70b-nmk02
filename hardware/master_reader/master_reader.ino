// Wire Master Reader
// by devyte
// based on the example of the same name by Nicholas Zambetti <http://www.zambetti.com>

// Demonstrates use of the Wire library
// Reads data from an I2C/TWI slave device
// Refer to the "Wire Slave Sender" example for use with this

// This example code is in the public domain.

#include <Wire.h>
#include "Protocentral_MAX30205.h"
MAX30205 tempSensor;


void setup() {
  Serial.begin(38400);
  Wire.begin();
  tempSensor.scanAvailableSensors();
  tempSensor.begin();
}

void loop() {
      float c = tempSensor.getTemperature(); // receive a byte as character
      Serial.print(c ,2);         // print the character
      Serial.println("'c" );
      delay(500);
}
