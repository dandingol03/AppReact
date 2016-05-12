import config from '../../config.json';

var ProxyQ = {

    queryHandle: function (type, url, params, dataType, callback) {
        var proxyUrl = url;
        if(config.model=="debug")
        {
            if (config.devServer !== undefined && config.devServer !== null)
                if (config.devServer.proxy !== undefined && config.devServer.proxy !== null) {
                    //只添加第一个proxy的值
                    for (var field in config.devServer.proxy) {
                        var re = /\/(.*?)\//;
                        var proxyServer = re.exec(field)[1];
                        proxyUrl = "/" + proxyServer + proxyUrl;
                    }
                }
        }


        $.ajax({
            type    : type !== undefined && type !== null ? type : 'POST',
            url     : proxyUrl,
            dataType: dataType !== undefined && dataType !== null ? dataType : 'json',
            data    : params,
            cache   : false,
            success : function (response) {
                if (callback !== undefined && callback !== null)
                    callback(response);
            },
            error   : function (xhr, status, err) {
                console.error("error=" + err);
            }
        });

    }


};


module.exports = ProxyQ;