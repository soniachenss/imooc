<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/31
 * Time: 20:18
 */
require_once ("conn.php");

$name = isset($_POST['nickname'])? $_POST['nickname'] : '';
$oldname = isset($_POST['oldname'])? $_POST['oldname'] : '';
$gender = isset($_POST['gender'])? $_POST['gender'] : '';
$signature = isset($_POST['signature'])? $_POST['signature'] : '未设置';

$file = $_FILES['fileimg'];
$finame = $file['name'];

$filename = time().substr($finame, strrpos($finame,'.'));//Generate a file name
$uploadfile = "./../src/assets/img/user/".$filename;//Specify the path
$type=array("jpg","gif","bmp","jpeg","png");//Allowed to upload
$thisType = strtolower(substr($finame,strrpos($finame,'.')+1));
$response = array();
if($_FILES['fileimg']['tmp_name']){
    if(in_array($thisType,$type)){
        $sql = mysql_query("UPDATE user_login set username='{$name}',gender='{$gender}',Signature='{$signature}',userImg ='{$filename}' WHERE username='{$oldname}'");
        if(move_uploaded_file($_FILES['fileimg']['tmp_name'], $uploadfile)){
            if($sql){
                $response['name'] = $name;
                $response['userImg'] = $filename;
                $response['isSuccess'] = true;
            }else{
                $response['isSuccess'] = false;  
            }
        }else{
            $response['isSuccess'] = false;
        }
    }else{
        $response['isSuccess'] = false;
    }
}else{
    $sql = mysql_query("UPDATE user_login set username='{$name}',gender='{$gender}',Signature='{$signature}' WHERE username='{$oldname}'");
    if($sql){
        $sqlpic = mysql_fetch_array(mysql_query("select userImg from user_login where username = '{$name}'"));
        $response['name'] = $name;
        $response['userImg'] = $sqlpic['userImg'];
        $response['isSuccess'] = true;
    }else{
        $response['isSuccess'] = false;
    }
}
echo json_encode($response);


?>


