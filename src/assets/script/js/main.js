/**
 * Created by chenshuangs on 2016/12/20.
 */
;$(function () {
    $(".nav-imooc-item li").bind('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
    $(".imooc-hideNav").bind('click',function(){
        var _nav = $(".imooc-left-nav");
        if(_nav.css("display")=="none"){
            _nav.show();
        }else{
            _nav.hide();
        }
    })
    $(".login-options").bind('click',function(){
        $(".error-remind-content,.error-remind-username,.error-remind-pass").html('');
        $(this).css('border-bottom','2px solid #f63');
        $(".register-options").css('border-bottom','2px solid #e3e3e3');
        $(".formLogin,.formRegis").toggle();
    })
    $(".register-options").bind('click',function(){
        $(".error-remind-content,.error-remind-username,.error-remind-pass").html('');
        $(this).css('border-bottom','2px solid #f63');
        $(".login-options").css('border-bottom','2px solid #e3e3e3');
        $(".formLogin,.formRegis").toggle();
    })
    $(".form-close,.imooc-login-mask").bind('click',function(){
        $(".imooc-login-mask,.imooc-login-box").fadeOut();
    })
    $(".imooc-login").bind('click',function(){
        $(".imooc-login-box,.imooc-login-mask").fadeIn();
    })
});