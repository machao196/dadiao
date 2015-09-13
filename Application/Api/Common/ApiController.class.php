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

	);
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
	protected function getErrorCode($key){
		$errcode = array_merge($this->_publicErrorCode,$this->_errorCode);
		return isset($errcode[$key])?$errcode[$key]:$errcode['err_system'];
	}
	
    public function _empty(){
		$this->outPut('err_404','接口不存在');
	}
	protected function methodError(){
		$this->outPut('err_method','系统调用方法错误');
	}
	protected function encryPassword($password,$salt){
        return md5(md5($password).$salt);
    }
}