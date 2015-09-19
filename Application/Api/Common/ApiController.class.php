<?php
namespace Api\Common;
use Think\Controller;
class ApiController extends Controller {

	protected $_code = 10000;
	protected $_message = '';
	protected $_data = array();
	protected $_errorCode = array();
	protected $_publicErrorCode = array(
		'success'=>10000,
		'err_system' => 10001, //系统错误
		'err_404'=>10002, //接口不存在
		'err_method'=>10003,//接口调用方式不正确
		'err_no_login'=>10004,//未登录

	);
	protected function isLogin(){
		if($this->getCurUserID()){
			return true;
		}
		$remember = cookie('remember');
		$rememberList = explode("_", $remember);
		$time = isset($rememberList[0])?$rememberList[0]:0;
		$userID = isset($rememberList[1])?$rememberList[1]:0;
		$hash = isset($rememberList[2])?$rememberList[2]:'';
		if(time() - $time > 86400){
			return false;
		}
		$User = M('User');
		$userData = $User->where("UserID = '%d' and Deleted = 0",$userID)->find();
		if(!$userData){
			return false;
		}
		if($hash != md5($time.$userID.$userData['salt'])){
			return false;
		}
		$this->setLogin($userData['userid']);
		return true;
	}
	/**
	 * 验证未登录则返回错误
	 */
	protected function needLogin(){
		if(!$this->isLogin()){
			$this->outPut('err_no_login','未登录');
		}
	}
	/**
	 * 设置登陆用户ID
	 * @param unknown_type $userID
	 */
	protected function setLogin($userID){
		session('userid',$userID);
	}
	/**
	 * 获取当前用户ID
	 * @return Ambigous <boolean, mixed, NULL, unknown>
	 */
	protected function getCurUserID(){
		return (int)session('userid');
	}
	
	protected function remember($userID,$salt){
		$time = time();
		cookie('remember',$time.'_'.$userID.'_'.md5($time.$userID.$salt),array('expire'=>86400*14));
	}
	/*protected function setCode($code){
		$this->_code = $code;
	}
	protected function getCode(){
		return $this->_code;
	}
	protected function setMessage($message){
		$this->_message = $message;
	}
	protected function getMessage(){
		return $this->_message;
	}
	protected function setData($data){
		return $this->_data = $data;
	}
	protected function getData(){
		return $this->_data;
	}*/

	protected function outPut($code=10000,$message='',$data=array()){
		if(!is_int($code)){
			$code = $this->getErrorCode($code);
		}
		//$this->setCode($code);
		//$this->setMessage($message);
		//$this->setData($data);
		$outData = array('code'=>$code,
						'message'=>$message,
						'data'=>$data);
		$this->ajaxReturn($outData);
	}
	/**
	 * 获取错误码
	 * @param unknown_type $key
	 * @return unknown
	 */
	protected function getErrorCode($key){
		$errcode = array_merge($this->_publicErrorCode,$this->_errorCode);
		return isset($errcode[$key])?$errcode[$key]:$errcode['err_system'];
	}
	/**
	 * 接口不存在
	 */
    public function _empty(){
		$this->outPut('err_404','接口不存在');
	}
	/**
	 * 调用Post/Get方法错误
	 */
	protected function methodError(){
		$this->outPut('err_method','系统调用方法错误');
	}
	/**
	 * 加密密码
	 * @param unknown_type $password
	 * @param unknown_type $salt
	 * @return string
	 */
	protected function encryPassword($password,$salt){
        return md5(md5($password).$salt);
    }
    
    protected function getAvata($userID,$type='small'){
    	$type = $type == 'small'?'small':'big';
    	if(file_exists(ROOT_PATH."Public/".$this->getAvataPath($userID).$userID.".".$type.".jpg")){
    		return $this->getAvataPath($userID).$userID.".".$type.".jpg";
    	}else{
    		return "avata/default.".$type.".jpg";
    	}
    }
    protected function getAvataPath($userID){
    	$userID=sprintf("%09d", $userID);
    	return "avata/".substr($userID,0,3)."/".substr($userID,3,3)."/";
    }
}