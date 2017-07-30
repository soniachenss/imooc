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
    $tab = $_POST['noteId'];
    $rs=mysql_query("UPDATE class_note SET view = view +1 WHERE noteId = '{$tab}'");
    $array = array();
    $sqladd = mysql_query("select * from class_note_add left join user_login on class_note_add.userId=user_login.id where noteId = '{$tab}'");
    while($addrow = mysql_fetch_array($sqladd)){
        $array[] = $addrow;
    }
    $c=count($array);

    $sqlname = mysql_query("select * from class_note Left Join user_login on class_note.userID=user_login.id where noteId = '{$tab}' ");

    $row = mysql_fetch_array($sqlname);

    $result = array($row,$array,$c);
    echo json_encode($result);
}
?>