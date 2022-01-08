<?php
class DataService  {
  function getResults( $par )    {
     $date = "TEST =".$par*10 ;
     return $date ;
   }
}
if (0 == strcmp($_SERVER['QUERY_STRING'], '?wsdl')) {
        header('Content-type: text/xml');
        readfile('Data.wsdl');
        die(); }
  $server = new SoapServer("Data.wsdl");
  $server->setClass("DataService");
  $server->handle();
?>
