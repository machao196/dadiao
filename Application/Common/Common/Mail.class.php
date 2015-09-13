<?php 
namespace Common\Common;
use Common\Common\PHPMailer;
class Mail{
	protected  $config; 
	public function __construct($config = array()){
		
		$this->config['from']     = C("MAIL.FROM");
		$this->config['smtp']     = C("MAIL.SMTP");
		$this->config['password'] = C("MAIL.PASSWORD");
		$this->config['auth']     = C("MAIL.AUTH");
		$this->config['charset']  = C("MAIL.CHARSET");
		$this->config['ishtml']   = C("MAIL.ISHTML");
		$this->config = array_merge($this->config,$config);
	}
	/**
	 * 发送邮件
	 * @param unknown_type $address
	 * @param unknown_type $title
	 * @param unknown_type $message
	 * @return boolean
	 */
	function SendMail($address,$title,$message){
		$mail= new PHPMailer(true);
		try {
			$mail->IsSMTP();
			$mail->CharSet=$this->config['charset'];
			$mail->AddAddress($address);
			$mail->Body=$message;
			$mail->From= $this->config['from'];//('MAIL_ADDRESS');
			$mail->FromName=$this->config['from'];
			$mail->Subject=$title;
			$mail->Host=$this->config['smtp'];//('MAIL_SMTP');
			$mail->SMTPAuth=$this->config['auth'];//C('MAIL_AUTH');
			$mail->Username=$this->config['from'];//C('MAIL_LOGINNAME');
			$mail->Password=$this->config['password'];//C('MAIL_PASSWORD');
			$mail->IsHTML($this->config['ishtml']);	
			//var_dump($mail);exit;		
			return($mail->Send());
		} catch (Exception $e) {
			return 0;
			//throw new Exception("邮件发送失败");
		}
	}
}
