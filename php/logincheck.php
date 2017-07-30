<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/2
 * Time: 15:15
 */
require_once('conn.php');
$username=$_REQUEST['username'];
$pass = $_REQUEST['password'];
isLogin($username,$pass);
function isLogin($name,$pwd){
    $arrays = array(array('one'=>'nameerror','two'=>'passerror','three'=>'success'));
    $sqlname = mysql_query("select count(*) from user_login where username= '$name'");
    $row = mysql_fetch_row($sqlname);
    $num = $row[0];
    if(!$num){
        echo json_encode($arrays[0]['one']);//不存在返回nameerror
    }else{
        $sqlpass = mysql_query("select password from user_login where username='$name'");
        $passarray = mysql_fetch_row($sqlpass);
        $passval = $passarray[0];
        if($passval!=$pwd){
            echo json_encode($arrays[0]['two']);//不正确返回passerror
        }
        else{
            $sqlimg = mysql_query("select userImg from user_login where username='$name'");
            $imgarray = mysql_fetch_row($sqlimg);
            $imgval = $imgarray[0];
            $result_array = array('name'=>$name,'img'=>$imgval);
            echo json_encode($result_array);
        }
    }
}

?>