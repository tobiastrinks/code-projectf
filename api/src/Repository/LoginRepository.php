<?php
namespace src\Repository;

use Respect\Validation\Rules\Date;
use src\Library\Repository;

class LoginRepository extends Repository {
	
	public function loginByMail($email){
		$statement = $this->DB->prepare("SELECT ID, pw FROM user WHERE email='".$email."'");
        $statement->execute();
        $user = $statement->fetch();
        return $user;
	}
}