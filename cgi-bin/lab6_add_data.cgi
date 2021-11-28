#!/usr/bin/python3
import cgi
import json

def is_data_valid(first_name, last_name, email, year):
	if len(first_name) == 0:
		return False
	
	if len(last_name) == 0:
		return False
		
	if len(email) == 0:
		return False
		
	if len(year) == 0:
		return False
		
	return True

data = cgi.FieldStorage()
data_json = json.loads(data['data'].value)
first_name = data_json['firstName']
last_name = data_json['lastName']
email = data_json['email']
year = data_json['year']

if not is_data_valid(first_name, last_name, email, year):
	result = {'result': 'Failed: invalid data'}
else:
	result = {'result': 'OK'}
	
with open('../labs/lab6/data.csv', 'a') as file:
    file.write(first_name + ", " + last_name + ", " + email + ", " + year + "\n")

print ("Content-type: text/json") 
print ()
print(json.dumps(result))

