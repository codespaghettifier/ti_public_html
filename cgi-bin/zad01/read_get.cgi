#!/usr/bin/python3
import cgi
import json

with open('../../zad01/baza.db', 'r') as file:
	lines = file.readlines()

records = []
for line in lines:
    line = line.rstrip()
    record_list = line.split(', ')
    record = {'name': record_list[0] \
        , 'x1': record_list[1], 'y1': record_list[2] \
        , 'x2': record_list[3], 'y2': record_list[4] \
        , 'x3': record_list[5], 'y3': record_list[6]}
    records.append(record)

data_json = json.dumps(records)
print("Content-type: text/json") 
print()
print(data_json)