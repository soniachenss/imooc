/**
 * Created by Administrator on 2017/3/3.
 */
$(function(){
    var classID = getQueryString("id"),
        periods = getQueryString("per");
    $.ajax({
        url:'./../php/classPlay.php?cid='+classID+'&per='+periods,
        type: 'post',
        dataType: 'json',
        success:function(result){
            $(".play-video").attr('src','../src/assets/video/'+result[2].videoPath);
            $(".play-video").attr("autoplay","true");
            // $(".play-video source").attr('src','../src/assets/video/'+result[2].videoPath);
            for(var i = 0; i<result[1].length; i++){
                $(".class-periods").append(
                    "<li><a href='./../web/page-class.html?id="+result[1][i].classId+"&per="+result[1][i].periods+"'>第"+(i+1)+"课时："+result[1][i].periodsName+"</a></li>"
                )
                $(".play-name").html(result[0].className);
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
                $('.class-about-tj').append(
                    "<li>"+
                    "<a href='page-class-content.html?id="+data[i].classId+"'>"+data[i].className+"</a>" +
                    "</li>"
                )
            }
        }
    })
    $.ajax({
        url: './../php/tjrmClass.php?msg=rm',
        type: 'post',
        dataType: 'json',
        success:function(data){
            var len = data.length>3?3:data.length;
            for(var i=0;i<len;i++){
                $('.class-about-rm').append(
                    "<li>"+
                    "<a href='page-class-content.html?id="+data[i].classId+"'>"+data[i].className+"</a>" +
                    "</li>"
                )
            }
        }
    })
    $(".item-ask-btn").on('click',function(){
        $(".ask-question").remove();
        $('.default-not').remove();
        $.ajax({
            url:'./../php/classDetail.php?cid='+classID,
            type: 'post',
            dataType: 'json',
            success:function(result){
                var len,res = result['classAsk'];
                if(res.length>0){
                for(var j = 0;len =res.length, j<len;j++){
                    var msg =res[j];
                    $(".class-ask").append(
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
                    $(".class-ask").append("<img src='./../src/assets/img/common/img-noask.png' class='default-not'>")
                }
            }
        })
    })
    $(".class-lesson-item li").on('click',function(){
        $(this).removeClass('border-fff').addClass('border-f63');
        $(this).siblings().removeClass('border-f63').addClass('border-fff');
        var name = $(this).index();
        $(".c-tab:eq("+name+")").removeClass('hidden').siblings().addClass('hidden');
    })

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})