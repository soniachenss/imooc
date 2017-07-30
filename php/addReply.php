<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/16
 * Time: 13:25
 */
require_once ("conn.php");

$uname = isset($_POST['uname'])?$_POST['uname']:'';
$tarname = isset($_POST['tarUser'])?$_POST['tarUser']:'';
$comment =  isset($_POST['comment'])?$_POST['comment']:'';
$aid = isset($_POST['aid'])?$_POST['aid']:'';

$user = mysql_query("select id from user_login where username = '$uname'");
$userId = mysql_fetch_array($user,MYSQL_ASSOC)['id'];

$taruser = mysql_query("select id from user_login where username = '$tarname'");
$tarId = mysql_fetch_array($taruser,MYSQL_ASSOC)['id'];

if($_POST['type']=='note'){
    $sql = mysql_query("insert into class_note_comment(addId,userId,targetId,comment) values('$aid','$userId','$tarId','$comment');");
}else{
    $sql = mysql_query("insert into class_questions_comment(answerId,userId,targetId,comment) values('$aid','$userId','$tarId','$comment');");
}
if($sql){
    echo json_encode('success');
}else{
    echo json_encode('fail');
}




?>