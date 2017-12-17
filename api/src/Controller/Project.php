<?php
# @Date:   Mon, 13 November, 2017 | 02:21:12 PM ()
# @Last modified time: Tue, 14 November, 2017 | 12:47:57 PM ()

namespace src\Controller;

use src\Library\Helper;

class Project extends Controller {
	
	//---------------GET
	
	public function projectAction(){

		$getParam = $this->request->getQueryParams();
		if(empty($getParam["id"]) AND empty($getParam["route"]))
			return ( ['error' => 'route and id missing'] );
		else{
			if(empty($getParam["id"])){
				$id = $this->repository("Project")->getProjectIdByRoute($getParam["route"]);
			}
			else{
				$id = $getParam["id"];
			}
			if($id){
				$project = $this->repository('Project')->getProject($id);
				
				//get img
				if($project["img"] != 0){
					$project["img"] = $this->getMediaDir() . $this->repository("Media")->getFilename([$project["img"]])[0];
				}
				
				//hashtags
				$project["hashtags"] = explode(",", $project["hashtags"]);
				
				//get user
				$project["owner"] 			= $this->repository("User")->getUserByProjectRelation($id, "owner")[0];
				$project["owner"]["img"] 	= $this->getMediaDir() . $this->repository("Media")->getFilename([$project["owner"]["img"]])[0];
				
				$project["members"] = $this->repository("User")->getUserByProjectRelation($id, "member");
				if(count($project["members"]) > 0){
					$media_id			= Helper::getArrayFromObject($project["members"], "img");
					$filename			= $this->repository("Media")->getFilename($media_id);
				
					for($x=0; $x<count($project["members"]); $x++){
						if($filename[$x]){
							$project["members"][$x]["img"] = $this->getMediaDir() . $filename[$x];
						}
					}
				}
				return ( $project );
			}
			else{
				return (["error"=>"project_not_found"]);
			}
		}
	}
	public function listAction(){
		
		$getParam = $this->request->getQueryParams();
		
		if(empty($getParam["user_id"]) && empty($getParam["relation"]))
			$result = $this->repository("Project")->getAllProjects();
		
		if(!empty($getParam["user_id"]) && !empty($getParam["relation"])){
			
			$relation = explode(",", $getParam["relation"]);
			for($x=0; $x<count($relation); $x++){
				$relation[$x] = "'".$relation[$x]."'";
			}
			$relation = implode(",", $relation);
			
			$result = $this->repository("Project")->getUserProjectsByRelation($getParam["user_id"], $relation);
		}
		
		if(count($result)){
			
			//load img
			$media_id	= Helper::getArrayFromObject($result, "img");
			$filename	= $this->repository("Media")->getFilename($media_id);
			
			for($x=0; $x<count($result); $x++){
				
				if($filename[$x]){
					$result[$x]["img"] = $this->getMediaDir() . $filename[$x];
				}
			}
			
			//load hashtags
			for($x=0; $x<count($result); $x++){
				$result[$x]["hashtags"] = explode(",", $result[$x]["hashtags"]);
			}
		}
		
		return($result);
		/*
		if(empty($getParam["user_id"]) && empty($getParam["filter"]))
			return ( json_encode($this->repository('Project')->getAllProjects($getParam["user_id"], $getParam["filter"])) );
		elseif(empty($getParam["user_id"]) && !empty($getParam["filter"]))
			return ( json_encode($this->repository('Project')->getAllProjectsByFilter($getParam["user_id"], $getParam["filter"])) );
		elseif(!empty($getParam["user_id"]) && empty($getParam["filter"]))
			return ( json_encode($this->repository('Project')->getUserProjects($getParam["user_id"], $getParam["filter"])) );
		elseif(!empty($getParam["user_id"]) && !empty($getParam["filter"]))
			return ( json_encode($this->repository('Project')->getUserProjectsByFilter($getParam["user_id"], $getParam["filter"])) );
		//get project list (checking in repository)
		//--check if user_param
		//--check for filters
		*/
	}
	
	
	//---------------OPERATIONS
	
	public function createAction(){

		$params = $this->request->getParsedBody()["project"];
		
		//convert hashtags
		foreach($params["hashtags"] as $hashtag){
			$hashtag = str_replace("#", "", $hashtag);
		}
		$params["hashtags"] = implode(",", $params["hashtags"]);
		
		//generate route
		$params["route"] = str_replace(" ", "-", $params["name"]);
		
		$project_id = $this->repository('Project')->createProject($params);
		
		$user_id = $this->getUserId();
		
		if($project_id){
			
			//owner
			$this->repository("Project")->createProjectUserRelation($project_id, $user_id, "owner");
			
			foreach($params["members"] as $member){
				
				if($member["ID"] != $user_id)
					$this->repository("Project")->createProjectUserRelation($project_id, $member["ID"], "member");
			}
			
			$result = ['ID' => $project_id];
		}
		else{
			$result = ['error' => 1];
		}
		return ( $result );
	}
	public function deleteAction(){
		$projDelete = false;

		$params = $this->request->getParsedBody();
			/*$projOwner = $this->repository('Project')->getProjectOwner((int)$params['project_id']);
		if ($projOwner == $user_id);*/
		
		$projDelete = $this->repository('Project')->deleteProject(intval($params['project_id']));
		$this->repository("Project")->deleteProjectUserRelation(intval($params['project_id']));
		
		if($projDelete)
			$projDelete = ['success' => 1];
		else
			$projDelete = ['error' => 1];

		return ( $projDelete );
		//delete project
		//--check if user owns project
		//--delete img_files too > returns from Repository
	}
	public function updateAction(){

		$params 	= $this->request->getParsedBody();
		
		if(!empty($params["id"]) AND !empty($params["attr"]) AND !empty($params["val"])){
			if( $this->repository('Project')->updateProject($params["id"], $params["attr"], $params["val"]) ){
				return(["success"=>true]);
			}
			else {
				return(["error"=>"repository"]);
			}
		}
		else{
			return(["error"=>"required: id, attr, val"]);
		}
	}
	
	//---------------PROJECT-USER RELATIONS
	
	public function createRelationAction(){
		
		$params = $this->request->getParsedBody();
		
		if(!empty($params["project_id"]) AND !empty($params["user_id"]) AND !empty($params["relation"])){
			$result = $this->repository("Project")->createProjectUserRelation($params["project_id"], $params["user_id"], $params["relation"]);
			if($result){
				return(["success"=>1]);
			}
		}
		else{
			return(["error"=>"required: project_id, user_id, relation"]);
		}
	}
	public function deleteRelationAction(){
		
		$params = $this->request->getParsedBody();
		
		if(!empty($params["project_id"]) AND !empty($params["user_id"])){
			$result = $this->repository("Project")->deleteProjectUserRelation($params["project_id"], $params["user_id"]);
			if($result){
				return(["success"=>1]);
			}
		}
		else{
			return(["error"=>"required: project_id, user_id"]);
		}
	}
}
