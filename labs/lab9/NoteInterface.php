<?php
 
interface NoteInterface
{	
	function _read();
	function _save_messages();
	function _read_messages();
}

/*
class Note implements NoteInterface
{
	protected $data = array();
	
	function __construct() {}
	
	function _read()
	{
	      $dataJson = json_decode($_POST["data"], false);
	      $this->data['entry'] = $dataJson->entry ;
	}
	
	function _save_messages()
	{
		
	}
	
	function _read_messages()
	{
	
	}
}
*/
         
?>

