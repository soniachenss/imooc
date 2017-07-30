<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/16
 * Time: 13:25
 */
require_once ("conn.php");

$content = $_POST['content'];
$username = $_POST['username'];
$qId = $_POST['qId'];

$user = mysql_query("select id from user_login where username = '$username'");
$userId = mysql_fetch_array($user,MYSQL_ASSOC)['id'];

$sql = mysql_query("insert into class_answer(quesId,userId,answer) values('$qId','$userId','$content');");
if($sql){
    echo 'success';
}else{
    echo 'fail';
}

?>