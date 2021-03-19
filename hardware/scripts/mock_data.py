import random
import time
import pymysql
import datetime

from random import randrange

wrist_id = ["84:CC:A8:A4:41:79", 
            "84:CC:A8:DA:32:EC", 
            "84:CC:A8:51:C8:AD", 
            "84:CC:A8:64:65:DC", 
            "84:CC:A8:EA:1B:78", 
            "00:20:09:00:05:02", # small breadboard (actual prototype) 
            "00:20:08:00:1A:C1"  # big breadboard (actual prototype) 
]

# generate a bluetooth event 
BTdeviceA = wrist_id[randrange(6)]
BTdeviceB = wrist_id[randrange(6)]

# make sure device IDs are not the same
while BTdeviceA == BTdeviceB:
        BTdeviceB = wrist_id[randrange(6)]        

distance = str(round(random.uniform(0, 2), 1))
# time = str(random.randrange(1615813200, 1615856400)) # March 15 2021 9:00 
# time = str(random.randrange(1615899600, 1615942800)) # March 16 2021 9:00 
# time = str(random.randrange(1616072400, 1616115600)) # March 18 2021 9:00 - 21:00
time = str(random.randrange(1616158800, 1616202000)) # March 19 2021 9:00 - 21:00

# generate a temperature event for each user 
temperature_A = str(round(random.uniform(36.0, 41.0), 1))
temperature_B = str(round(random.uniform(36.0, 41.0), 1))

connection = pymysql.connect(host='nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com', user='admin', password='Omar1234', db='hardware')

with connection: 
        with connection.cursor() as cursor:        
                sql = "INSERT INTO hardware.BluetoothEvent (Distance, Wrist_ID_A, Wrist_ID_B, Timestamp) VALUES ('" + distance + "', '" + BTdeviceA + "', '" + BTdeviceB + "', '" + time + "');"
                cursor.execute(sql)
                connection.commit()

                sql = "INSERT INTO hardware.TemperatureEvent (Temperature, Wrist_ID, Timestamp) VALUES ('" + temperature_A + "', '" + BTdeviceA + "', '" + time + "');"
                cursor.execute(sql)
                connection.commit()

                sql = "INSERT INTO hardware.TemperatureEvent (Temperature, Wrist_ID, Timestamp) VALUES ('" + temperature_B + "', '" + BTdeviceB + "', '" + time + "');"
                cursor.execute(sql)
                connection.commit()