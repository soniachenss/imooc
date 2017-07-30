/**
 * Created by Administrator on 2017/2/20.
 */
$(function(){
    var lb = 'Other',
        cid = getQueryString('id');

    $(".questions-type-item span").on('click',function(){
        $(".questions-type-item span").removeClass('span-selected');
        $(this).addClass('span-selected');
        lb = $(this).data('item');
    })
    $(".ask-release").on('click',function(){
        var title = $(".ask-title-my").val(),
            username = getCookie('username'),
            content = editor.html();
        if(content==''){
            $(".prompt-content").css('visibility','initial');
        }
        if(content!='' && title.length>0){
            $.ajax({
                url: './../php/addNote.php',
                type: 'post',
                dataType: 'json',
                data: {
                    title: title,
                    content: content,
                    lb: lb,
                    cid: cid,
                    username: username,
                    tb: 'ask'
                },
                success: function(data){
                    if(data.msg=='success'){
                        window.location.href = './../web/success.html?id='+data.id.id+'&f=ask';
                    }else{
                        alert('提交失败！');
                    }
                }
            })
        }
    })
    $(".note-release").on('click',function(){
        var title = $(".ask-title-my").val(),
            isOri = $(".ask-isOri").is(':checked'),
            content = editor.html(),
            username = getCookie('username');
        if(content==''){
            $(".prompt-content").css('visibility','initial');
        }
        if(content!='' &&  title.length>0){
            $.ajax({
                url: './../php/addNote.php',
                type: 'post',
                dataType: 'json',
                data: {
                    title: title,
                    isOri: isOri,
                    content: content,
                    lb: lb,
                    username: username,
                    tb: 'note'
                },
                success: function(data){
                    if(data.msg=='success'){
                        window.location.href = './../web/success.html?id='+data.id.id+'&f=note';
                    }else{
                        alert('提交失败！');
                    }
                }
            })
        }
    })
    $(".ask-title-my").bind('input propertychange keyup blur', function() {
        var value = $(this).val();
        if(value==''||value.length>35){
            $(".prompt-title").css('visibility','initial');
        }else{
            $(".prompt-title").css('visibility','hidden');
        }
    });
    function getCookie(name)
    {
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
})