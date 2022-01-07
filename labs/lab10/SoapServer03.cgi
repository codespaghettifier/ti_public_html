#!/usr/bin/perl
  use strict;
  use SOAP::Transport::HTTP;
  SOAP::Transport::HTTP::CGI   
    -> dispatch_to('SoapServer')
    -> handle;
 
  package SoapServer;
 
  sub add      { $_[1] + $_[2]; }
  sub subtract { $_[1] - $_[2]; }
  sub multiply { $_[1] * $_[2]; }
  sub divide   { $_[1] / $_[2]; }
