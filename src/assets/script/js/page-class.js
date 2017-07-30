/**
 * Created by Administrator on 2017/2/20.
 */
$(function(){
    var classID = getQueryString("id");
    $(".btn-watch").bind('click',function(){
        if(getCookie('username') == null){
            $(".imooc-login-box,.imooc-login-mask").fadeIn();
        }
        else {
            $(window).attr('location', './../web/page-class.html?id=' + classID + '&per=1');
        }
    });
    $(".btn-ask").bind('click',function(){
        isLogin();
    });
    $.ajax({
        url:'./../php/classDetail.php?cid='+classID,
        type: 'post',
        dataType: 'json',
        success:function(result){
            var data = result['classMsg'];
            $(".tab-class-name").html(data.className);
            $(".c-content-img").attr('src','../src/assets/img/'+data.imgPath);
            $(".content-title-lb").html('【'+data.category+'】');
            $(".c-content-intro").html(data.classIntro);
            $(".c-content-teacher span").html(data.teacher);
            if(data.classPrice==0){
                $(".price-free").show().siblings().hide();
            }else{
                $(".price-nofree").show().html("￥"+data.classPrice).siblings().hide();
            }
            $(".c-content-num").html(data.classNum);
            if(data.Description){
                $(".class-detail").html(data.Description);
            }else{
                $(".class-detail").html("<img src='./../src/assets/img/common/img-nobrief.png' class='default-not'>");
            }
            if(data.studyPoint){
                $(".class-point").html(data.studyPoint);
            }else{
                $(".class-point").html("<img src='./../src/assets/img/common/img-nopoint.png' class='default-not'>");
            }
            for(var i= 0; i<result['classPeriods'].length; i++){
                $(".class-periods").append(
                    "<li><a href='./../web/page-class.html?id="+classID+"&per="+(i+1)+"'>第"+(i+1)+"课时："+result['classPeriods'][i].periodsName+"</a></li>"
                )
            }
            var len,res = result['classAsk'];
            if(res.length>0){
                for(var j = 0;len =res.length, j<len;j++){
                    var msg =res[j];
                    $(".c-class-ask").append(
                        "<div class='ask-question'>"+
                        " <div class='ask-ques-img'>"+
                        " <img src='../src/assets/img/user/"+msg.userImg+"' alt=''>"+
                        " </div>"+
                        " <a href='page-ask-solve.html?id="+msg.quesId+"'>"+
                        "  <div class='ask-ques-key'>"+
                        "  关键字："+
                        "<span class='key-value'>"+msg.keyword+"</span>"+
                        "  </div>"+
                        "<div class='ask-ques-title'>"+
                        "<p class='ques-title'>"+msg.quesTitle+"</p>"+
                        "<div class='ques-content'>"+msg.quesContent+
                        "</div>"+
                        "</div>"+
                        "</a>"+
                        "<div class='ques-popularity'>"+
                        "<span>已有 <span class='popularity-num'>"+msg.askNum+"</span> 人回答</span>"+
                        "<a href='page-ask-solve.html?id="+msg.quesId+"#ask-solved'>我来回答</a>"+
                        "</div>"+
                        "</div>"
                    )
                }
            }else{
                $(".c-class-ask").append("<img src='./../src/assets/img/common/img-noask.png' class='default-not'>")
            }
        }
    })
    $.ajax({
        url: './../php/tjrmClass.php?msg=tj',
        type: 'post',
        dataType: 'json',
        success:function(data){
            var len = data.length>3?3:data.length;
            for(var i=0;i<len;i++){
                $('.c-class-tj').append(
                    "<div class='tj-class-content'>"+
                    "<a href='page-class-content.html?id="+data[i].classId+"'>"+
                    "<img src='../src/assets/img/"+data[i].imgPath+"' alt='' class='tj-class-img'>"+
                    "<p class='tj-class-title'>"+data[i].className+"</p>"+
                    "</a>"+
                    "</div>"
                )
            }
        }
    })
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
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
            $(window).attr('location','./../web/page-ask-questions.html?id='+classID);
        }
    }
    $(".c-content-nav-tabs ul li").on('click',function(){
        $(this).removeClass('border-fff').addClass('border-f63');
        $(this).siblings().removeClass('border-f63').addClass('border-fff');
        var name = $(this).index();
        $(".c-tab:eq("+name+")").removeClass('hidden').siblings().addClass('hidden');
    })
})