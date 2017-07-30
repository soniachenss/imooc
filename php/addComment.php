<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/16
 * Time: 13:25
 */
require_once ("conn.php");

$uname = isset($_POST['uname'])?$_POST['uname']:'';
$content =  isset($_POST['content'])?$_POST['content']:'';
$noteId = isset($_POST['noteId'])?$_POST['noteId']:'';

$user = mysql_query("select id from user_login where username = '$uname'");
$userId = mysql_fetch_array($user,MYSQL_ASSOC)['id'];

$sql = mysql_query("insert into class_note_add(noteId,addContent,userId) values('$noteId','$content','$userId');");
if($sql){
    echo json_encode('success');
}else{
    echo json_encode('fail');
}

?>