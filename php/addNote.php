<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/16
 * Time: 13:25
 */
require_once ("conn.php");

$title = isset($_POST['title'])?$_POST['title']:'';
$content = isset($_POST['content'])?$_POST['content']:'';
$lb = isset($_POST['lb'])?$_POST['lb']:'';
$cid = isset($_POST['cid'])?$_POST['cid']:'';
$username = isset($_POST['username'])?$_POST['username']:'';
$tb = isset($_POST['tb'])?$_POST['tb']:'';

$user = mysql_query("select id from user_login where username = '$username'");
$userId = mysql_fetch_array($user,MYSQL_ASSOC)['id'];

if($tb=='note'){
    $isOri = $_POST['isOri'];
    $Original = ($isOri == 'true')?1:0;
    $sql = mysql_query("insert into class_note(userId,keyword,noteTitle,noteContent,isOriginal) values('$userId','$lb','$title','$content','$Original');");
    if($sql){
        $sqlquesID = mysql_query("select max(noteId) as id from class_note where userID = '$userId'");
        $noteID = mysql_fetch_array($sqlquesID,MYSQL_ASSOC);
        $result_array = array('msg'=>'success','id'=>$noteID);
        echo json_encode($result_array);
    }else{
        echo json_encode(array('msg'=>'fail'));
    }
}else{
    if($cid != ''){
        $sql = mysql_query("insert into class_questions(classID,userID,keyword,quesTitle,quesContent) values('$cid','$userId','$lb','$title','$content');");
    }else{
        $sql = mysql_query("insert into class_questions(userID,keyword,quesTitle,quesContent) values('$userId','$lb','$title','$content');");
    }
    if($sql){
        $sqlquesID = mysql_query("select max(quesId) as id from class_questions where userID = '$userId'");
        $quesID = mysql_fetch_array($sqlquesID,MYSQL_ASSOC);
        $result_array = array('msg'=>'success','id'=>$quesID);
        echo json_encode($result_array);
    }else{
        echo json_encode(array('msg'=>'fail'));
    }

}

?>