import pymysql
import json

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
        with connection:
            with connection.cursor() as cursor:
                sql = "INSERT INTO hardware.BluetoothEvent VALUES ('', '" + event['distance'] + "', '" + event['deviceIDA'] + "', '" + event['deviceIDB'] + "', '" + event['time'] + "');"
                cursor.execute(sql)
                connection.commit()
        