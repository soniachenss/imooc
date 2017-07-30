<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/10
 * Time: 11:30
 */
require_once('conn.php');
quesGet();
function quesGet(){
    $tab = $_POST['tabName'];
    $result_array = array();
    $page=isset($_POST['page'])?intval($_POST['page']):1;
    $page_size=5;
    $pagestart=($page-1)*$page_size;
    $c='select count(*) from class_answer where class_questions.quesId = class_answer.quesId';
    if($tab == 'new'){
        $total=mysql_num_rows(mysql_query("select * from class_questions"));
        $sqlname = mysql_query("select *,($c) as askNum from class_questions Left Join user_login on class_questions.userID=user_login.id order by class_questions.quesId desc limit $pagestart,$page_size");
    }else if($tab=='wait'){
        $total=mysql_num_rows(mysql_query("select * from class_questions where quesId not in (select quesId from class_answer)"));
        $sqlname = mysql_query("select *,($c) as askNum from class_questions Left Join user_login on class_questions.userID=user_login.id where class_questions.quesId not in (select quesId from class_answer) order by class_questions.quesId desc limit $pagestart,$page_size");
    }else{
        $total=mysql_num_rows(mysql_query("select * from class_questions where quesId in (select quesId from class_answer)"));
        $sqlname = mysql_query("select *,($c) as askNum from class_questions Left Join user_login on class_questions.userID=user_login.id where class_questions.quesId in (select quesId from class_answer) order by class_questions.quesId desc limit $pagestart,$page_size");
    }
    $amount=ceil($total/$page_size);
    while($row = mysql_fetch_array($sqlname)){
        $result_array[] = $row;
    }
    $ar1 = array('amount'=>$amount,'page'=>$page);
    $array =array($result_array,$ar1);
    echo json_encode($array);
}
?>