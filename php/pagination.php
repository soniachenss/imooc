<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/7
 * Time: 15:52
 */

require_once('conn.php');

$page=isset($_POST['page'])?intval($_POST['page']):1;
$cate=$_POST['category'];
$page_size=6;//每页展示条数
$pagestart=($page-1)*$page_size;//下页起始条
if($cate==''||$cate=='all'){
    $total=mysql_num_rows(mysql_query("select * from class_msg")); //总条数
    $sql="select * from class_msg order by id desc limit $pagestart,$page_size";
}else{
    $total=mysql_num_rows(mysql_query("select * from class_msg where category = '$cate'"));
    $sql="select * from class_msg where category = '$cate' order by id desc limit $pagestart,$page_size";
}
$amount=ceil($total/$page_size);//页数
$query=mysql_query($sql);
while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
    $result_array[] = $row;
}
$array =array($result_array,$amount,$page);
echo json_encode($array);
?>