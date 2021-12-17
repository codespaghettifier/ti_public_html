<?php

function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$user = new Register_new;

echo $user->_login() ;

     
 
//$reg = new Register_new ;
//$reg->_read();
//$reg->_write();
//echo $reg->_save();
//echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
             



/*
<?php
echo "ok";
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
 
$user = new Register_new;
//echo "ok"
//echo $user->_login() ;
//echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
             
?>
*/


             
?>



