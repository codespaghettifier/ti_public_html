<?php
 
class Register {
 
   protected $data = array()  ;
 
   function __construct () { 
   }
       
   function _read () {
      $dataJson = json_decode($_POST["data"], false);
      $this->data['fname'] = $dataJson->firstName ;
      $this->data['lname'] = $dataJson->lastName ;
      $this->data['email'] = $dataJson->email;
      $this->data['pass']  = $dataJson->password;
   }          
 
 /*
   function _write () {
      echo "Wprowadzone dane (obiektowo) <br/>" ;
      echo "Imię: ". $this->data['fname'] ." <br/>" ;   
      echo "Nazwisko: ". $this->data['lname'] ." <br/>" ;
      echo "E-mail: ". $this->data['email'] ." <br/>" ;
      echo "Hasło: ". $this->data['pass'] ." <br/>" ; 
   }*/  
}
?>
