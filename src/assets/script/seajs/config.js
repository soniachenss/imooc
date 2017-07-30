/**
 * Created by chenshuangs on 2016/12/21.
 */
seajs.config({

    // 设置路径，方便跨目录调用
    paths: {
        'arale': 'https://a.alipayobjects.com/arale',
        'jquery': 'https://a.alipayobjects.com/jquery'
    },

    // 设置别名，方便调用
    alias: {
        'class': 'arale/class/1.0.0/class',
        'jquery': 'jquery/jquery/1.10.1/jquery'
    }

});