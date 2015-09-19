<?php
namespace Api\Controller;
use Api\Common\ApiController;
class UserController extends ApiController {
	protected $_errorCode = array('err_old_password'=>20101,
								'err_repassword_not_same'=>20102,
								'err_password_format'=>20103,
								'err_newpassword_nochange'=>20104,
			);
	protected function _initialize(){
		$this->needLogin();
	}
	
    public function info(){
    	$User = M('User');
    	$userData = $User->where("UserID = '%d'",$this->getCurUserID())->find();
    	if(!$userData){
    		$this->outPut('err_no_login','未登录');
    	}
    	$userData['avata'] = $this->getAvata($this->getCurUserID(),'big');
    	$userData['avatasmall'] = $this->getAvata($this->getCurUserID(),'small');
    	unset($userData['password']);
    	unset($userData['salt']);
    	unset($userData['isactive']);
    	unset($userData['deleted']);
    	$this->outPut('success','SUCCESS',$userData);
    }
    
    public function set(){
    	if(IS_POST){
    		$User = M('User');
    		$userData = $User->where("UserID = '%d'",$this->getCurUserID())->find();
    		if(!$userData){
    			$this->outPut('err_no_login','未登录');
    		}
    		
    		//$User->UserID = $userData['userid'];
    		$data = array();
    		if(I("post.Sex") == 1 || I("post.Sex") == 2){
    			$data['Sex'] = I("post.Sex");
    		}
    		if(I("post.BirthYear") > 1900 && I("post.BirthYear") < date('Y',time())){
    			$data['BirthYear'] = (int)I("post.BirthYear");
    		}
    		if(in_array(I("post.BirthMonth"),array(1,2,3,4,5,6,7,8,9,10,11,12))){
    			$data['BirthMonth'] = I("post.BirthMonth");
    		}
    		if( I("post.BirthDay")>0 && I("post.BirthDay")<31){
    			$data['BirthDay'] = (int)I("post.BirthDay");
    		}
    		if(trim(I("post.City"))){
    			$data['City'] = htmlspecialchars(trim(I("post.City")));
    		}
    		if(trim(I("post.Province"))){
    			$data['Province'] = htmlspecialchars(trim(I("post.Province")));
    		}
    		if(trim(I("post.About"))){
    			$data['About'] = mb_substr(htmlspecialchars(trim(I("post.About"))),0,200);
    		}
    		if(!empty($data)){
    			$User->where('UserID=%d',$userData['userid'])->save($data);
    			$this->outPut('success','SUCCESS');
    		}else{
    			$this->outPut('err_system','系统错误');
    		}
    	}
    	$this->methodError();
    }
    public function repassword(){
    	if(IS_POST){
    		$User = M('User');
    		$userData = $User->where("UserID = '%d'",$this->getCurUserID())->find();
    		if($this->encryPassword(I("post.OldPassword"),$userData['salt']) != $userData['password']){
    			$this->outPut('err_old_password','旧密码错误');
    		}
    		$newPassword = I("post.NewPassword");
    		$rePassword = I("post.RePassword");
    		if($newPassword != $rePassword){
    			$this->outPut('err_repassword_not_same','两次输入密码不一致');
    		}
    		if(empty($newPassword) || strlen($newPassword) < 6 || strlen($newPassword) >16 ){
    			$this->outPut('err_password_format','密码应在6-16个字符之间');
    		}
    		$data = array('Password'=>$this->encryPassword($newPassword, $userData['salt']));
    		if($User->where('UserID=%d',$userData['userid'])->save($data)){
    			$this->outPut('success','SUCCESS');
    		}else{
    			$this->outPut('err_newpassword_nochange','新密码和原密码相同');
    		}
    		
    	}
    	$this->methodError();
    }
    public function uid(){
    	//header("content-type:text/html;charset=utf8");
    	//print_r($_SESSION);
    	if($this->isLogin()){
    		echo $this->getCurUserID();
    	}else{
    		echo '没有登录';
    	}
    }
}