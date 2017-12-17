<?php
namespace src\Controller;

use src\Library\Helper;

class Login extends Controller {

   public function loginAction(){
       //check user login
       $params = $this->request->getParsedBody();
	   
       $user = $this->repository('Login')->loginByMail($params['email']);
	   
       if ($params['pw'] == $user['pw']) {
		   
		   $token = $this->repository('Token')->updateToken($user['ID']);
           $response = [
               'token' => $token
           ];
       }
       else {
           $response = [
               'error' => 1
           ];
       }
       return $response;
   }

   public function forgetAction(){
       //send user forget link via mail
   }

   public function validateAction(){
       //check if user have permission to reset password
   }

   public function resetAction(){
       //set new password for user
   }
}