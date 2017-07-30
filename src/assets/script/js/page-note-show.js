/**
 * Created by Administrator on 2017/3/10.
 */
$(function(){
    var noteId = getQueryString('nid'),
        uname = getCookie('username');
    $('.note-content-discuss').on('click','.btn-reply',function(){
        $(".addc-text").remove();
        var taruser = $(this).data('name'),
            aid = $(this).data('id');
        $(this).parent().after(
            "<div class='addc-text'>"+
            "<textarea rows='5' class='add-comment'></textarea>"+
            "<input type='hidden' value='"+taruser+"' class='tarUser'>"+
            "<input type='hidden' value='"+uname+"' class='uname'>"+
            "<input type='hidden' value='"+aid+"' class='aid'>"+
            "<input type='submit' value='提交' class='add-text-btn'>"+
            "</div>"
        )
    })
    $(".note-content-discuss").on('click','.add-text-btn',function(){
        var comment = $(".add-comment").val(),
            tarUser = $(".tarUser").val(),
            uname = $(".uname").val(),
            aid = $(".aid").val();
        $.ajax({
            url: './../php/addReply.php',
            type: 'post',
            data: {
                type: 'note',
                comment: comment,
                tarUser: tarUser,
                uname: uname,
                aid: aid
            },
            dataType: 'json',
            success: function(data){
                if(data == 'success'){
                    location.reload();
                }else{
                    alert('很抱歉，提交失败~');
                }
            }
    
        })
    
    })
    $(".write-review").on('click',function(){
        var content = editor.html();
        if(uname == null){
            $(".imooc-login-box,.imooc-login-mask").fadeIn();
        }
        else {
            $.ajax({
                url: './../php/addComment.php',
                type: 'post',
                dataType: 'json',
                data: {
                    content: content,
                    noteId: noteId,
                    uname: uname
                },
                success: function (data) {
                    if (data == 'success') {
                        $('body').append(
                            "<div class='alert-box'>提交成功！</div>"
                        )
                        setTimeout(function () {
                            $(".alert-box").remove();
                            location.reload();
                        }, 2000)
                    }

                }
            })
        }
    })
    $.ajax({
        url: './../php/note-show.php',
        type: 'post',
        dataType: 'json',
        data: {
            noteId:noteId
        },
        success: function(data){
            var d = data[0],
                msg = data[1];
            $(".note-content-title").html(d.noteTitle);
            $(".note-content-main").html(d.noteContent);
            $(".tab-view").html(d.view);
            $(".tab-author").html(d.username);
            $(".tab-add").html(data[2]);
            for(var i = 0;i<data[2];i++){
                $(".discuss-write").after(
                    "<div class='discuss-list'>"+
                    "<img src='./../src/assets/img/user/"+msg[i].userImg+"' alt=''>"+
                    "<p class='list-name'>"+msg[i].username+"</p>"+
                    "<p class='list-content'>"+msg[i].addContent+"</p>"+
                    "<p class='list-btn' id='btn-"+i+"'><button class='btn-reply' data-name='"+msg[i].username+"'data-id='"+msg[i].addId+"'>回复</button></p>"+
                    "</div>"
                );
                getMsg(msg[i].addId,i);
            }
        }

    })
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    function getMsg(addId,k){
        $.ajax({
            url: './../php/note-comment.php',
            type: 'post',
            dataType: 'json',
            data: {
                addId: addId,
            },
            success: function(result){
                var i,data = result[0];
                for(i in data){
                    $("#btn-"+k).after(
                        "<div class='list-reply'>"+
                        "<img src='./../src/assets/img/user/"+data[i].cimg+"' alt=''>"+
                        "<p class='list-name'>"+data[i].cuser+" 回复 "+data[i].taruser+"</p>"+
                        "<p class='list-content'>"+data[i].comment+"</p>"+
                        "<p class='list-btn-reply'><button class='btn-reply' data-name='"+data[i].cuser+"'data-id='"+addId+"'>回复</button></p>"+
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
})