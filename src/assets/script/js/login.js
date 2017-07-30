/**
 * Created by Administrator on 2017/2/7.
 */
$(function(){
    function setCookie(name,value) {
        var Days = 10;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    };
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }
        else{
            return null;
        }
    };
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
    if(getCookie('username')){
        $(".login-text").html("<a href='./../web/page-personal.html'><img src='./../src/assets/img/user/"+getCookie('userImg')+"' alt=''>"+getCookie('username'))+"</a>";
        $('.login-success,.login-out').show();
        $(".imooc-login").unbind().css('color','#f63');
    }else{
        $(".login-text").html("登录");
        $(".user-msg-item").hide();
    }
    $(".login-out").on('click',function(){
        $('#delcfmModel').modal();
        $(".btn-loginout").on('click',function(){
                delCookie('username');
                delCookie('userImg');
                var str=window.location.href,
                    pers=new RegExp('page-personal.html'),
                    succ=new RegExp('success.html'),
                    asq=new RegExp('page-ask-questions.html'),
                    cla=new RegExp('page-class.html'),
                    noteC=new RegExp('page-note-content.html');
            var test = pers.test(str) || succ.test(str)||asq.test(str)||cla.test(str)||noteC.test(str);
            if(test){
                    window.location.href = './../web/index.html';
                }else{
                    location.reload();
                }
        })
    });
    $(".input-name").blur(function() {
        var reg_name = /\w{3,12}/,
            $username = $(this).val();
        if($username==''||!reg_name.test($username)){
            $(".error-remind-username").html('*请输入3-12位中英文、数字、下划线组成的用户名');
        }else{
            $(".error-remind-username").html('');
        }
    }).focus(function(){$(".error-remind-username").html('');})
    $(".input-pass").blur(function() {
        var reg_pass = /^[^\s]{6,16}$/,
            $pass  = $(this).val();
        if($pass=='' ||!reg_pass.test($pass)){
            $(".error-remind-pass").html('*请输入6-16位密码，区分大小写，不能使用空格！');
        }else{
            $(".error-remind-pass").html('');
        }
    }).focus(function(){$(".error-remind-pass").html('');})
    $("#onsubmit").on('click',function(){
        var $username = $("#username").val(),
            $pass  = $("#pass").val();
        if($username=='' || $pass==''){
            $(".error-remind-pass").html("*请输入完整哦~");
            return false;
        }
        else{
            var datas={
                username:$username,
                password:$pass
            };
            $.ajax({
                url:'./../php/logincheck.php',
                type:'post',
                dataType:'json',
                data:datas,
                success:function(result){
                    if(result=='nameerror'){
                        $(".error-remind-username").html('*用户名不存在');
                    }else if(result=="passerror"){
                        $(".error-remind-pass").html("*密码错误，请重新输入");
                    }else{
                        setCookie('username',result.name);
                        setCookie('userImg',result.img);
                        $(".login-text").html("<a href='./../web/page-personal.html'><img src='./../src/assets/img/user/"+getCookie('userImg')+"' alt=''>"+getCookie('username'))+"</a>";
                        $(".login-success,.login-out").show();
                        $(".imooc-login").unbind().css('color','#f63');
                        $(".imooc-login-mask,.imooc-login-box").fadeOut();
                    }
                }
            })
        }return false;
    })
    $("#getsubmit").click(function(){
        var reg_name = /\w{3,12}/,
            reg_pass = /^[^\s]{6,16}$/;
        var $username = $("#getusername").val(),
            $pass  = $("#getpass").val(),
            $repass = $("#getrepass").val();

        if($username=='' || $pass==''){
            $(".error-remind-content").html("用户名及密码不能为空");
            return false;
        }else if(!reg_name.test($username)){
            $(".error-remind-username").html('*请输入3-12位中英文、数字及下划线！');
            return false;
        }else if(!reg_pass.test($pass)){
            $(".error-remind-pass").html('*请输入6-16位密码，区分大小写，不能使用空格！');
            return false;
        }else if($repass != $pass){
            $(".error-remind-content").html('*两次密码不一致，请重新输入');
            return false;
        }else{
            var datas={
                username:$username,
                password:$pass
            }
            $.ajax({
                url:'./../php/regcheck.php',
                type:'post',
                data:datas,
                dataType:'json',
                success:function(reslut){
                    if(reslut=="repeat"){
                        alert("该用户名已存在");
                    }else if(reslut=='success'){
                        setCookie('username',$username);
                        setCookie('userImg','user01.jpg');
                        $(".login-text").html("<a href='./../web/page-personal.html'><img src='./../src/assets/img/user/"+getCookie('userImg')+"' alt=''>"+getCookie('username'))+"</a>";
                        $(".login-success,.login-out").show();
                        $(".imooc-login").unbind().css('color','#f63');
                        $(".imooc-login-mask,.imooc-login-box").fadeOut();
                    }
                    else{
                        alert('false');
                    }
                }
            })
        }return false;
    })
})


