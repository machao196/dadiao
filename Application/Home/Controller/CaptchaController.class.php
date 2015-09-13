<?php
namespace Home\Controller;
use Home\Common\WebController;
class CaptchaController extends WebController{
	 
	 public function index(){
	 	$config = array('fontSize' =>21,
	 					'expire'=>300,
	 					'imageW'=>150,
	 					'imageH'=>40,
	 					'useNoise'=>true,//是否添加噪点
	 					'useCurve'=>false,//是否使用混淆曲线
	 					'length'=>4);
	 	$Verify = new \Think\Verify($config);
	 	$Verify->entry();
	 }
}