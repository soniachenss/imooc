<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/2
 * Time: 15:58
 */
require_once('conn.php');

$username= $_REQUEST['username'];
$pass = $_REQUEST['password'];
isReg($username,$pass);
function isReg($username,$pass){
    $arrays = array(array("one"=>'repeat','two'=>'success'));
    $sql  = mysql_query("select count(*) from user_login where username='$username'");
    $row = mysql_fetch_row($sql);
    $num = $row[0];
    if($num == 1){
        echo json_encode($arrays[0]['one']);
    }else{
        mysql_query("insert into user_login(username,password) values('$username','$pass')");
        echo json_encode($arrays[0]['two']);
    }
}

?>