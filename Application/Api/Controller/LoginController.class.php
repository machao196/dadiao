<?php
namespace Api\Controller;
use Api\Common\ApiController;
class LoginController extends ApiController {
	protected $_errorCode = array(
			'err_login_account_not_exist'=>20011,
			'err_login_wrong_password'=>20012,
			'err_login_account_not_actived'=>20013);
	
    public function index(){
    	if(IS_POST){
    		$account = I("post.Account");
    		$password = I("post.Password");
    		$Remember = I("post.Remember");
    		$User = M('User');
    		$userData = $User->where("(Email = '%s' or Mobile = '%s') and Deleted = 0",array($account,$account))->find();
    		if(!$userData){
    			$this->outPut('err_login_account_not_exist','账号不存在');
    		}
    		if($userData['password'] != $this->encryPassword($password,$userData['salt'])){
    			$this->outPut('err_login_wrong_password','密码错误');
    		}
    		if(!isset($userData['isactive']) || $userData['isactive'] == 0){
    			$this->outPut('err_login_account_not_actived','账号未激活');
    		}
    		if($Remember == 1){
    			$this->remember($userData['userid'], $userData['salt']);
    		}
    		$this->setLogin($userData['userid']);
    		
    		$userData['avata'] = $this->getAvata($this->getCurUserID(),'big');
    		$userData['avatasmall'] = $this->getAvata($this->getCurUserID(),'small');
    		unset($userData['password']);
    		unset($userData['salt']);
    		unset($userData['isactive']);
    		unset($userData['deleted']);
    		$this->outPut('success','SUCCESS',$userData);
    	}
    	$this->methodError();
    }
    
    public function uid(){
    	//header("content-type:text/html;charset=utf8");
    	//print_r($_SESSION);
    	if($this->isLogin()){
    		echo $this->getCurUserID();
    	}
    	else{
    		echo '没有登录';
    	}
    }
}