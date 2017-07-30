<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/2
 * Time: 19:14
 */
@header("content-type:text/html;charset=utf8");
$conne = mysql_connect("localhost","root","")or die("数据库用户名密码错误".@mysql_error());
$select =mysql_select_db("imooc",$conne);
$utf = mysql_query("set names utf8");
?>