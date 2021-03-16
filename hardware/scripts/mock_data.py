import random
import time
import pymysql
import datetime

from random import randrange

wrist_id = ["84:CC:A8:A4:41:79", # small breadboard (actual prototype)
            "84:CC:A8:AA:AE:7C", # big breadboard (actual prototype)
            "84:CC:A8:DA:32:EC", 
            "84:CC:A8:51:C8:AD", 
            "84:CC:A8:64:65:DC",
            "84:CC:A8:EA:1B:78"]

# generate a bluetooth event 
BTdeviceA = wrist_id[randrange(6)]
BTdeviceB = wrist_id[randrange(6)]
distance = str(round(random.uniform(0, 2)))
# time = str(random.randrange(1615813200, 1615856400)) # March 15 2021 9:00 - 21:00
time = str(random.randrange(1615899600, 1615942800)) # March 16 2021 9:00 - 21:00

# generate a temperature event for each user 
temperature_A = str(round(random.uniform(36.0, 41.0), 1))
temperature_B = str(round(random.uniform(36.0, 41.0), 1))

connection = pymysql.connect(host='nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com', user='admin', password='Omar1234', db='hardware')

with connection: 
<<<<<<< HEAD
        with connection.cursor() as cursor:
                pass
                #sql = "INSERT INTO hardware.TemperatureEvent VALUES ('', '" + temp + "', '" + deviceID + "', '" + time + "');"
                #cursor.execute(sql)
                #connection.commit()

                #sql = "INSERT INTO hardware.BluetoothEvent VALUES ('', '" + distance + "', '" + BTdeviceA + "', '" + BTdeviceB + "', '" + BTtime + "');"
                #cursor.execute(sql)
                #connection.commit()

        
        with connection.cursor() as cursor: 
                sql = "SELECT * FROM hardware.TemperatureEvent;"
=======
        with connection.cursor() as cursor:        
                sql = "INSERT INTO hardware.BluetoothEvent (Distance, Wrist_ID_A, Wrist_ID_B, Timestamp) VALUES ('" + distance + "', '" + BTdeviceA + "', '" + BTdeviceB + "', '" + time + "');"
                cursor.execute(sql)
                connection.commit()

                sql = "INSERT INTO hardware.TemperatureEvent (Temperature, Wrist_ID, Timestamp) VALUES ('" + temperature_A + "', '" + BTdeviceA + "', '" + time + "');"
>>>>>>> afbe8f48da98fe5bb4bfbeb4e152db22e2f4d798
                cursor.execute(sql)
                connection.commit()

<<<<<<< HEAD
        with connection.cursor() as cursor: 
                sql = "SELECT * FROM hardware.BluetoothEvent;"
=======
                sql = "INSERT INTO hardware.TemperatureEvent (Temperature, Wrist_ID, Timestamp) VALUES ('" + temperature_B + "', '" + BTdeviceB + "', '" + time + "');"
>>>>>>> afbe8f48da98fe5bb4bfbeb4e152db22e2f4d798
                cursor.execute(sql)
                connection.commit()

        # with connection.cursor() as cursor: 
        #         sql = "SELECT * FROM hardware.TemperatureEvent_NEW;"
        #         cursor.execute(sql)
        #         result = cursor.fetchall()
        #         print('Result from query -> ' + sql)
        #         print(result)

        # with connection.cursor() as cursor: 
        #         sql = "SELECT * FROM hardware.BluetoothEvent_NEW;"
        #         cursor.execute(sql)
        #         result = cursor.fetchall()
        #         print('Result from query -> ' + sql)
        #         print(result)


