<?php
namespace src\Library;

use src\Repository\UserRepository;

class Token {

    /**
     * Token Repository
     * @var UserRepository
     */
    private $userRepository;

    public function __construct ($userRepository) {
        $this->userRepository = $userRepository;
    }

    public function generate ($userId, $tokens) {
        $this->clearTokens($tokens);
        foreach ($tokens as $key => $token) {
            if ($token['used'] == false) {
                return $key;
            }
        }
        $randomToken = Helper::generateRandomString(50);
        //Token in DB eintragen
        $this->userRepository->addToken($randomToken);
        return $randomToken;
    }

    private function clearTokens ($tokens) {
        foreach ($tokens as $key => $token) {
            if ($token['used'] == true && (int)$token['timestamp'] + 10000 < time()) { //Token already used and expired
                //Delete token
                $this->userRepository->deleteToken($key);
            }
        }
    }
}