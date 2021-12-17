<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
  
$user = new Register_new;

if($user->_is_logged())
{
	$note = new Note;
	$note->_read();
	$note->_save_messages();
	echo "Success";
}
else
{
	echo "Failed: User not logged in";
}



             
?>
