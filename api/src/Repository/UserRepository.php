<?php
namespace src\Repository;

use Respect\Validation\Rules\Date;
use src\Library\Repository;

class UserRepository extends Repository {
	
	//----------------GET USER
	public function getUser($user_id){
		
		$statement = $this->DB->prepare("SELECT ID, fname, lname, email, img FROM user WHERE ID IN (".implode(",", $user_id).")");
        $statement->execute();
        $user = $statement->fetchAll();
        return $user;
	}
	public function getUserByFilter($search_str){
		
		$search_arr = explode(" ", $search_str);
		$query = [];
		foreach($search_arr as $search){
			if($search != '')
				$query[count($query)] = "fname LIKE '".$search."%' OR lname LIKE '".$search."%'";
		}
		$statement = $this->DB->prepare("SELECT ID FROM user WHERE ".implode(" OR ", $query));
		$statement->execute();
		
		return($statement->fetchAll());
	}
	public function getUserByProjectRelation($project_id, $relation){
		
		$statement = $this->DB->prepare("SELECT ID, fname, lname, email, img FROM user WHERE ID IN (SELECT user_id FROM projects_user WHERE project_id=:project_id AND relation=:relation)");
		$statement->execute([":project_id"=>$project_id, ":relation"=>$relation]);
		
		return($statement->fetchAll());
	}
	
	//-----------------OPERATIONS
	public function createUser($params){
		
		$statement = $this->DB->prepare('SELECT email, factory_nb FROM user WHERE email=:email OR factory_nb=:factory_nb');
		$statement->execute([':email'=>$params['email'], ':factory_nb'=>$params['factory_nb']]);
		$check = $statement->fetch();
		if($check){
			if($check['email'] == $params['email'])
				return 'email_error';
			if($check['factory_nb'] == $params['factory_nb'])
				return 'factory_nb_error';
		}
		else{
			$statement = $this->DB->prepare('INSERT INTO user (fname, lname, email, pw, factory_nb) VALUES (:fname, :lname, :email, :pw, :factory_nb)');
			$statement->execute([':fname'=>$params['fname'], ':lname'=>$params['lname'], ':email'=>$params['email'], ':pw'=>$params['pw'], ':factory_nb'=>$params['factory_nb']]);
			
			$lastId = $this->DB->lastInsertId("ID");
			
			$statement = $this->DB->prepare("INSERT INTO auth_token (user_id, token) VALUES (:user_id, '')");
			$statement->execute([":user_id"=>$lastId]);
			
			return true;
		}
	}
	public function updateUser($user_id, $attr, $val){
		
		$statement = $this->DB->prepare("UPDATE user SET ".$attr."=:val WHERE ID=:user_id");
		return($statement->execute([":val"=>$val, ":user_id"=>$user_id]));
	}
}