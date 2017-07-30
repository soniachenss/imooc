/**
 * Created by Administrator on 2017/2/20.
 */
$(function(){
    $.ajax({
        url: "./../php/classContent.php?classItem=hotClass",
        type: 'post',
        dataType: 'json',
        success:function(result){
            var x = result;
            for(var i=0; i<x.length; i++) {
                $(".block-hotClass").append(
                    "<div class='col-lg-3 col-md-3 col-sm-6 col-xs-6'>" +
                    "<a href='page-class-content.html?id="+x[i].classId+"' class='list-class-box'>" +
                    "<div class='class-box'><div class='class-box-img'>" +
                    "<img src='../src/assets/img/" + x[i].imgPath + "' alt='' class='class-img'></div>" +
                    "<p class='class-title'>" + x[i].className + "</p>" +
                    "<p class='class-intro'>" + x[i].classIntro + "</p>" +
                    "<p class='class-price'><span class='price'>&yen; " + x[i].classPrice + "</span><span class='number'><i class='fa fa-user-plus' aria-hidden='true'></i>&nbsp;" + x[i].classNum + "</span></p>" +
                    "</div>" +
                    "<div class='hover-line'></div>" +
                    "</a>" +
                    "</div>"
                );
            }
        }
    })

    $.ajax({
        url: "./../php/classContent.php?classItem=newClass",
        type: 'post',
        dataType: 'json',
        success:function(result){
            var x = result;
            for(var i=0; i<x.length; i++) {
                $(".block-newClass").append(
                    "<div class='col-lg-3 col-md-3 col-sm-6 col-xs-6'>" +
                    "<a href='page-class-content.html?id="+x[i].classId+"' class='list-class-box'>" +
                    "<div class='class-box'><div class='class-box-img'>" +
                    "<img src='../src/assets/img/" + x[i].imgPath + "' alt='' class='class-img'></div>" +
                    "<p class='class-title'>" + x[i].className + "</p>" +
                    "<p class='class-intro'>" + x[i].classIntro + "</p>" +
                    "<p class='class-price'><span class='price'>&yen; " + x[i].classPrice + "</span><span class='number'><i class='fa fa-user-plus' aria-hidden='true'></i>&nbsp;" + x[i].classNum + "</span></p>" +
                    "</div>" +
                    "<div class='hover-line'></div>" +
                    "</a>" +
                    "</div>"
                );
            }
        }
    })

    $.ajax({
        url: "./../php/classContent.php?classItem=freeClass",
        type: 'post',
        dataType: 'json',
        success:function(result){
            var x = result;
            for(var i=0; i<x.length; i++) {
                $(".block-freeClass").append(
                    "<div class='col-lg-3 col-md-3 col-sm-6 col-xs-6'>" +
                    "<a href='page-class-content.html?id="+x[i].classId+"' class='list-class-box'>" +
                    "<div class='class-box'><div class='class-box-img'>" +
                    "<img src='../src/assets/img/" + x[i].imgPath + "' alt='' class='class-img'></div>" +
                    "<p class='class-title'>" + x[i].className + "</p>" +
                    "<p class='class-intro'>" + x[i].classIntro + "</p>" +
                    "<p class='class-price'><span class='price'>&yen; " + x[i].classPrice + "</span><span class='number'><i class='fa fa-user-plus' aria-hidden='true'></i>&nbsp;" + x[i].classNum + "</span></p>" +
                    "</div>" +
                    "<div class='hover-line'></div>" +
                    "</a>" +
                    "</div>"
                );
            }
        }
    })
})