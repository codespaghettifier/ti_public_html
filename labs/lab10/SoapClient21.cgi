#!/usr/bin/perl -w
  
  use SOAP::Lite;
  print "Content-type: text/html\n\n";  

  print SOAP::Lite                                             
    -> uri('http://pascal.fis.agh.edu.pl/Demo')                     
    -> proxy('http://pascal.fis.agh.edu.pl/~antek/cgi-bin/TI_2020Z/lab11/SoapServer02.cgi')
    -> test()                                                    
    -> result;
  print "\n";
