<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/31
 * Time: 20:18
 */
require_once ("conn.php");
$name = isset($_POST['name'])? $_POST['name'] : '';
$opass = isset($_POST['oldp'])? $_POST['oldp'] : '';
$npass = isset($_POST['newp'])? $_POST['newp'] : '';
$rpass = isset($_POST['renewp'])? $_POST['renewp'] : '';

$passmsg = array();

if($opass==''||$npass==''||$rpass==''){
    $passmsg['isSuccess'] = 'false';
    $passmsg['error'] = 'notnullrror';
}else{
    $sqlpass = mysql_query("select password from user_login where username='{$name}'");//返回一个句柄；
    $passarray = mysql_fetch_row($sqlpass);//获得一个只有一行数据的数族
    $passval = $passarray[0];//这里才是对应用户的密码
    //判断该用户的密码是否正确
    if($passval!=$opass){
        $passmsg['isSuccess'] = false;
        $passmsg['error'] = 'passerror';
    }else{
        $sqlupdate = mysql_query("update user_login set password = '{$npass}' where username = '{$name}'");
        if($sqlupdate){
            $passmsg['isSuccess'] = true;
        }else{
            $passmsg['isSuccess'] = false;
            $passmsg['error'] = 'inserterror';
        }
    }
}
 echo json_encode($passmsg);

?>


