<?php
 
class Note implements NoteInterface
{
	private $data = array();
	private $dbfile = "notes.db";
	
	function __construct() {}
	
	function _read()
	{
      		$dataJson = json_decode($_POST["data"], false);
      		$this->data['user'] = $_SESSION['user'];
		$this->data['entry'] = $dataJson->entry ;
		$this->data['time'] = $_SERVER[REQUEST_TIME];
	}
	
	function _save_messages()
	{
		$this->dbh = dba_open( $this->dbfile, "c");
		$key = $this->data['user'] . $this->data['time'];
		$serialized_data = serialize($this->data) ;
		dba_insert($key, $serialized_data, $this->dbh);
	}
	
	function _read_messages()
	{
		$entries = array();
		$this->dbh = dba_open( $this->dbfile, "r");
		$key = dba_firstkey($this->dbh);
		while ($key)
		{
			$serialized_data = dba_fetch($key, $this->dbh) ;
			$this->data = unserialize($serialized_data);
			$entries[] = $this->data;
			$key = dba_nextkey($this->dbh);
		}   
		$entriesJson = json_encode($entries);
		echo $entriesJson;
	}
}
 
?>


