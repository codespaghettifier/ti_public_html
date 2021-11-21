#!/usr/bin/python3
from lxml import etree
import cgi

xmlfile = open('../labs/lab5/products.xml')
xslfile = open('../labs/lab5/products.xsl')
xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)
transform = etree.XSLT(xsldom)
sortby = "'" + cgi.FieldStorage().getvalue("sortby", "") + "'"
sortby_data_type = "'number'" if sortby == "'quantity'" or sortby == "'price'" else "'text'"
result = transform(xmldom, sortby=sortby, sortby_data_type=sortby_data_type)
print ("Content-type: text/html") 
print ()
print(result)
