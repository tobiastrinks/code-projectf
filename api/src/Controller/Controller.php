<?php
namespace src\Controller;

use Slim\Container;
use Slim\Http\Request;
use Slim\Http\Response;

class Controller {

    /**
     * Contains Response Object
     *
     * @var Response
     */
    protected $response;

    /**
     * Contains Request Object
     *
     * @var Request
     */
    protected $request;

    /**
     * Contains Arguments passed by
     *
     * @var array
     */
    protected $args;

    /**
     * Slim Container
     *
     * @var Container
     */
    protected $container;


    /*
     *  -------------------------------------------------------------
     */
    /**
     * Controller constructor.
     * @param $container
     */
    public function __construct ($container) {
        $this->container = $container;
    }

    /**
     * Fetches all Method-Calls from Router, fetching the params and redirecting to Action-Method
     *
     * @param $method
     * @param $args
     */
    public function __call ($method, $args) {
        $newMethod = $method.'Action';
        if (method_exists($this, $newMethod)) {
            list($this->request, $this->response, $this->args) = $args;
            return $this->response->withJson($this->{$newMethod}());
        } else {
            throw new \Exception('Method not existing');
        }
    }

    /**
     * @param $name
     * @return $name . Repository
     */
    protected function repository ($name) {
        return $this->container->get('repository')->loadRepository($name . 'Repository');
    }

    protected function filter () {
        return $this->container->get('filter');
    }

    protected function render ($data = '') {
        $authData = $this->request->getAttribute('authData');
        if ($authData != null) {
            foreach ($authData as $key => $value) {
                $data[$key] = $value;
            }
        }
        return $data;
    }
	
	protected function getUserId () {
		$token = $this->request->getHeader('Authorization');
		if(!empty($token))
			return(intval($this->repository('Token')->getUserId($token[0])));
		else
			return false;
	}
	
	protected function getMediaDir () {
		return ('https://'.$_SERVER['HTTP_HOST'].'/media/');
	}
}