import random
import time
import pymysql

from random import randrange

uuid = ["a0a19964-9829-40d5-9b76-ff64ade4f1e2", 
        "50c87ff9-3525-4db4-93b4-0f8f84fe9ad5", 
        "0666de60-c3ec-4eaa-aebf-3e1efc527961", 
        "67681821-0e43-43d4-a755-d09c237546c3", 
        "80b2a467-2493-42df-8976-f01ff512a6a8", 
        "0da8e758-b7ca-4657-b9f0-dda1d25e15fd", 
        "fc4a6de2-95cf-4fa3-98e9-c1de01e1d017", 
        "580d5b60-5a66-457b-ae0b-62c48b4932fa", 
        "2ebbcbd8-06c0-4b1e-8357-ea5bb2f4b147", 
        "fb433517-d48e-4e91-9131-fd7b5286a81c"]

temperature = round(random.uniform(36.0, 41.0), 1)

# generate random epoch between feb 23 2021 8:00 - feb 23 2021 20:00
rnd_time = random.randrange(1614085200, 1614128400)

temp_event = str(temperature) + ',' + uuid[randrange(10)] + ',' + str(rnd_time)

print('Temperature Event')
print(temp_event)

#print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(rnd_time)))

rssi = hex(random.randrange(0, 65535))[2:]

rnd_time = random.randrange(1614085200, 1614128400)

bluetooth_event = rssi + ',' + uuid[randrange(10)] + ',' + uuid[randrange(10)] + ',' + str(rnd_time)

print('Bluetooth Event')
print(bluetooth_event)

connection = pymysql.connect(host='nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com', user='admin', password='Omar1234', db='hardware')

with connection: 
        # with connection.cursor() as cursor:
        #         sql = "INSERT INTO hardware.BluetoothEvent VALUES ('4', " + "'" + bluetooth_event + "');"
        #         cursor.execute(sql)
        #         connection.commit()
        
        with connection.cursor() as cursor: 
                sql = "SELECT * FROM hardware.TemperatureEvent;"
                cursor.execute(sql)
                result = cursor.fetchall()
                print('Result from query -> ' + sql)
                print(result)

        with connection.cursor() as cursor: 
                sql = "SELECT * FROM hardware.BluetoothEvent;"
                cursor.execute(sql)
                result = cursor.fetchall()
                print('Result from query -> ' + sql)
                print(result)

