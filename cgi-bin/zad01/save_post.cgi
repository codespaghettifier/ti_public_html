#!/usr/bin/python3
import cgi
import json

data = cgi.FieldStorage()
data_json = json.loads(data['data'].value)

#data_json = json.loads('{"name":"test","x1":"1","y1":"30","x2":"10","y2":"40","x3":"20","y3":"50"}')

with open('../../zad01/baza.db', 'a') as file:
    file.write(data_json['name'] \
        + ', ' + data_json['x1'] + ', ' + data_json['y1'] \
        + ', ' + data_json['x2'] + ', ' + data_json['y2'] \
        + ', ' + data_json['x3'] + ', ' + data_json['y3'] + "\n")

result = {'result': 'OK'}
print ("Content-type: text/json") 
print ()
print(json.dumps(result))

