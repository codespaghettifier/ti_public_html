<?php

namespace appl;
use appl\ {View, Controller};
use info\Info;

class UserController extends Controller
{
    protected $layout;
    protected $model;

    function __construct()
    {
        parent::__construct();
        $this->layout = new view('main');
        $this->layout->css = $this->css;
        $this->model = new User;
        $this->layout->menu = $this->menu;
    }

    function registerView()
    {
		$this->layout->title = 'Simple MVC';
        $this->layout->header = 'Rejestracja';
        $this->view = new view('register_form');
        $this->layout->content = $this->view;
        return $this->layout;
    }

    function register()
    {
      $user = new User;
      $data = $_POST['data'];
      $obj = json_decode($data);
      if (isset($obj->firstName) and isset($obj->lastName) and isset($obj->email) and isset($obj->password))
      {
          $response = $this->model->register($obj);
      }
        return ($response ? "success" : "failed");
    }

    function loginView()
    {
		$this->layout->title = 'Simple MVC';
        $this->layout->header = 'Logowanie';
        $this->view = new view('login_form');
        $this->layout->content = $this->view;
        return $this->layout;
    }

    function login()
    {
        $user = new User;
        $data = $_POST['data'];
        $obj = json_decode($data);
        if (isset($obj->email) and isset($obj->password))
        {
            $response = $this->model->login($obj);
        }
        return ($response ? "success" : "failed");
    }

	function logout()
	{
        $user = new User;
		$response = $user->logout();
		$controller = new Info ;
		return $controller->index();
	}
}

?>
