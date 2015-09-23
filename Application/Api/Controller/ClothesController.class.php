<?php
namespace Api\Controller;
use Api\Common\ApiController;
class ClothesController extends ApiController {
	protected $_errorCode = array('err_old_password'=>20101,
								'err_repassword_not_same'=>20102,
								'err_password_format'=>20103,
								'err_newpassword_nochange'=>20104,
			);
	protected function _initialize(){
		$this->needLogin();
	}
	
    public function lists(){
        $MinPrice = I("post.MinPrice");
        $MaxPrice = I("post.MaxPrice");
        $Offset = I("post.Offset",1);
        $Rows   = I("post,Rows",10);
        $catID = I("post.CatID");
        $catList = array();
        if($catID){
            $CatModel = M("category");
            $subCatList = $CatModel->where("PCategory = '%d'",$catID)->select();
            if($subCatList){
                foreach($subCatList as $subcat){
                   $catList[] = $subcat['CategoryID'];
                }
            }else{
                $catList = array($catID);
            }
        }
        $where = array();
    	$humanParamModel = M('humanparameters');
        $humanParamList = $humanParamModel->where("HumanID = '%d'",$this->getCurUserID())->select();
        
        foreach($humanParamList as $item){
            $pName = $item['hpname'];
            $pValue = $item['hpvalue'];
            switch ($pName) {
                case '身高':
                    $pValue  = $this->getHeight($pValue);
                    break;
                case '体重':
                    $pValue  = $this->getWeight($pValue);
                    break;
            }

            $where[] = " (CanShuMingCheng = '$pName' and CanShuNeiRong = '$pValue') ";
        }
    	if(!empty($where)){
            $whereStr = "( " . implode(" or ", $where) . " ) ";
            if($MinPrice){
                $whereStr .= " and C.Price >= $MinPrice ";
            }
            if($MaxPrice){
                 $whereStr .= " and C.Price <= $MaxPrice ";
            }
            if($catList){
                $whereStr .= " and C.CategoryID in ('".implode("','", $catList)."') ";   
            }
            //print_r($where);exit;
            $clothesparameterModel = M("clothesparameter");
            $subSql = "select C.*,sum(JiFen) as score from clothes as C inner join clothesparameter as CP on(C.ClothesID = CP.ClothesID) where $whereStr group by C.ClothesID";
            
            $sql = "select * from ($subSql) as A order by score desc limit $Offset,$Rows";
            echo $sql;exit;
            $list = $clothesparameterModel->query($sql);
            $countSql = "select count(1) as count from ($subSql) as A";
            $count = $clothesparameterModel->query($countSql);
            $count = $count[0]['count'];
            $reData = array('list'=>$list,
                    'count'=>$count,
                    'minprice'=>$MinPrice,
                    'maxprice'=>$MaxPrice,
                    'catid'=>$CatID,
                    'offset'=>$Offset,
                    'rows'=>$Rows);
            $this->outPut('success','SUCCESS',$reData);
        }
    }
    protected function getHeight($pvalue){
        if($pvalue < 160){
            return '160以下';
        }elseif($pvalue >= 161 && $pvalue <= 165){
            return '161-165';
        }elseif($pvalue >= 166 && $pvalue <= 169){
            return '166-169';
        }else{
            return '170以上';
        }
    }

    protected function getWeight($pvalue){
        if($pvalue <= 95){
            return '95斤以下';
        }elseif($pvalue >= 96 && $pvalue <= 110){
            return '96-110斤';
        }elseif($pvalue >= 96 && $pvalue <= 110){
            return '110-130斤';
        }elseif($pvalue >= 96 && $pvalue <= 110){
            return '130-150斤';
        }else{
            return '150斤以上';
        }
    }
    
}