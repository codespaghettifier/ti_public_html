<?php
 
/*
 * Logowanie uzytkownika do serwisu 
 */
 
   function _login() {
      echo "ok";
      //$dataJson = json_decode($_POST["data"], false);
      //$email = $dataJson->email;
      //$pass  = $dataJson->password;
      //$access = false ;
      echo "ok";
      /*
      $this->dbh = dba_open( $this->dbfile, "r");   
      if ( dba_exists( $email, $this->dbh ) ) {
         $serialized_data = dba_fetch($email, $this->dbh) ;
         $this->data = unserialize($serialized_data);
         if ( $this->data['pass'] == $pass ) {
            $_SESSION['auth'] = 'OK' ;
            $_SESSION['user'] = $email ;
            $access = true ;
         } 
      }      
      dba_close($this->dbh) ;   
      $text = ( $access ? 'Uzytkownik zalogowany' : ' Uzytkownik nie zalogowany ' ) ;
      return $text ;
      */
      return "asfd";
   }
 
/*
 * Sprawdzamy czy uzytkownik jest zalogowany 
 */
 /*
   function _is_logged() {
      if ( isset ( $_SESSION['auth'] ) ) { 
         $ret = $_SESSION['auth'] == 'OK' ? true : false ;
      } else { $ret = false ; }
      return $ret ;
   } 
 */
 
?>
