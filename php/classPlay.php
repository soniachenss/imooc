<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/3
 * Time: 19:34
 */
require_once ("conn.php");

$id = $_GET['cid'];
$per = $_GET['per'];

$result_array = array();
$sqlname = mysql_query("select * from class_msg where classId = '$id'");
$row = mysql_fetch_array($sqlname,MYSQL_ASSOC);

$sqlname2 = mysql_query("select * from class_periods where classId = '$id'");
while($row2 = mysql_fetch_array($sqlname2,MYSQL_ASSOC)){
    $result_array[] = $row2;
}

$sqlname3 = mysql_query("select videoPath from class_periods where classId = '$id' and periods = '$per'");
$row3 = mysql_fetch_array($sqlname3,MYSQL_ASSOC);

$result = array($row,$result_array,$row3);
echo json_encode($result);

?>