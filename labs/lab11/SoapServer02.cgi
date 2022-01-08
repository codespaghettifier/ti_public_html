#!/usr/bin/perl -w

  use SOAP::Transport::HTTP;

  SOAP::Transport::HTTP::CGI   
    -> dispatch_to('Demo')     
    -> handle;

  package Demo;

  sub test {                     
    return "Test serwisu SOAP";     
  }

  sub hi {                    
    return "Hello, World";
  }
