<?php
namespace Api\Controller;
use Api\Common\ApiController;
class CategoryController extends ApiController {
	protected $_errorCode = array('err_old_password'=>20101,
								'err_repassword_not_same'=>20102,
								'err_password_format'=>20103,
								'err_newpassword_nochange'=>20104,
			);
	protected function _initialize(){
		$this->needLogin();
	}
	
    public function index(){
        $CatModel = M("category");
        $list = $CatModel->select();
        $catData = array();
        foreach($list as $item){
            $cid = $item['categoryid'];
            $pid = $item['pcategory'];
            if($pid == 0){
                $data = $item;
                $data['sub'] = array();
                foreach($list as $subItem){
                    if($subItem['pcategory'] == $cid){
                        $data['sub'][] = $subItem;
                       
                    }
                }
                $catData[] = $data;
            }
        }
        $this->outPut('success','SUCCESS',$catData);
    }
}