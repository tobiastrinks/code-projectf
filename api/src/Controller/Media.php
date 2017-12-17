<?php
namespace src\Controller;

use src\Library\Helper;
use src\Library\img_op;

class Media extends Controller {
	
	public function uploadAction(){
		
		if(!empty($_FILES)){
			
			$postParam = $this->request->getParsedBody();
			
			$filename = $_FILES['file']['name'];
			$filetype = pathinfo($filename, PATHINFO_EXTENSION);
			
			$result = $this->repository('Media')->upload($this->getUserId(), $filetype);
			
			//save file
			$targetFile = "media/".$result["filename"];
			
			if(move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)){
				
				//compress
				if($postParam["type"] == "user_img")
					img_op::crop( $targetFile, $targetFile, "400x400" );
				if($postParam["type"] == "project_img")
					img_op::crop( $targetFile, $targetFile, "1360x700^" );
				
				return json_encode([
					"id"=>$result["id"],
					"src"=>"https://".$_SERVER['HTTP_HOST']."/media/".$result["filename"]
				]);
			}
			else{
				return json_encode(["error"=>"move_uploaded_file"]);
			}
		}
	}
}