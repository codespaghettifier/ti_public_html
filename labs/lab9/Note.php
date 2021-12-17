<?php
 
class Note implements NoteInterface
{
	private $data = array();
	private $dbfile = "notes.db";
	
	function __construct() {}
	
	function _read()
	{
      		$dataJson = json_decode($_POST["data"], false);
		$this->data['entry'] = $dataJson->entry ;
		$this->data['time'] = $_SERVER[REQUEST_TIME];
	}
	
	function _save_messages()
	{
		$this->dbh = dba_open( $this->dbfile, "c");
		$key = $_SESSION['user'] . $this->data['time'];
		$serialized_data = serialize($this->data) ;
		dba_insert($key, $serialized_data, $this->dbh);
	}
	
	function _read_messages()
	{
		
	}
}
 
?>


