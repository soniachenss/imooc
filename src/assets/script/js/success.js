/**
 * Created by Administrator on 2017/3/21.
 */
$(function(){
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    var id = getQueryString('id');
    var flag = getQueryString('f');
    if(flag == 'note'){
        $(".msg-title").html("您的手记已经提交成功~");
        $(".linker-view").append(
            "<a href='page-note-show.html?nid="+id+"'>查看手记</a>"
        )
    }else{
        $(".msg-title").html("您的提问已经提交成功~");
        $(".linker-view").append(
            "<a href='page-ask-solve.html?id="+id+"'>查看问答</a>"
        )
    }
})