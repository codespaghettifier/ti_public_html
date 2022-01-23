#!/usr/bin/python3
import cgi
import json

with open('../labs/lab6/data.csv', 'r') as file:
	lines = file.readlines()
	records = []
	for line in lines:
		line = line.rstrip()
		record_list = line.split(', ')
		record = {'firstName': record_list[0], 'lastName': record_list[1], 'email': record_list[2], 'year': record_list[3]}
		records.append(record)

data_json = json.dumps(records)

print ("Content-type: text/html") 
print ()
print(data_json)
