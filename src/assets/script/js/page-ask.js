/**
 * Created by Administrator on 2017/3/10.
 */
$(function(){
    var pageCur = 1,
        pageTotal = 1,
        tabName = 'new';
    quesMsg(pageCur,tabName);
    tabshow();
    $(".page-pre").on('click',function(){
        if(pageCur>1){
            pageCur--;
            quesMsg(pageCur,tabName);
        }
        pageCompare(pageCur,pageTotal);
    })
    $(".page-next").on('click',function(){
        if(pageCur<pageTotal){
            pageCur++;
            quesMsg(pageCur,tabName);
        }
        pageCompare(pageCur,pageTotal);
    })
    $(".ask-nav-tabs ul li").on('click',function(){
        $(this).removeClass('border-fff').addClass('border-f63');
        $(this).siblings().removeClass('border-f63').addClass('border-fff');
    })
    $(".title-btn-ask").on('click',function(){
        isLogin();
    })
    function quesMsg(pageCur,tabName){
        $(".ask-question").remove();
        $.ajax({
            url: './../php/question.php',
            type: 'post',
            dataType: 'json',
            data:{
                    page: pageCur,
                tabName: tabName,
            },
            success:function(data){
                var result= data[0];
                $(".ask-question-list").css('height',235*result.length+'px');
                for(var i =0;i<result.length;i++){
                    $(".ask-question-list").append(
                        "<div class='ask-question'>"+
                        "<div class='ask-ques-img'>" +
                        "<img src='../src/assets/img/user/"+result[i].userImg+"' alt=''>" +
                        "</div>" +
                        "<a href='page-ask-solve.html?id="+result[i].quesId+"'>" +
                        "<div class='ask-ques-key'>关键字：" +
                        "<span class='key-value'>"+result[i].keyword+"</span>" +
                        "</div>" +
                        "<div class='ask-ques-title'>" +
                        "<p class='ques-title'>"+result[i].quesTitle+"</p>" +
                        "<div class='ques-content'>"+result[i].quesContent+
                        "</div></div></a><div class='ques-popularity'>" +
                        "<span>已有 <span class='popularity-num'>"+result[i].askNum+"</span> 人回答</span>" +
                        "<a href='page-ask-solve.html?id="+result[i].quesId+"'>我来回答</a>"+
                        "</div></div>"
                    )
                }
                pageCur = data[1].page;
                pageTotal = data[1].amount;
                $(".page-cur").html(pageCur);
                $(".page-total").html(pageTotal);

            }
            
        })
    }
    function pageCompare(pageCur,pageTotal){
        if(pageCur==pageTotal){
            $(".page-next").addClass('btn-disable');
            $(".page-pre").removeClass('btn-disable');
        }else if(pageCur == 1){
            $(".page-pre").addClass('btn-disable');
            $(".page-next").removeClass('btn-disable');
        }
    }
    function tabshow(){
        $(".ask-nav-tabs ul").on('click','li',function(){
            tabName = $(this).data('msg');
            pageCur = 1;
            quesMsg(pageCur,tabName);
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
    function isLogin(){
        var username = getCookie('username');
        if(username == null){
            $(".imooc-login-box,.imooc-login-mask").fadeIn();
        }
        else{
            window.location.href='./../web/page-ask-questions.html';
        }
    }
})