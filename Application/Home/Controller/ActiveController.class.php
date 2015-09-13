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
	 		echo '超时';exit;
	 	}
	 	
	 	$user = $User->getUserByEmail($u);
	 	//print_r($user);exit;
	 	if($hash != md5($t.$user['userid'].$user['salt'])){
	 		echo '连接错误';exit;
	 	}
	 	$User->IsActive = 1;
	 	$User->save();
	 }
}