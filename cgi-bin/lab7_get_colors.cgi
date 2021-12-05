#!/usr/bin/python3
import cgi
import json

with open('../labs/lab7/poll_data.json', 'r') as file:
	poll_json = file.read()
	
poll = json.loads(poll_json)
result = poll

print ("Content-type: text/json") 
print ()
print(json.dumps(result))
	

