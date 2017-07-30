/**
 * Created by Administrator on 2017/3/10.
 */
$(function(){
    var qId = getQueryString('id'),
        username = getCookie('username');
    $('.items-content-box').on('click','.btn-reply',function(){
        $(".addc-text").remove();
        var taruser = $(this).data('name'),
            aid = $(this).data('id');
        $(this).parent().after(
            "<div class='addc-text'>"+
            "<textarea rows='5' class='add-comment'></textarea>"+
            "<input type='hidden' value='"+taruser+"' class='tarUser'>"+
            "<input type='hidden' value='"+username+"' class='uname'>"+
            "<input type='hidden' value='"+aid+"' class='aid'>"+
            "<input type='submit' value='提交' class='add-text-btn'>"+
            "</div>"
        )
    })
    $(".items-content-box").on('click','.add-text-btn',function(){
        var comment = $(".add-comment").val(),
            tarUser = $(".tarUser").val(),
            uname = $(".uname").val(),
            aid = $(".aid").val();
        if(username == null){
            $(".imooc-login-box,.imooc-login-mask").fadeIn();
        }
        else {
            $.ajax({
                url: './../php/addReply.php',
                type: 'post',
                data: {
                    type: 'ask',
                    comment: comment,
                    tarUser: tarUser,
                    uname: uname,
                    aid: aid
                },
                dataType: 'json',
                success: function (data) {
                    if (data == 'success') {
                        location.reload();
                    } else {
                        alert('很抱歉，提交失败~');
                    }
                }

            })
        }
    })
    quesSolve();
    $(".my-ask").on('click',function(){
        var content = editor.html();
        if(content==''){
            $(".prompt-content").css('visibility','initial');
        }else{
            if(username == null){
                $(".imooc-login-box,.imooc-login-mask").fadeIn();
            }
            else{
                $.ajax({
                    url: './../php/addAnswer.php',
                    type: 'post',
                    data: {
                        content: content,
                        qId: qId,
                        username: username
                    },
                    success: function(data){
                        if(data=='success'){
                            $(".my-ask").before(
                                "<div class='alert-box'>提交成功</div>"
                            )
                            setTimeout(function () {
                                $(".alert-box").remove();
                            }, 1000);
                            setTimeout("location.reload()",1000);
                        }else{
                            alert("提交失败");
                        }
                    }
                })
            }

        }
    })
    $(".title-btn-ask").on('click',function(){
        isLogin();
    })
    function quesSolve(){
        $.ajax({
            url: './../php/questionSolve.php',
            type: 'post',
            dataType: 'json',
            data:{
                qId: qId,
            },
            success:function(data){
                var x=data[0][0];
                var y = data[1];
                $(".ask-solve-title").html(x.quesTitle);
                $(".ask-solve-content").html(x.quesContent);
                $(".ask-user-name").html(x.username);
                $(".title-number").html(x.askNumber)
                if(y.length==0){
                    $(".solve-items-content").hide();
                    $(".no-comment").html("还没有评论，来抢个沙发吧~");
                }else{
                    for(var k in y){
                        $(".items-content-box").append(
                        "<div class='solve-items-content'>"+
                        "<div class='items-content-img'>"+
                        "<img src='../src/assets/img/user/"+y[k].userImg+"' alt=''>"+
                        "</div>"+
                        "<p class='items-username'>"+y[k].username+"</p>"+
                        "<div class='items-content'>"+y[k].answer+"</div>"+
                        "<p class='items-view clearfix' id='btn-"+k+"'>"+
                        "<span class='list-btn'><button class='btn-reply' data-name='"+y[k].username+"'data-id='"+y[k].answerId+"'>回复</button></span>"+
                        "</p>"+
                        "</div>"
                        )
                        getMsg(y[k].answerId,k);
                    }

                }
            }

        })
    }
    function getMsg(answerId,k){
        $.ajax({
            url: './../php/ask-comment.php',
            type: 'post',
            dataType: 'json',
            data: {
                answerId: answerId,
            },
            success: function(result){
                var i,data = result[0];
                for(i in data){
                    $("#btn-"+k).after(
                        "<div class='list-reply'>"+
                        "<img src='./../src/assets/img/user/"+data[i].cimg+"' alt=''>"+
                        "<p class='list-name'>"+data[i].cuser+" 回复 "+data[i].taruser+"</p>"+
                        "<p class='list-content'>"+data[i].comment+"</p>"+
                        "<p class='list-btn-reply'><button class='btn-reply' data-name='"+data[i].cuser+"'data-id='"+answerId+"'>回复</button></p>"+
                        "</div>"
                    )
                }
            }
        })
    }
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }
        else{
            return null;
        }
    };
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function isLogin(){
        if(username == null){
            $(".imooc-login-box,.imooc-login-mask").fadeIn();
        }
        else{
            window.location.href='./../web/page-ask-questions.html';
        }
    }
})