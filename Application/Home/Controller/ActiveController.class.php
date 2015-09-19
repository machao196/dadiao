<?php
namespace Home\Controller;
use Home\Common\WebController;
class ActiveController extends WebController{
	 
	 public function index(){
	 	$t = I("get.t");
	 	$u = I("get.u");
	 	$hash = I("get.hash");
	 	$User = D("Common/User");
	 	if(time() - $t > 86400){
	 		throw new \Exception("超时");
	 	}
	 	
	 	$user = $User->getUserByEmail($u);
	 	//print_r($user);exit;
	 	if($hash != md5($t.$user['userid'].$user['salt'])){
	 		throw new \Exception("连接错误");
	 	}
	 	if($user['isactive'] == 1){
	 		throw new \Exception("已激活");
	 	}
	 	$User->UserID = $user['userid'];
	 	$User->IsActive = 1;
	 	$User->save();
	 }
}