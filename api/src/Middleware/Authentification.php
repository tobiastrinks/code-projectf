<?php
namespace src\Middleware;

use Slim\Container;
//use src\Repository\UserRepository;
use src\Repository\TokenRepository;

class Authentification {

    /**
     * User Repository
     * @var UserRepository
     */
    //private $userRepository;

    /**
     * Token Repository
     * @var
     */
    private $tokenRepository;

    /**
     * Sim container
     * @var Container
     */
    private $container;

    public function __construct ($container) {
        //$this->userRepository = $container->get('repository')->loadRepository('UserRepository');
        $this->tokenRepository = $container->get('repository')->loadRepository('TokenRepository');
        $this->container = $container;
    }

    public function __invoke ($request, $response, $next) {
        $oldToken = ($request->getParsedBodyParam('token') != null) ? $request->getParsedBodyParam('token') : "";
        $userid = ($request->getParsedBodyParam('userid') != null) ? $request->getParsedBodyParam('userid') : "";
        try {
            $valid = $this->tokenRepository->checkToken($oldToken, $userid);
            if ($valid) {
                //$newToken = $this->tokenRepository->generateToken($userid);
				$newToken = $oldToken; //later refresh
				
                $authData = ["token" => $newToken, "userid" => $userid];
                $request = $request->withAttribute('authData', $authData);
                $response = $next($request, $response);
            }else{//$this->container->get('errors')['INVALID_TOKEN']
                $response->getBody()->write(json_encode(['error' => 1, 'code' => 'INVALID_TOKEN']));
            }
        }catch (\PDOException $e){
            $response->getBody()->write(json_encode(['error' => 1, 'code' => $this->container->get('errors')['DATABASE_ERROR']]));
            if ($this->container['debug']){
                $response->getBody()->write($e->getMessage());
            }
        }
        return $response;
    }
}