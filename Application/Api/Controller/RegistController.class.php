<?php
namespace Api\Controller;
use Api\Common\ApiController;
use Common\Common\Mail;
class RegistController extends ApiController {
	protected $_errorCode = array(
        'err_regist_account_exist'=>20021,
        'err_regist_account_format'=>20022,
        'err_regist_password_format'=>20023,
        'err_regist_captcha'=>20024,
        'err_regist_repassword'=>20025);

    protected function  isMail($Argv){ 
        $RegExp='/^[a-z0-9][a-z\.0-9-_]+@[a-z0-9_-]+(?:\.[a-z]{0,3}\.[a-z]{0,2}|\.[a-z]{0,3}|\.[a-z]{0,2})$/i'; 
        return preg_match($RegExp,$Argv)?$Argv:false; 
    } 
    protected function isMobile($Argv){
        $RegExp='/^(?:13|15|18)[0-9]{9}$/';
        return preg_match($RegExp,$Argv)?$Argv:false;  
    }
    protected function get_unique_id($length=32, $pool="")
{
    if($pool == "") $pool .= "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    mt_srand ((double) microtime() * 1000000);
    $unique_id = "";
    for ($index = 0; $index < $length; $index++) {
        $unique_id .= substr($pool, (mt_rand()%(strlen($pool))), 1);
    }
    return $unique_id;
}
    public function index(){
    	
    	if(!IS_POST){
            $this->methodError();
        }
    	$account = I("post.Account");
    	$password = I("post.Password");
        $RePassword = I("post.RePassword");
    	$Captcha = I("post.Captcha");
        $verify = new \Think\Verify(); 
        if(!$verify->check($Captcha)){
          //  $this->outPut('err_regist_captcha','验证码不正确');
        }
        if(!$this->isMobile($account) && !$this->isMail($account)){
            $this->outPut('err_regist_account_format','手机或邮箱格式不正确');
        }
        if(empty($password) || strlen($password) < 6 || strlen($password) >20 ){
           $this->outPut('err_regist_password_format','密码应在6-20个字符之间');
        }
        if($RePassword != $password){
            $this->outPut('err_regist_repassword','密码和确认密码不相同');
        }
    	$User = D('Common/User');
    	if($User->getUserByAccount($account)){
            $this->outPut('err_regist_account_exist','账号已被注册');
        }
        $salt = $this->get_unique_id(10);
    	$User->create();
        $User->Salt = $salt;
        $User->Password = $this->encryPassword($password,$User->Salt);
        $isMobile = false;
        if($this->isMobile($account)){
            $User->Mobile = $account;
            $isMobile = true;
        }else{
            $User->Email = $account;
        }
        $User->Sex = 0;
    	$User->IsActive = 0;
        $User->CreateTime = time();
        $User->Delete = 0;
        $userID = $User->add();
        if(!$userID){
        	$this->outPut('err_system','插入用户失败');	
        }
        if($isMobile){
        	
        }else{
        	//发送激活邮件
        	$this->activeMail($account,$userID,$salt);
        }
        $this->outPut();
    }

    protected function activeMail($email,$userID,$salt){
    	$time = time();
        $url = APP_DOMAIN."home/active/index/t/".$time.'/u/'.$email.'/hash/'.md5($time.$userID.$salt);
        try{
            $mail = new Mail(array('ishtml'=>true));
            $mail->SendMail($email,'注册激活邮件——搭调网','<b>激活邮件</b>：请你点击下面的连接：'.$url);
        }catch(\Exception $err){

        }
    }

}