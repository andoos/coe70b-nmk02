import pymysql
import json


# distance conversion
# RSSI = -20log(r)+R0
# r = 10^[(RSSI-R0)/-20]
# r is distance in cm RSSI is value given by bluetooth reading and R0 is a DC gain adjustment
# 65483 seems like a good value for R0 *shrug*
# FFC5 corrosponds to 2m distance

def handler(event, context):
    connection = pymysql.connect(host='nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com', user='admin',
                                 password='Omar1234', db='hardware', connect_timeout=31536)

    if event['type'] == 'TemperatureEvent':
        with connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO hardware.TemperatureEvent VALUES ('', '" + event["temperature"] + "', '" + event["deviceID"] + "', '" + event["time"] + "');"
                cursor.execute(sql)
                connection.commit()

    if event['type'] == 'BluetoothEvent':
        # str(10**((65483-(int(event['distance'], 16)))/20))
        with connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO hardware.BluetoothEvent VALUES ('', '" + str(10 ** ((65483 - (int(event['distance'], 16))) / 20)) + "', '" + event['deviceIDA'] + "', '" + event['deviceIDB'] + "', '" + event['time'] + "');"
                cursor.execute(sql)
                connection.commit()
