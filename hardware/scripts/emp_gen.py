import time
import datetime
import random
import pymysql

emp_names = ["Andrew Alli", 
             "Omar Ahmad", 
             "Jacob Pasqualoni", 
             "Raymond Thai", 
             "Peter Parker",
             "Naimul Khan",
             "Muhammad Abdullah",
             "Gwen Stacy"]

emp_id = ["5182",
          "4292",
          "2632",
          "8642",
          "6379",
          "3572",
          "9385",
          "4695"]

wrist_id = ["84:CC:A8:A4:41:79", 
            "84:CC:A8:DA:32:EC", 
            "84:CC:A8:51:C8:AD", 
            "84:CC:A8:64:65:DC", 
            "84:CC:A8:EA:1B:78",
            "84-CC-A8-8B-3E-17", 
            "00:20:09:00:05:02", # small breadboard (actual prototype) 
            "00:20:08:00:1A:C1"] # big breadboard (actual prototype) 

random.shuffle(wrist_id) # randomly assign wrist ids 

startTime = str(round(time.mktime(datetime.datetime(2021, 4, 8, 9, 0).timetuple())))
endTime = str(round(time.mktime(datetime.datetime(2021, 4, 8, 21, 0).timetuple())))

count = 0 
connection = pymysql.connect(host='nmk02-mysql-test.csqhhjgbuho8.us-east-2.rds.amazonaws.com', user='admin', password='Omar1234', db='hardware')

with connection: 
        with connection.cursor() as cursor:
                while count < 8:        
                    sql = "INSERT INTO hardware.Employees (EmployeeName, EmployeeID, Wrist_ID, ShiftStart, ShiftEnd) VALUES ('" + emp_names[count] + "', '" + emp_id[count] + "', '" + wrist_id[count] + "', '" + startTime + "', '" + endTime + "');"
                    cursor.execute(sql)
                    connection.commit()
                    count = count + 1