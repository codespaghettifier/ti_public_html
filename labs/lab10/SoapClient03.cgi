#!/usr/bin/perl
  use strict;
  use SOAP::Lite;
  my $soap = SOAP::Lite
    ->uri("http://pascal.fis.agh.edu.pl/SoapServer")
    ->proxy("http://pascal.fis.agh.edu.pl/~antek/cgi-bin/TI_2020Z/lab11/SoapServer03.cgi");

  print "Content-type: text/plain\n\n";
  print "Dodawanie    ",$soap->add(16,8)->result,       "\n";
  print "Odejmowanie  ",$soap->subtract(10,2)->result,  "\n";
  print "Mnozenie     ",$soap->multiply(5,5)->result,   "\n";
  print "Dzielenie    ",$soap->divide(1024,2)->result,  "\n";
