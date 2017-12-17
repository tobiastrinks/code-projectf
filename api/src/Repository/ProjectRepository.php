<?php
# @Date:   Mon, 13 November, 2017 | 02:20:52 PM ()
# @Last modified time: Tue, 14 November, 2017 | 12:45:13 PM ()



namespace src\Repository;

use Respect\Validation\Rules\Date;
use src\Library\Repository;

class ProjectRepository extends Repository {
	
	
	//----------GET PROJECTS
	public function getProject($project_id){

		$statement = $this->DB->prepare("SELECT * FROM projects WHERE ID=".$project_id);
        $statement->execute();
        $project = $statement->fetch();
        return ($project);
	}
	public function getProjectIdByRoute($route){
		
		$statement = $this->DB->prepare("SELECT ID FROM projects WHERE route='".$route."'");
		$statement->execute();
		$result = $statement->fetch();
		
		if(!empty($result["ID"]))
			return($result["ID"]);
		else
			return(false);
	}
	public function getAllProjects(){
		$statement = $this->DB->prepare("SELECT * FROM projects");
		$statement->execute();
		$project = $statement->fetchAll();
		return ($project);
	}
	public function getUserProjectsByRelation($user_id, $relation){
		$statement = $this->DB->prepare("SELECT * FROM projects WHERE ID IN (SELECT project_id FROM projects_user WHERE user_id=".$user_id." AND relation IN (".$relation."))");
		$statement->execute();
		$project = $statement->fetchAll();
		return ($project);
	}
	public function getProjectsRelationsByUser($user_id, $relation){
		$statement = $this->DB->prepare("SELECT project_id FROM projects_user WHERE relation=:relation AND user_id=:user_id");
		$statement->execute([":relation"=>$relation, ":user_id"=>$user_id]);
		return( $statement->fetchAll() );
	}
	
	
	//---------FILTER
	public function getAllProjectsByFilter($filter){
		$statement = $this->DB->prepare("SELECT * FROM projects WHERE (name LIKE '%".$filter."%' OR hashtags LIKE '%".$filter."%' OR descr LIKE '%".$filter."%' OR owner LIKE '%".$filter."%' OR team_members LIKE '%".$filter."%')");
		$statement->execute();
		$project = $statement->fetch();
		return ($project);
	}
	public function getUserProjectsByFilter($user_id, $filter){
		$statement = $this->DB->prepare("SELECT * FROM projects WHERE team_members LIKE '%".$user_id."%' AND (name LIKE '%".$filter."%' OR hashtags LIKE '%".$filter."%' OR descr LIKE '%".$filter."%' OR owner LIKE '%".$filter."%' OR team_members LIKE '%".$filter."%')");
		$statement->execute();
		$project = $statement->fetch();
		return ($project);
	}
	
	
	//---------OPERATIONS
	public function createProject($params){

		$statement = $this->DB->prepare('INSERT INTO projects (name, hashtags, descr, short_descr, img, route) VALUES (:name, :hashtags, :descr, :short_descr, :img, :route)');
        $statement->execute([':name'=>$params['name'], ':hashtags'=>$params['hashtags'], ':descr'=>$params['descr'], ':short_descr'=>$params['short_descr'], ':img'=>$params['img'], ':route'=>$params['route']]);
		
		$project_id = $this->DB->lastInsertId("ID");
		
		return ($project_id);
	}
	public function deleteProject($project_id){

		$statement = $this->DB->prepare("DELETE FROM projects WHERE ID=:project_id");
		$statement->execute([':project_id'=>$project_id]);
	}
	public function updateProject($project_id, $attr, $val){

		$statement = $this->DB->prepare("UPDATE projects SET ".$attr."=:val WHERE ID=".$project_id);
		$statement->execute([":val"=>$val]);
		return true;
	}
	
	
	//----------PROJECT-USER RELATIONS
	public function createProjectUserRelation($project_id, $user_id, $relation){
		
		$statement = $this->DB->prepare("DELETE FROM projects_user WHERE user_id=:user_id AND project_id=:project_id");
		$statement->execute([":user_id"=>$user_id, ":project_id"=>$project_id]);
		
		$statement = $this->DB->prepare("INSERT INTO projects_user (user_id, project_id, relation) VALUES (:user_id, :project_id, :relation)");
		$statement->execute([":user_id"=>$user_id, ":project_id"=>$project_id, ":relation"=>$relation]);
		
		return true;
	}
	public function deleteProjectUserRelation($project_id, $user_id=0){
		
		if($user_id != 0)
			$user_query = "user_id=".$user_id." AND ";
		else
			$user_query = "";
		
		$statement = $this->DB->prepare("DELETE FROM projects_user WHERE ".$user_query."project_id=:project_id");
		$statement->execute([":project_id"=>$project_id]);
		
		return true;
	}
	public function getProjectUserRelation($project_id, $user_id) {
		$statement = $this->DB->prepare("SELECT relation FROM projects_user WHERE project_id=:project_id AND user_id=:user_id");
        $statement->execute([':project_id'=>$params['project_id'], ':user_id'=>$params['user_id']]);
		return $statement->fetch();
	}
}
