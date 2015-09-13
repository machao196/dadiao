<?php
namespace Home\Controller;
use Home\Common\ApiController;
use Common\Common\Mail;
class LoginController extends ApiController {
	
    public function index(){
        $mail = new Mail(array('ishtml'=>true));
        $mail->SendMail('718281962@qq.com','激活邮件','<b>激活邮件</b>：请你点击下面的连接：。');
    	if(IS_POST){
    		$account = I("post.Account");
    		$password = I("post.Password");
    		$Remember = I("post.Remember");
    		$User = D('User');
    		$User->select();
    	}
    	$this->methodError();
    }
}