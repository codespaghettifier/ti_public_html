<?php
  $client = new SoapClient("http://pascal.fis.agh.edu.pl/~antek/TI_2020/lab11/SoapServer05.php?wsdl");
  try {
         $wyniki = $client->getResults(5);
         print $wyniki ;
      }
  catch (SoapFault $exception)
      {
         echo $exception;
      }
?>
