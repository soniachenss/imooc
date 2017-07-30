/**
 * Created by Administrator on 2017/3/21.
 */
$(function(){
    $(".login-text a").attr('href','javascript:void(0);');
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }
        else{
            return null;
        }
    };
    var name = getCookie('username');
    $(".left-username").html(name);
    $(".old-name").val(name);
    $(".input-name").blur(function() {
        var reg_name = /\w{3,12}/,
            $username = $(this).val();
        if($username==''||!reg_name.test($username)){
            $(".error-remind").html('*请输入3-12位中英文、数字、下划线组成的用户名');
        }else{
            $(".error-remind").html('');
        }
    }).focus(function(){$(".error-remind-username").html('');})

    $(".old-pass").blur(function(){
        var $pass  = $(this).val();
        if($pass==''){
            $(".remind-o").html('*请输入6-16位密码');
        }else{
            $(".remind-o").html('');
        }
    }).focus(function(){
        $(".remind-o").html('');
    })
    $(".new-pass").blur(function(){
        var reg_pass = /^[^\s]{6,16}$/,
            $pass  = $(this).val();
        if($pass=='' ||!reg_pass.test($pass)){
            $(".remind-p").html('*请输入6-16位密码，区分大小写，不能使用空格！');
        }else{
            $(".remind-p").html('');
        }
    }).focus(function(){
        $(".remind-p").html('');
    })
    $(".re-pass").blur(function(){
        var $pass = $(".new-pass").val(),
            $repass  = $(this).val();
        if($pass!=$repass){
            $(".remind-rp").html('*密码不一致，请确认');
        }else{
            $(".remind-rp").html('');
        }
    }).focus(function(){
        $(".remind-rp").html('');
    })

    $("#fileimg").change(function(){
        var objUrl = getObjectURL(this.files[0]) ;
        if (objUrl) {
            $("#img").attr("src", objUrl) ;
        }
    }) ;
     //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    $(".msg-modify").on('click',function(){
        var reg_name = /\w{3,12}/,
            $username = $(".input-name").val();
        if($username!=''||!reg_name.test($username)){
            fsubmit();
        }else{
            // alert(1);
            return false;
        }

    })
    $(".pass-btn button").on('click',function(){
        var oldp = $(".old-pass").val(),
            newp = $(".new-pass").val(),
            renewp = $(".re-pass").val();
        if(oldp ==''|| newp=='' || renewp==''){
            return false;
        }else if(newp != renewp){
            return false;
        }else{
            $.ajax({
                url: './../php/passwordDeal.php',
                type: 'post',
                data: {
                    name: name,
                    oldp: oldp,
                    newp: newp,
                    renewp: renewp
                },
                dataType: 'json',
                success: function(data){
                    if(data['isSuccess']){
                        $('body').append(
                            "<div class='alert-box'>提交成功！</div>"
                        )
                        setTimeout(function () {
                            $(".alert-box").remove();
                            location.reload();
                        }, 2000)
                    }else{
                        if(data['error']=='passerror'){
                            $('body').append(
                                "<div class='alert-box'>原密码错误，请重新填写</div>"
                            )
                        }else if(data['error']=='notnullerror'){
                            $('body').append(
                                "<div class='alert-box'>密码不能为空，提交失败！</div>"
                            )
                        }else{
                            $('body').append(
                                "<div class='alert-box'>密码重置失败！</div>"
                            )
                        }
                        setTimeout(function () {
                            $(".alert-box").remove();
                        }, 2000)
                    }
                }
            })
        }
    })
    function fsubmit(){
        var data = new FormData($('#msg-modify-form')[0]);
        $.ajax({
            url: './../php/messageUpdate.php',
            type: 'POST',
            data: data,
            dataType: 'json',
            async: false,
            cache: false,
            processData: false,
            contentType: false
        }).done(function(ret){
            if(ret['isSuccess']){
                setCookie('username',ret['name']);
                setCookie('userImg',ret['userImg']);
            }else{
                alert('提交失敗');
            }
        });
        return false;
    }

    $.ajax({
        url: './../php/personal.php',
        type: 'post',
        data: {
            username: name
        },
        dataType: 'json',
        success: function(data){
            $('.user-div-img img,.nav-user img').attr('src','./../src/assets/img/user/'+data.msg.userImg);
            $(".input-name").val(data.msg.username);
            $(":radio[name='gender'][value='"+data.msg.gender+"']").attr("checked",true);
            $(".input-sign").html(data.msg.Signature);
            if(data.answer.length>0){
                for(var x in data.answer) {
                    $('.right-answer').append(
                        "<div class='ask-question'>" +
                        "<div class='ask-ques-img'>" +
                        "<img src='../src/assets/img/user/" + data.answer[x].userImg + "' alt=''>" +
                        " </div>" +
                        " <a href='page-ask-solve.html?id="+data.answer[x].quesId+"'>" +
                        "<div class='ask-ques-key'>关键字：<span class='key-value'>"+data.answer[x].keyword+"</span></div><div class='ask-ques-title'>" +
                        "<p class='ques-title'>"+data.answer[x].quesTitle+"</p>" +
                        " </div>" +
                        "</a>" +
                        "<div class='ques-popularity'>" +
                        "<h5 class='my-answer'>我的回答</h5>" +
                        "<div class='answer-content'>" +data.answer[x].answer+
                        "</div>" +
                        "</div>" +
                        "</div>"
                    )
                }
            }else{
                $('.right-answer').append(
                    "<div class='empty'>你还没有回答任何问题哦~</div>"
                )
            }
            if(data.ask.length>0){
                for(var y in data.ask){
                    $(".right-ask").append(
                        "<div class='ask-question'>"+
                        "<div class='ask-ques-img'>"+
                        "<img src='../src/assets/img/user/"+data.ask[y].userImg+"' alt=''>"+
                        "</div>"+
                        "<a href='page-ask-solve.html?id="+data.ask[y].quesId+"'>"+
                        "<div class='ask-ques-key'>关键字：<span class='key-value'>"+data.ask[y].keyword+"</span></div>"+
                        "<div class='ask-ques-title'>"+
                        "<p class='ques-title'>"+data.ask[y].quesTitle+"</p>"+
                        "<div class='ques-content'>"+data.ask[y].quesContent+
                        "</div>"+
                        "</div>"+
                        "</a>"+
                        "<div class='ques-popularity'>"+
                        "<span>已有 <span class='popularity-num'>"+data.ask[y].ansNum+"</span> 人回答</span>"+
                        "</div>"+
                        "</div>"
                    )
                }
            }else{
                $('.right-ask').append(
                    "<div class='empty'>你还没有过提问哦~</div>"
                )
            }
            if(data.note.length>0){
                for(var z in data.note){
                    $(".right-note").append(
                        "<div class='note-question clearfix'>"+
                        "<div class='note-ques-title'>"+
                        "<p class='ques-title'>"+
                        "<a href='./../web/page-note-show.html?nid="+data.note[z].noteId+"' title='点击查看'>"+data.note[z].noteTitle+"</a>"+
                        "<span class='key-value'>"+data.note[z].keyword+"</span>"+
                        "<span class='note-user' id='note0'>"+data.note[z].username+"</span>"+
                        "</p>"+
                        "<div class='ques-content'>"+data.note[z].noteContent+"</div>"+
                        "</div>"+
                        "<div class='ques-popularity'><span>"+data.note[z].view+" 浏览</span><span> "+data.note[z].noteAdd+" 补充</span></div>"+
                        "</div>"
                    )
                }
            }else{
                $('.right-note').append(
                    "<div class='empty'>你还没有发布过笔记哦~</div>"
                )
            }
        }
    })
    function setCookie(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    };



    window.onscroll=function() {
        window.onresize = function(){
            return $(window).width();
        }
        if(window.onresize()>991){
            var dh = $(document).height(),//页面高度
                ds = $(document).scrollTop();//滚动高度
            if(ds<dh-900){
                $(".personal-left").css('margin-top',(ds)+'px');
            }
        }else{
            $(".personal-left").css('margin-top','10px');
        }
    }

    $(".personal-nav").on('click','li',function(){
        $(this).children().css('color','#f63');
        $(this).siblings().children().css('color','#999')
    })
})