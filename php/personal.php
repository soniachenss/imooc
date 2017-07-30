<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/10
 * Time: 11:30
 */
require_once('conn.php');
personalDeal();
function personalDeal(){
    $name = isset($_POST['username'])?$_POST['username']:'';
    
    $result_answer = array();
    $result_ask = array();
    $result_note = array();

    $c='select count(*) from class_answer where class_questions.quesId = class_answer.quesId';

    $sqluser=mysql_query("select * from user_login where username = '{$name}'");
    $rowuser = mysql_fetch_array($sqluser);

    $sqlanswer = mysql_query("select B.answer,A.userImg,C.keyword,C.quesTitle,C.quesId from class_questions as C inner join user_login as A on C.userID = A.id inner join class_answer as B on C.quesId = B.quesId where B.userId in (select id from user_login where username='{$name}')");
    while($rowanswer = mysql_fetch_array($sqlanswer)){
        $result_answer[] = $rowanswer;
    }

    $sqlask = mysql_query("select *,($c) as ansNum from class_questions Left Join user_login on class_questions.userID=user_login.id where class_questions.userID in (select id from user_login where username='{$name}')");
    while($rowask = mysql_fetch_array($sqlask)){
        $result_ask[] = $rowask;
    }

    $d = 'select count(*) from class_note_add where class_note_add.noteId = class_note.noteId';
    $sqlnote = mysql_query("select *,($d) as noteAdd from class_note Left Join user_login on class_note.userID=user_login.id where class_note.userID in (select id from user_login where username='{$name}')");
    while($rownote = mysql_fetch_array($sqlnote)){
        $result_note[] = $rownote;
    }
     
    $result = array('msg'=>$rowuser,'answer'=>$result_answer,'ask'=>$result_ask,'note'=>$result_note);

    echo json_encode($result);
    
}
?>