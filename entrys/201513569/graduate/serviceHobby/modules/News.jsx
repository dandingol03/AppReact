import React from 'react';
import {render} from 'react-dom';
var Panel = require('../../../../../components/panel/Panel.jsx');
import Hide from '../../../../../components/basic/Hide.jsx';
import '../../../../../css/serviceHobby/basic/news.css';
var ProxyQ = require('../../../../../components/proxy/ProxyQ');


var News=React.createClass({
    returnCb       : function () {
        this.setState({hiddenInfo: null});
        $(this.refs.contentDiv).slideDown();
    },
    clickCb        : function (evt) {
        var target = evt.target;
        var index = $(target).attr("data-index");
        console.log();
        console.log();
        console.log();
        if (index !== undefined && index !== null) {
            var info = this.state.contentMapping[index];
            if (info !== undefined && info !== null) {
                var ob = new Object();
                ob.comp = "panel";
                //TODO:change the structor of ob
                var data = [
                    {row: ['title=>标题|span|' + info.title]},
                    {row: ['content=>内容|span|' + info.content]},
                    {row: ['author=>作者|span|' + info.author]},
                    {row: ['返回|return|']}
                ];
                ob.data = data;
                this.setState({hiddenInfo: ob});
                $(this.refs.contentDiv).slideUp();
            }
        }
    },
    fetch:function(){
        ProxyQ.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            null,
            function(response){
                var data;
                var ob=new Object();
                if(Object.prototype.toString.call(response)!='[object Array]')
                    if(response.data!==undefined&&response.data!==null)
                        if(Object.prototype.toString.call(response.data)=='[object Array]')
                            data=response.data;
                        else
                            data=response;
                ob.data$initialed=true;
                if(data!==undefined&&data!==null)
                    ob.data=data;
                this.setState(ob);
            }.bind(this)
        )

    },
    getInitialState:function(){
        var data$initialed;

        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data = this.props.data;
            data$initialed=true;
        }

        var auto;
        if(this.props.auto===true||this.props.auto==="true")
            auto=true;
        var contentMapping = new Object();
        return ({data: data, data$initialed: data$initialed, auto: auto, contentMapping: contentMapping});
    },
    render         : function () {
        if (this.state.data$initialed !== true && (this.props.data == null || this.props.data == undefined)) {
            if (this.state.auto == true)
                this.fetch();
            return (<div></div>)

        } else {
            var uls;
            if (this.state.data !== null && this.state.data !== undefined) {
                uls = new Array();
                //TODO:划分一级和二级新闻
                var k = 0;
                var state = this.state;
                var clickCb = this.clickCb;
                this.state.data.map(function (item, i) {
                    var groupNews = item;
                    uls.push(<li key={k++} className="main"><span>{groupNews.newsTypeName}</span></li>);
                    if (groupNews.newsList !== undefined && groupNews.newsList !== null) {
                        groupNews.newsList.map(function (news, j) {
                            var content = news.content;
                            var author = news.author;
                            var title = news.title;
                            state.contentMapping[k] = {
                                content: content,
                                author : author,
                                title  : title
                            }
                            var t = k;
                            var cb = clickCb;
                            uls.push(
                                <li key={k} className="vice">
                                    <span data-index={k++} onClick={cb}>{title}</span>
                                </li>);
                        });
                    }

                });
            }

            var hide;
            if (this.state.hiddenInfo !== undefined && this.state.hiddenInfo !== null) {
                if (this.state.hiddenInfo.comp !== undefined && this.state.hiddenInfo.comp !== null) {
                    var hide$c;
                    switch (this.state.hiddenInfo.comp) {
                        case 'panel':
                            hide$c = <Panel
                                padding="0px"
                                autoComplete={true}
                                data={this.state.hiddenInfo.data}
                                returnCb={this.returnCb}
                                />;
                            break;
                        default:
                            break;
                    }
                    hide =
                        <Hide>
                            {hide$c}
                        </Hide>

                }
            }


            return (
                <div className="section clearfix news" ref="news">
                    <div ref="hideDiv">
                        {hide}
                    </div>
                    <div ref="contentDiv">
                        <ul className="list">
                            {uls}
                        </ul>
                    </div>
                </div>
            );

        }
    }
});
module.exports = News;