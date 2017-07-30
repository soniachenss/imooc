<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/10
 * Time: 11:30
 */
require_once('conn.php');
quesAsk();
function quesAsk(){
    $qID = isset($_POST['qId'])?$_POST['qId']:'';;
    $result_array = array();
    $c='select count(*) from class_answer where class_questions.quesId = class_answer.quesId';

    $sqlname = mysql_query("select *,($c) as askNumber from class_questions Left Join user_login on class_questions.userID=user_login.id where class_questions.quesId= '{$qID}' ");

    while($row = mysql_fetch_array($sqlname)){
        $result_array[] = $row;
    }

    $result_array2 = array();

    $sqlname2 = mysql_query("select * from class_answer Left Join user_login on class_answer.userId=user_login.id where class_answer.quesId= '{$qID}' order by class_answer.answerId desc");

    while($row2 = mysql_fetch_array($sqlname2)){
        $result_array2[] = $row2;
    }
    $result = array($result_array,$result_array2);
    echo json_encode($result);
}

?>