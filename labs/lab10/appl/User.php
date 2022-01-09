<?php


namespace appl;
use PDO ;

class User
{
    static $dsn = 'sqlite:sql/baza.db'  ;
    protected static $db ;
    private $sth ;

    function __construct()
    {
        session_start();
        $data = explode(':',self::$dsn) ;
        if ( ! file_exists ( $data[1] ) ) { throw new Exception ( "Database file doesn't exist." ) ;  }
        self::$db = new PDO ( self::$dsn ) ;
        self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function register($obj)
    {
        $this->sth = self::$db->prepare('INSERT INTO user VALUES ( :fname, :lname, :email, :pass)');
        $this->sth->bindValue(':fname', $obj->firstName, PDO::PARAM_STR);
        $this->sth->bindValue(':lname', $obj->lastName, PDO::PARAM_STR);
        $this->sth->bindValue(':email', $obj->email, PDO::PARAM_STR);
        $this->sth->bindValue(':pass', md5($obj->password), PDO::PARAM_STR);
        return $this->sth->execute();
    }

    public function login($obj)
    {
        $access = false;
        $this->sth = self::$db->prepare('SELECT pass FROM user WHERE email=:email');
        $this->sth->bindValue(':email', $obj->email, PDO::PARAM_STR);
        if(!$this->sth->execute())
        {
            return $access;
        }
        $record = ($this->sth->fetch());
        if ($record['pass'] == md5($obj->password))
        {
            $_SESSION['auth'] = 'OK';
            $_SESSION['user'] = $email;
            $access = true;
        }
        return $access;
    }

    function isLogged()
    {
        if (isset($_SESSION['auth']))
        {
            $logged = $_SESSION['auth'] == 'OK' ? true : false;
        }
        else
        {
            $logged = false;
        }
        return $logged;

    }

    function logout()
    {
        unset($_SESSION);
        session_destroy();
        return true;
    }
}

?>
