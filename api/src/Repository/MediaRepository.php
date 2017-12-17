<?php
namespace src\Repository;

use Respect\Validation\Rules\Date;
use src\Library\Repository;

class MediaRepository extends Repository {
	
	public function upload($user_id, $extension){
		
		//insert file into db
		$statement = $this->DB->prepare("INSERT INTO media (user_id, filename) VALUES (:user_id, :filename)");
		$statement->execute([":user_id"=>$user_id, ":filename"=>'']);
		
		$insertId = $this->DB->lastInsertId("ID");
		$filename = $insertId.".".$extension;
		
		$statement = $this->DB->prepare("UPDATE media SET filename='".$filename."' WHERE ID=".$insertId);
		$statement->execute();
		
		return ([
			"id"=>$insertId,
			"filename"=>$filename
		]);
	}
	
	public function getFilename($id_arr){
		
		$statement = $this->DB->prepare("SELECT ID, filename FROM media WHERE ID IN (".implode(",", $id_arr).")");
		$statement->execute();
		$db_result = $statement->fetchAll();
		
		$result = [];
		
		foreach($id_arr as $id){
			if($id == 0){
				$result[count($result)] = 0;
			}
			else{
				foreach($db_result as $db_result_elem){
					
					if($db_result_elem["ID"] == $id)
						$result[count($result)] = $db_result_elem["filename"];
				}
			}
		}
		
		if(count($result) > 0)
			return($result);
		else
			return(false);
	}
}