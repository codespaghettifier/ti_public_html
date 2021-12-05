#!/usr/bin/python3
import cgi
import json

valid_colors = ["red", "green", "blue", "yellow"]

def id_data_valid(color):
	return color in valid_colors
	
data = cgi.FieldStorage()
#data_json = json.loads(data['data'].value)
data_json  = json.loads('{"color":"blue"}')
color = data_json['color']

if not id_data_valid(color):
	result = {'result': 'Failed: invalid data'}
else:
	result = {'result': 'OK'}
	
	with open('../labs/lab7/poll_data.json', 'r') as file:
		poll_json = file.read()
	
	poll = json.loads(poll_json)
	poll[color] += 1
	poll_json = json.dumps(poll)
	
	with open('../labs/lab7/poll_data.json', 'w') as file:
		file.write(poll_json)
	
print ("Content-type: text/json") 
print ()
print(json.dumps(result))
	

