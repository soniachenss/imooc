<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/10
 * Time: 11:30
 */
require_once('conn.php');
noteGet();
function noteGet(){
    $tab = $_POST['tabName'];
    $result_array = array();
    $page=isset($_POST['page'])?intval($_POST['page']):1;
    //每页展示条数
    $page_size=5;
    $pagestart=($page-1)*$page_size;

    $c='select count(*) from class_note_add where class_note_add.noteId = class_note.noteId';
    $total=mysql_num_rows(mysql_query("select * from class_note"));

    if($tab == 'new'){
        $sqlname = mysql_query("select *,($c) as noteAdd from class_note Left Join user_login on class_note.userID=user_login.id order by class_note.noteId desc limit $pagestart,$page_size");
    }else{
        $sqlname = mysql_query("select *,($c) as noteAdd from class_note Left Join user_login on class_note.userID=user_login.id order by class_note.view desc limit $pagestart,$page_size");
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