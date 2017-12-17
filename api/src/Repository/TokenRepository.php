<?php
namespace src\Repository;

use Respect\Validation\Rules\Date;
use src\Library\Repository;

use src\Library\Helper;

class TokenRepository extends Repository {
	
	public function updateToken($user_id){
		
		$randomStr = Helper::generateRandomString(10);
		
		$statement = $this->DB->prepare("UPDATE auth_token SET token=:token WHERE user_id=:user_id");
		$statement->execute([":user_id"=>$user_id, ":token"=>$randomStr]);
		
		return ($randomStr);
	}
	
	public function checkToken($old_token, $user_id){
		/*$statement = $this->DB->prepare("SELECT user_id FROM auth_token WHERE token='".$old_token."'");
		$statement->execute();
		$result = $statement->fetch();
		
		if($user_id == $result["user_id"])
			return true;
		else*/
			return false;
	}
	
	public function getUserId($token){
		$statement = $this->DB->prepare("SELECT user_id FROM auth_token WHERE token=:token");
		$statement->execute([":token"=>$token]);
		return (intval($statement->fetch()["user_id"]));
	}
}