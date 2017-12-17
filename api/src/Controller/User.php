<?php
namespace src\Controller;

use src\Library\Helper;

class User extends Controller {
	
	public function createAction(){
		
		$params = $this->request->getParsedBody();
		$register = $this->repository('User')->createUser($params);
		
		if($register === true)
			$result = ['success' => 1];
		else{
			if($register == 'email_error')
				$result = ['error' => 'email_used'];
			else if($register == 'factory_nb_error')
				$result = ['error' => 'factory_nb_used'];
			else
				$result = ['error' => 1];
		}
		return ( $result );
	}
	
	public function infoAction(){
		
		$getParam = $this->request->getQueryParams();
		$user_id;
		if(isset($getParam["id"]))
			$user_id = $getParam["id"];
		else{
			$user_id = $this->getUserId();
			if(!$user_id)
				return(["error"=>'register_first']);
			else{
				$user = $this->repository('User')->getUser([$user_id])[0];
				
				if($user["img"] != 0){
					$filename	= $this->repository('Media')->getFilename([$user["img"]]);
					if($filename){
						$user["img"] = $this->getMediaDir() .$filename[0];
					}
				}
				
				//get projects
				$relations = ["owner", "member", "liked"];
				$user["projects"] = [];
				
				foreach($relations as $relation){
					$user["projects"][$relation] = $this->repository("Project")->getProjectsRelationsByUser($user_id, $relation);
					$user["projects"][$relation] = Helper::getArrayFromObject($user["projects"][$relation]);
				}
				return($user);
			}
		}
	}
	
	public function updateAction(){
		
		//update user attr
		$user_id 	= $this->getUserId();
		$params 	= $this->request->getParsedBody();
		
		if(!empty($params["attr"]) AND !empty($params["val"])){
			if( $this->repository('User')->updateUser($user_id, $params["attr"], $params["val"]) ){
				return(["success"=>true]);
			}
			else {
				return(["error"=>"repository"]);
			}
		}
		else{
			return(["error"=>"required: attr, val"]);
		}
	}
	
	public function searchAction(){
		
		$params 	= $this->request->getParsedBody();
		
		$result 	= $this->repository("User")->getUserByFilter($params["str"]);
		
		if(count($result) > 0){
		
			$user_id	= Helper::getArrayFromObject($result);
		
			$users		= $this->repository("User")->getUser($user_id);
			
			//load img
			$media_id	= Helper::getArrayFromObject($users, "img");
			$filename	= $this->repository("Media")->getFilename($media_id);
			
			for($x=0; $x<count($users); $x++){
				
				if($filename[$x]){
					$users[$x]["img"] = $this->getMediaDir() . $filename[$x];
				}
			}
			
			return($users);
		}
		else{
			return(["error"=>"no_result"]);
		}
	}
}