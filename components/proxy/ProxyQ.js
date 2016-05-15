import config from '../../config.json';

var ProxyQ = {
    getProxyServer:function(){
        if (config.devServer !== undefined && config.devServer !== null)
        {
            if (config.devServer.proxy !== undefined && config.devServer.proxy !== null) {
                //只添加第一个proxy的值
                var proxyServer
                for (var field in config.devServer.proxy) {
                    var re = /\/(.*?)\//;
                    proxyServer= re.exec(field)[1];
                    break;
                }
                return proxyServer;
            }
        }
    },
    getPrefix:function(){
        if(config.model=="debug")
        {
            return "/"+this.getProxyServer();
        }
        else
            return "";

    },
    queryHandle: function (type, url, params, dataType, callback) {
        var proxyUrl = url;
        if(config.model=="debug")
        {
            proxyUrl = "/" + this.getProxyServer() + proxyUrl;
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