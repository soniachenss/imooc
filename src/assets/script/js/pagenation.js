/**
 * Created by Administrator on 2017/3/10.
 */
window.pagination = {
    classList: function(pageCur,category,tbname,pageSize){
        $(".l-box").remove();
        $.ajax({
            url: './../php/pagination.php',
            type: 'post',
            dataType: 'json',
            async: false,
            data:{
                page: pageCur,
                category: category,
                tbname: tbname,
                pageSize: pageSize
            },
            success:function(result){
                var x = result[0];
                    for(var i=0; i<x.length; i++){
                        if(result[3]=='class_msg'){
                        $(".class-height").append(
                            "<div class='col-lg-4 col-md-4 col-sm-6 l-box'>" +
                            "<a href='page-class-content.html?id="+x[i].classId+"' class='list-class-box'>" +
                            "<div class='class-box'>" +
                            "<div class='class-box-img'>" +
                            "<img src='./../src/assets/img/" +x[i].imgPath+"' alt='' class='class-img'>"+
                            "</div>"+
                            "<p class='class-title'>"+x[i].className+"</p>"+
                            "<p class='class-intro'>"+x[i].classIntro+"</p>"+
                            "<p class='class-price'><span class='price'>&yen;"+x[i].classPrice+"</span><span class='number'><i class='fa fa-user-plus' aria-hidden='true'></i>&nbsp;"+x[i].classNum+"</span></p>"+
                            "</div>"+
                            "<div class='hover-line'></div>"+
                            "</a></div>"
                        )
                        $(".class-item-xs").after(
                            "<div class='col-xs-6 l-box'>" +
                            "<a href='' class='list-class-box'>" +
                            "<div class='class-box'>" +
                            "<div class='class-box-img'>" +
                            "<img src='./../src/assets/img/" +x[i].imgPath+"' alt='' class='class-img'>"+
                            "</div>"+
                            "<p class='class-title'>"+x[i].className+"</p>"+
                            "<p class='class-intro'>"+x[i].classIntro+"</p>"+
                            "<p class='class-price'><span class='price'>&yen;"+x[i].classPrice+"</span><span class='number'><i class='fa fa-user-plus' aria-hidden='true'></i>&nbsp;"+x[i].classNum+"</span></p>"+
                            "</div>"+
                            "<div class='hover-line'></div>"+
                            "</a></div>"
                        )
                        }else if(result[3]=='class_questions'){
                            $(".ask-nav-tabs").after(
                                "<div class='ask-question'>"+
                                "<div class='ask-ques-img'>" +
                                "<img src='../src/assets/img/common/5.jpg' alt=''>" +
                                "</div>" +
                                "<a href=''>" +
                                "<div class='ask-ques-key'>关键字：" +
                                "<span class='key-value'>JavaScript</span>" +
                                "</div>" +
                                "<div class='ask-ques-title'>" +
                                "<p class='ques-title'>这是一个标题</p>" +
                                "<div class='ques-content'>" +
                                "</div></div></a><div class='ques-popularity'>" +
                                "<span>已有 <span class='popularity-num'>0</span> 人回答</span>" +
                                "<a href=''>我来回答</a>"+
                                "</div></div>"
                            )
                        }
                    }
                window.pageCur = result[2];
                window.pageTotal = result[1];
                $(".page-cur").html(pageCur);
                $(".page-total").html(pageTotal);
            },
            error:function(){
                $(".class-height").append(
                    "<div class='col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 l-box'>" +
                    "<img src='./../src/assets/img/Default/img_noclass.png' alt='' class='default-img'>" +
                    "</div>"
                );
            }
        })
    },
    pageCompare: function(pageCur,pageTotal){
        if(pageCur==pageTotal){
            $(".page-next").addClass('btn-disable');
            $(".page-pre").removeClass('btn-disable');
        }else if(pageCur == 1){
            $(".page-pre").addClass('btn-disable');
            $(".page-next").removeClass('btn-disable');
        }
    },
    btnPre: function(pageSize){
        $(".page-pre").bind('click',function(){
            if(pageCur>1){
                pageCur--;
                pagination.classList(pageCur,category,tbname,pageSize);
            }
            pagination.pageCompare(pageCur,pageTotal);
        })
    },
    btnNext: function(pageSize){
        $(".page-next").bind('click',function(){
            if(pageCur<pageTotal){
                pageCur++;
                pagination.classList(pageCur,category,tbname,pageSize);
            }
            pagination.pageCompare(pageCur,pageTotal);
        })
    }
}