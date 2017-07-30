<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/10
 * Time: 11:30
 */
require_once('conn.php');
askComment();
function askComment(){
    $aid = $_POST['answerId'];

    $comment = array();
    $sqlc = mysql_query("select C.comment,A.username as cuser,A.userImg as cimg,B.username as taruser from class_questions_comment as C inner join user_login as A on C.userId=A.id inner join user_login as B on C.targetId=B.id where answerId = '{$aid}' order by QcommentId desc");
    while($commrow = mysql_fetch_array($sqlc)){
        $comment[] = $commrow;
    }

    $result = array($comment);
    echo json_encode($result);
}
?>