/**
 * Created by Administrator on 2017/3/10.
 */
$(function(){
    var pageCur = 1,
        pageTotal = 1,
        tabName = 'tj';
    quesMsg(pageCur,tabName);
    tabshow();
    $(".title-btn-ask").on('click',function(){
        isLogin();
    })
    $(".note-tj").on('click',function(){
        tabName = 'tj';
        quesMsg(pageCur,tabName);
    })
    $(".note-new").on('click',function(){
        tabName = 'new';
        quesMsg(pageCur,tabName);
    })
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
    $.ajax({
        url: './../php/tjrmClass.php?msg=tj',
        type: 'post',
        dataType: 'json',
        success:function(data){
            var len = data.length>3?3:data.length;
            for(var i=0;i<len;i++){
                $('.note-affirm').append(
                    "<div class='col-lg-12 col-md-12 hidden-xs hidden-sm'>"+
                    "<a href='page-class-content.html?id="+data[i].classId+"'>"+
                    "<div class='tjclass'>"+
                    "<img src='../src/assets/img/"+data[i].imgPath+"' alt='' class='tj-class-img'>"+
                    "<p class='tjc-title'>"+data[i].className+"</p>"+
                    "<p class='tjc-content'>"+data[i].classIntro+
                    "</p>"+
                    "<p class='tjc-num'>"+
                    "<span class='price'>"+data[i].classPrice+"</span>"+
                    "<span class='number'>"+
                    "<i class='fa fa-user-plus' aria-hidden='true'></i>&nbsp;"+data[i].classNum+
                    "</span>"+
                    "</p>"+
                    "</div>"+
                    "</a>"+
                    "</div>"
                )
            }
        }
    })

    function quesMsg(pageCur,tabName){
        $(".note-question").remove();
        $.ajax({
            url: './../php/note.php',
            type: 'post',
            dataType: 'json',
            data:{
                page: pageCur,
                tabName: tabName,
            },
            success:function(data){
                var result= data[0];
                $(".ask-question-list").css('height',245*result.length+'px');
                for(var i =0;i<result.length;i++){
                    $(".note-list").append(
                        "<div class='note-question clearfix'>"+
                        "<div class='note-ques-title'>" +
                        "<p class='ques-title'><a href='./../web/page-note-show.html?nid="+result[i].noteId+"' title='点击查看'>"+result[i].noteTitle+"</a><span class='key-value'>"+result[i].keyword+"</span><span class='note-user' id='note"+i+"'>"+result[i].username+"</span>"+
                        "</p>"+
                        "<div class='ques-content'>" +result[i].noteContent+
                        "</div></div>" +
                        "<div class='ques-popularity'><span>"+result[i].view+" 浏览</span>" +
                        "<span> "+result[i].noteAdd+" 补充</span>" +
                        "</div>" +
                        "</div>"
                    )
                    if(result[i].isOriginal==1){
                        var id = "#note"+i;
                        $(id).append("<span class='isOriginal'>原创</span>")
                    }
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
            window.location.href='./../web/page-note-content.html';
        }
    }
})