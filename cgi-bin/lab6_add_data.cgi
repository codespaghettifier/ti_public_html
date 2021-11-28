#!/usr/bin/python3
from lxml import etree
import cgi

with open('../labs/lab6/data.csv', 'a') as file:
    pass

data = cgi.FieldStorage()




print ("Content-type: text/html") 
print ()
print(data.keys())