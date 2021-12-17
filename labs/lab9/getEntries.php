<?php

function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$note = new Note;
$note->_read_messages();

?>


