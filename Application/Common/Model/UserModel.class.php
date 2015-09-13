<?php

namespace Common\Model;
use Think\Model;
class UserModel extends Model{
	//protected $tablePrefix = '';
	protected $tableName = 'user';

	public function getUserByAccount($account){
		$user = $this->field("UserID,Account,Password,Salt,IsActive,Delete")
				->where("Email = '$account' OR Mobile = '$account'")
				->find();
		return $user;
	}
	public function getUserByEmail($email){
		$user = $this->field("UserID,Account,Salt,IsActive,Delete")
				->where("Email = '$email'")
				->find();
		return $user;
	}
}