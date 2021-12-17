<?php
class Register_new extends Register {
 
   private $dbh;
   private $dbfile = "users.db" ;
 
   function __construct () {
      parent::__construct() ;  
      session_start() ;
   }
 
/*
 *  Zapis danych do bazy
 */
 
   function _save () {
      $this->dbh = dba_open( $this->dbfile, "c");
      if ( ! dba_exists($this->data['email'], $this->dbh ) ) {
         $serialized_data = serialize($this->data) ;
         dba_insert($this->data['email'],$serialized_data, $this->dbh) ;
         $text = 'Dane zostały zapisane' ;
      } else {          
         $text = 'Dane dla podanego adresu e-mail sa w bazie danych' ;
      }
      dba_close($this->dbh) ;
      return $text;
   }
   
   /*
 * Logowanie uzytkownika do serwisu 
 */
 
   function _login() {
      $dataJson = json_decode($_POST["data"], false);
      $email = $dataJson->email;
      $pass  = $dataJson->password;
      $access = false ;
      
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
      $text = ( $access ? 'successful' : 'login failed' ) ;
      return $text ;
   }
 
/*
 * Sprawdzamy czy uzytkownik jest zalogowany 
 */
 
   function _is_logged() {
      if ( isset ( $_SESSION['auth'] ) ) { 
         $ret = $_SESSION['auth'] == 'OK' ? true : false ;
      } else { $ret = false ; }
      return $ret ;
   }
   
	function _logout()
	{
		unset($_SESSION); 
		session_destroy();   
		echo "Success";
	}
}
?>
