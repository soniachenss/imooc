<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/2
 * Time: 19:13
 */
require_once('conn.php');
$id = $_GET['cid'];
Detail($id);
function Detail($id){
    $result_array = array();
    $result_array2 = array();
    $sqlname = mysql_query("select * from class_msg where classId = '$id'");
    $row = mysql_fetch_array($sqlname);
    $sqlname2 = mysql_query("select * from class_periods where classId = '$id'");
    while($row2 = mysql_fetch_array($sqlname2,MYSQL_ASSOC)){
        $result_array[] = $row2;
    }
    $c='select count(*) from class_answer where class_questions.quesId = class_answer.quesId';
    $sqlname3 = mysql_query("select *,($c) as askNum from class_questions Left Join user_login on class_questions.userID=user_login.id where class_questions.classID = '$id' order by class_questions.quesId desc");
    while($row3 = mysql_fetch_array($sqlname3,MYSQL_ASSOC)){
        $result_array2[] = $row3;
    }
    $result=array('classMsg'=>$row,'classPeriods'=>$result_array,'classAsk'=>$result_array2);
    echo json_encode($result);
}


?>