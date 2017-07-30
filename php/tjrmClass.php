<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/7
 * Time: 19:36
 */
require_once ("conn.php");
$result_array = array();

$msg = $_GET['msg'];
if($msg == 'tj'){
    tjClass();
}else{
    rmClass();
}

function tjClass(){
    $sqlname = mysql_query("select * from class_msg where classTj = 1");
    while($row = mysql_fetch_array($sqlname,MYSQL_ASSOC)){
        $result_array[] = $row;
    }
    echo json_encode($result_array);
}
function rmClass(){
    $sqlname = mysql_query("select classId,imgPath,className from class_msg order by classNum desc limit 0,4");
    while($row = mysql_fetch_array($sqlname,MYSQL_ASSOC)){
        $result_array[] = $row;
    }
    echo json_encode($result_array);
}

?>