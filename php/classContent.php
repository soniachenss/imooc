<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/23
 * Time: 11:37
 */
require_once('conn.php');

//$classItem = isset($_GET['classItem'])?$_GET['classItem']:'hotClass' ;
$classItem = $_GET['classItem'];
ClassItem($classItem);
function ClassItem($classItem){
    $result_array = array();
    if($classItem == "hotClass"){
        $sqlname = mysql_query("select * from class_msg order by classNum desc limit 0,4");
    }elseif ($classItem == "freeClass"){
        $sqlname = mysql_query("select * from class_msg where classPrice=0 limit 4");
    }else{
        $sqlname = mysql_query("select * from class_msg order by id desc limit 4");
    }
    while($row = mysql_fetch_array($sqlname,MYSQL_ASSOC)){
        $result_array[] = $row;
    }
    echo json_encode($result_array);
}

//function freeClass(){
//    $result_array = array();
//    $sqlname = mysql_query("select * from class_msg where classPrice=0 limit 4");
//    while($row = mysql_fetch_array($sqlname,MYSQL_ASSOC)){
//        $result_array[] = $row;
//    }
//    echo json_encode($result_array);
//}
//function newClass(){
//    $result_array = array();
//    $sqlname = mysql_query("select * from class_msg order by id desc limit 4");
//    while($row = mysql_fetch_array($sqlname,MYSQL_ASSOC)){
//        $result_array[] = $row;
//    }
//    echo json_encode($result_array);
//}
?>