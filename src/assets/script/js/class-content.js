/**
 * Created by Administrator on 2017/2/23.
 * page-content.html  pagination
 */
$(function(){
    var pageCur = 1,
        pageTotal = 1,
        category = '';
    classList(pageCur,category);
    $(".item-name li span,.item-name-xs li span").click(function(){
        pageCur = 1;
        category = $(this).data("category");
        classList(pageCur,category);
    })
    $(".page-pre").on('click',function(){
        if(pageCur>1){
            pageCur--;
            classList(pageCur,category);
        }
        pageCompare(pageCur,pageTotal);
    })
    $(".page-next").on('click',function(){
        if(pageCur<pageTotal){
            pageCur++;
            classList(pageCur,category);
        }
        pageCompare(pageCur,pageTotal);
    })
    function classList(pageCur,category){
        $(".l-box").remove();
        $.ajax({
            url: './../php/pagination.php',
            type: 'post',
            dataType: 'json',
            data:{
                page: pageCur,
                category: category
            },
            success:function(result){
                $(".pagination").show();
                var x = result[0];
                for(var i=0; i<x.length; i++){
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
                }
                pageCur = result[2];
                pageTotal = result[1];
                $(".page-cur").html(pageCur);
                $(".page-total").html(pageTotal);
            },
            error:function(){
                $(".class-height,.img-content").append(
                    "<div class='col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-2 l-box'>" +
                    "<img src='./../src/assets/img/Default/img_noclass.png' alt='' class='default-img'>" +
                    "</div>"
                );
                $(".pagination").hide();
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
})
