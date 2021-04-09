import time
import datetime
import random
import pymysql

from random import randrange

wrist_id = ["84:CC:A8:A4:41:79", 
            "84:CC:A8:DA:32:EC", 
            "84:CC:A8:51:C8:AD", 
            "84:CC:A8:64:65:DC", 
            "84:CC:A8:EA:1B:78",
            "84-CC-A8-8B-3E-17", 
            "00:20:09:00:05:02", # small breadboard (actual prototype) 
            "00:20:08:00:1A:C1"] # big breadboard (actual prototype) 

# generate a bluetooth event 
BTdeviceA = wrist_id[randrange(len(wrist_id))]
BTdeviceB = wrist_id[randrange(len(wrist_id))]

# make sure device IDs are not the same
while BTdeviceA == BTdeviceB:
        BTdeviceB = wrist_id[randrange(len(wrist_id))]

distance = str(round(random.uniform(0, 2), 1))

startTime = round(time.mktime(datetime.datetime(2021, 4, 9, 9, 0).timetuple()))
endTime = round(time.mktime(datetime.datetime(2021, 4, 9, 21, 0).timetuple()))
timestamp = str(random.randrange(startTime, endTime))

# generate a temperature event for each user 
temperature_A = str(round(random.uniform(36.0, 41.0), 1))
temperature_B = str(round(random.uniform(36.0, 41.0), 1))

connection = pymysql.connect(host='nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com', user='admin', password='Omar1234', db='hardware')

with connection: 
        with connection.cursor() as cursor:        
                sql = "INSERT INTO hardware.BluetoothEvent (Distance, Wrist_ID_A, Wrist_ID_B, Timestamp) VALUES ('" + distance + "', '" + BTdeviceA + "', '" + BTdeviceB + "', '" + timestamp + "');"
                cursor.execute(sql)
                connection.commit()

                sql = "INSERT INTO hardware.TemperatureEvent (Temperature, Wrist_ID, Timestamp) VALUES ('" + temperature_A + "', '" + BTdeviceA + "', '" + timestamp + "');"
                cursor.execute(sql)
                connection.commit()

                sql = "INSERT INTO hardware.TemperatureEvent (Temperature, Wrist_ID, Timestamp) VALUES ('" + temperature_B + "', '" + BTdeviceB + "', '" + timestamp + "');"
                cursor.execute(sql)
                connection.commit()