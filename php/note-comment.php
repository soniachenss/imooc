<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/10
 * Time: 11:30
 */
require_once('conn.php');
noteComment();
function noteComment(){
    $nid = $_POST['addId'];
    $comment = array();
    $sqlc = mysql_query("select C.comment,A.username as cuser,A.userImg as cimg,B.username as taruser from class_note_comment as C inner join user_login as A on C.userId=A.id inner join user_login as B on C.targetId=B.id where addId = '{$nid}' order by commentId desc");
    while($commrow = mysql_fetch_array($sqlc)){
        $comment[] = $commrow;
    }
    $result = array($comment);
    echo json_encode($result);
}
?>