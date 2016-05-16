import React from 'react';
import {render} from 'react-dom';
import Span from '../../components/basic/Span.jsx';
import Select from '../../components/basic/Select.jsx';
import Download from '../../components/basic/Download.jsx';
import Radio from '../../components/basic/Radio.jsx';
var  ProxyQ = require('../../components/proxy/ProxyQ');
import '../../css/components/panel/panel.css';
import dict from '../../data/json/dictionary.json';

/**
 *
 * 本组件需要数据库字典类作为配置组件的属性,提交发生为表单，路由功能交由jsp完成
 * 1.实现一个本地文件的读取以及属性匹配
 * 2.目前只支持
 * 1).数据本地化,一个label配对一个组件
 * 2).数据拉取,label|comp|data,三个字段的配置只针对select组件,input组件
 * 3).input组件的语义化,在react需要特别监听值的改变
 * [
 * {row:[{'college|query'},{'stuType|select'},{'major|select'}]},
 * {row:[{'grade|input'},{'query'}]}
 * ]
 * 3.query组件可单字段存在
 * 4.
 * 5.样式基于研究生
 * 6.this.props.query设定panel的提交路径
 * 7.bean,通过后台的数据来初始化组件,全字段均不由本地提供
 * 8.子组件的级联刷新,由父组件的form表单提交完成数据更新
 * 9.panel开始支持多数据源
 */

var Panel=React.createClass({
    fetch:function(){

        ProxyQ.queryHandle(
            null,
            this.props.bean.url,
            this.props.bean.params,
            null,
            function(response){
                //这里需要统一规范后台返回的数据格式
                var ob=null;
                if(response.data!==undefined&&response.data!==null&&response.data!="")
                {
                    if(ob==null)
                        ob=new Object();
                    ob.data=response.data;
                }
                else
                    console.log("type of response is wrong");
                if(response.query!==undefined&&response.query!==null)
                {
                    if(ob==null)
                        ob=new Object();
                    ob.query=response.query;
                }
                if(ob!==null)
                    this.setState(ob);

            }.bind(this)
        );

        //this.queryHandle(
        //    null,
        //    this.props.bean.url,
        //    this.props.bean.params,
        //    null,
        //    function(response){
        //        //这里需要统一规范后台返回的数据格式
        //        var ob=null;
        //        if(response.data!==undefined&&response.data!==null&&response.data!="")
        //        {
        //            if(ob==null)
        //                ob=new Object();
        //            ob.data=response.data;
        //        }
        //        else
        //            console.log("type of response is wrong");
        //        if(response.query!==undefined&&response.query!==null)
        //        {
        //            if(ob==null)
        //                ob=new Object();
        //            ob.query=response.query;
        //        }
        //        if(ob!==null)
        //            this.setState(ob);
        //
        //    }.bind(this)
        //);

    },
    queryHandle:function(type,url,params,dataType,callback){
        $.ajax({
            type: type!==undefined&&type!==null?type:'POST',
            url: url,
            dataType: dataType!==undefined&&dataType!==null?dataType:'json',
            data: params,
            cache: false,
            success: function(response) {
                if(callback!==undefined&&callback!==null)
                    callback(response);
            },
            error: function(xhr, status, err) {
                console.log();
                console.log();
                console.error(this.props.url, status, err.toString());
                console.log();
                console.log();
                console.log();
            }
        });
    },
    clickHandle:function(evt){
        evt.preventDefault();
        var target=evt.target;
        if(target!==undefined&&target!==null)
        {
            var form=document.getElementsByName('PanelForm')[0];
            if(this.props.clickHandle!==undefined&&this.props.clickHandle!==null)
            {
                var params=new Object();
                for(var i=0;i<form.getElementsByTagName("input").length;i++)
                {
                    var item=form.getElementsByTagName("input")[i];
                    //针对单选
                    if(item.type=='radio')
                    {
                        if(item.checked==true)
                        params[item.name]=item.value;
                    }else{
                        params[item.name]=item.value;
                    }
                }
                if($(target).attr("data-query")!==undefined&&$(target).attr("data-query")!==null)
                {
                   var query=new Object();
                    query=eval('('+$(target).attr("data-query")+')');
                    query.params=JSON.stringify(Object.assign(query.params,params));
                    this.props.clickHandle(query);
                }
                else
                    this.props.clickHandle(params);
            }else{//如果本组件为最顶层组件

                if(this.state.query!==null&&this.state.query!==undefined)
                {
                    var ddw;
                    ddw=this.state.query.params.reactPageName;
                    var dw;
                    dw=this.state.query.params.reactActionName;
                    form.action=form.action+"?"+"reactPageName="+ddw+"&"+"reactActionName="+dw+"";
                }
                form.submit();
            }

        }
    },
    selectHandle:function(target){
        if(target!==undefined&&target!==null)
        {
            var ob=target.getAttribute("data-query");
            if(ob!==undefined&&ob!==null)
            {
                //采用ajax的数据提交
                ob=eval('('+ob+')');
                var form=document.getElementsByName('PanelForm')[0];
                var $form=$(form);
                var fields=new Object();
                $form.find("input[name!='']").map(function(i,item) {
                    fields[item.name]=item.value;
                });
                console.log();
                console.log();
                var params=Object.assign(ob.params,fields);
                this.queryHandle(
                    null,
                    ob.url,
                    params,
                    null,
                    function(response){
                        //这里需要统一规范后台返回的数据格式
                        var ob=null;
                        if(response.data!==undefined&&response.data!==null&&response.data!="")
                        {
                            if(ob==null)
                                ob=new Object();
                            ob.data=response.data;
                        }
                        else
                            console.log("type of response is wrong");
                        if(response.query!==undefined&&response.query!==null)
                        {
                            if(ob==null)
                                ob=new Object();
                            ob.query=response.query;
                        }
                        if(ob!==null)
                            this.setState(ob);

                    }.bind(this)
                );


            }
        }

    },
    returnCb:function(evt){
        evt.preventDefault();
        var target=evt.target;
        if(target.getAttribute("data-return")!==undefined&&target.getAttribute("data-return")!==null)
        {
            this.props.returnCb();
        }

    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.data!==this.props.data||nextState.data!==this.state.data;
    },
    getInitialState:function(){

        //为组件类型保留关键字
        var reserved={
            "query":true,
            "input":true,
            "select":true,
            "span":true,
            "textarea":true,
            "radio":true,
            "return":true
        }

        var bean;
        if(this.props.bean!==undefined&&this.props.bean!==null)
            bean=this.props.bean;

        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
            data=this.props.data;

        var query;
        if(this.props.query!==undefined&&this.props.query!==null)
            query=this.props.query;

        return ({reserved:reserved,bean:bean,shield:false,data:data,query:query});
    },
    render:function(){
        if(this.state.data!==undefined&&this.state.data!==null&&Object.prototype.toString.call(this.state.data)=='[object Array]')
        {

            //保存最大列宽,每行的单元格数组的label和控件各自放一个td
            var max$cols=1;
                this.state.data.map(function(item,i) {
                if(item.row!==undefined&&item.row!==null&&Object.prototype.toString.call(item.row)=='[object Array]')
                {
                    var cols=0;
                    item.row.map(function(comp,j) {
                        var col=comp.split("|");
                        if(col.length>1)
                            cols+=2;
                        else
                            cols+=1;
                    });
                    if(cols>max$cols)
                        max$cols=cols;
                }
            })


            var reserved=this.state.reserved;
            var trs=new Array();
            //自动补齐td差值属性
            var autoComplete=this.props.autoComplete;

            var clickHandle=this.clickHandle;
            var state=this.state;
            var props=this.props;
            var returnCb=this.returnCb;
            var selectHandle=this.selectHandle;
            state.data.map(function(item,i) {
                var row=item.row;
                var tds=new Array();
                //一个字符串序列,可设置3个字段,label|comp|data
                var td$index=0;
                row.map(function(com,j) {
                    var coms=com.split("|");
                    var label;
                    var ctrl;
                    var ctrl$comp;
                    //查询字典,匹配label字段
                    var name;
                    var so=dict[coms[0]];
                    if(state.bean!==undefined&&state.bean!==null)
                    {
                        if(coms[0].indexOf('=>')!==-1&&coms[0].split('=>').length>=2)
                        {
                            name=coms[0].split('=>')[1];
                        }
                        else
                            name=coms[0];
                    }
                    else
                    {
                        if(so!==undefined&&so!==null)
                        name=so.name;
                    }

                    if(name!==undefined&&name!==null)
                    {
                        if(coms.length>1)
                        {
                            label=(<td key={td$index++} style={{textAlign:"left"}} colSpan={1}>
                                {name}
                            </td>);
                        }else{
                            label=(<td key={td$index++} style={{textAlign:"left"}} colSpan={j==row.length-1?max$cols-j:1}>
                                {name}
                            </td>);
                        }

                        //label=(<span>{dict[coms[0]].name}</span>);
                    }else{//匹配comp字段
                        //默认query控件为最后一个可设字段,在此进行td填充
                        if(coms[0]=='query')
                        {
                            ctrl=<button className="query" onClick={clickHandle}>查询</button>
                            if(autoComplete==true)
                            {
                                tds.push(
                                    <td key={td$index++} style={{textAlign:"center"}} colSpan={j==row.length-1?max$cols-j:1}>
                                        {ctrl}
                                    </td>);

                            }else{
                                tds.push(
                                    <td key={td$index++} style={{textAlign:"left"}}>
                                        {ctrl}
                                    </td>);
                            }
                            return true;
                        }else
                            return false;
                    }


                    if(reserved[coms[1]]!==undefined&&reserved[coms[1]]!==null)
                    {
                        //加入所有当前能够支持的组件分支
                        switch(coms[1])
                        {
                            case 'query':
                                if(state.bean!==null&&state.bean!==undefined) {
                                    if(coms.length>=3)
                                    {
                                        ctrl = <button type='submit' data-query={coms[2]} onClick={clickHandle} style={{width:"100%"}}>
                                            {coms[0]}</button>;
                                    }
                                    else
                                    ctrl = <button type='submit' onClick={clickHandle} style={{width:"100%"}}>
                                        {coms[0]}</button>;
                                }
                                else
                                    ctrl=<button type='submit' onClick={clickHandle} style={{width:"100%"}}>{dict[coms[0]].name}</button>;
                                //当最后一个为query组件时,取消之前的label td
                                label=null;
                                break;
                            case 'input':
                                var ctrlName;
                                if(coms[0].indexOf('=>')!==-1&&coms[0].split('=>').length>=2)
                                {
                                    ctrlName=coms[0].split('=>')[0];
                                }else{
                                    ctrlName=coms[0];
                                }
                                if(state.bean!==null&&state.bean!==undefined)
                                {
                                    if(coms[2]!==null&&coms[2]!==undefined)
                                    {
                                        //input组件扩展至第3个字段
                                        switch(coms[2])
                                        {
                                            case 'false':
                                                ctrl=<input type='text' name={ctrlName} disabled={true}/>
                                                break;
                                            case 'true':
                                                ctrl=<input type='text' name={ctrlName} />
                                                break;
                                            default:
                                                ctrl=<input type='text' name={ctrlName} defaultValue={coms[2]}/>
                                                break;
                                        }
                                    }
                                }
                                else
                                    ctrl=<input type='text' name={ctrlName}/>
                                break;
                            case 'select':
                                if(state.bean!==undefined&&state.bean!==null)
                                {
                                    var ctrlName;
                                    if(coms[0].indexOf('=>')!==-1&&coms[0].split('=>').length>=2)
                                    {
                                        ctrlName=coms[0].split('=>')[0];
                                    }else{
                                        ctrlName=coms[0];
                                    }
                                    if(coms[2]!==null&&coms[2]!==undefined)
                                    {
                                        try{
                                            var arr=eval(coms[2]);
                                            if(Object.prototype.toString.call(arr)=='[object Array]')
                                            {
                                                ctrl=<Select auto={false} ctrlName={ctrlName} disabled={false} data={arr} selectCb={coms[3]!==undefined&&coms[3]!==null?selectHandle:null} data-query={coms[3]}/>
                                            }
                                            else{
                                                ctrl= <Select auto={true} ctrlName={ctrlName} disabled={true}/>
                                            }
                                        }catch(e){
                                            if(coms[2]=='true')
                                            {
                                                ctrl=<Select auto={false} ctrlName={ctrlName} />
                                            }else{
                                                ctrl=<Select auto={false} ctrlName={ctrlName} disabled={true}/>
                                            }
                                        }

                                    }
                                    else
                                        ctrl= <Select auto={true} ctrlName={ctrlName}/>
                                }
                                else
                                {
                                    var options=null;
                                    if(coms[2]!==undefined&&coms[2]!==null)
                                        options=eval(coms[2]);
                                    ctrl= <Select auto={true} ctrlName={coms[0]}
                                                  data={options}/>
                                }
                                break;
                            case 'download':
                                ctrl=<Download attachId={parseInt(coms[0])}/>
                                break;
                            case 'span':
                                if(state.bean!==undefined&&state.bean!==null)
                                {

                                    if(coms[2]!==null&&coms[2]!==undefined)
                                    {
                                        ctrl=<Span auto={false} data={coms[2]}/>
                                    }
                                    else
                                        ctrl=<Span auto={false}/>
                                }else{
                                    var url=dict[coms[0]].url;
                                    var alias=dict[coms[0]].alias;
                                    var query={url:url,
                                        params: {
                                            dictName: alias,
                                            reactPageName:"gradGreenWayPage",
                                            reactActionName:"getDictionaryValue"
                                        }
                                    };
                                    ctrl=<Span query={query} auto={true}/>
                                }

                                break;
                            case 'textarea':

                                if(state.bean!==undefined&&state.bean!==null&&coms[2]!==null)
                                {
                                    var ctrlName;
                                    if(coms[0].indexOf('=>')!==-1&&coms[0].split('=>').length>=2)
                                    {
                                        ctrlName=coms[0].split('=>')[0];
                                    }else{
                                        ctrlName=coms[0];
                                    }
                                    ctrl=<textarea rows={4}  name={ctrlName} style={{width:"100%"}} value={coms[2]}></textarea>
                                }
                                else
                                    ctrl=<textarea rows={4}  name={coms[0]} style={{width:"100%"}}/>
                                break;
                            case 'radio':
                                if(coms[2]!==undefined&&coms[2]!==null)
                                {
                                    ctrl=<Radio ctrlName={coms[0]} data={coms[2]}/>
                                }else{
                                    ctrl=<Radio ctrlName={coms[0]}/>
                                }
                                break;
                            case 'return':

                                    ctrl = <button  onClick={returnCb} style={{width:"100%"}} data-return={props.returnCb}>
                                        {coms[0]}</button>;


                                //当最后一个为query组件时,取消之前的label td
                                label=null;
                                break;
                            default:
                                break;
                        }
                    }
                    if(ctrl!==undefined&&ctrl!==null)
                        ctrl$comp= <td key={td$index++} style={{textAlign:"left"}} colSpan={j==row.length-1?max$cols-j:1}>
                                    {ctrl}
                                </td>;
                    if(autoComplete==true)
                    {
                        tds.push(label);
                        if(ctrl$comp!==undefined&&ctrl$comp!==null)
                            tds.push(ctrl$comp);
                        //tds.push(
                        //    <td key={j} style={{textAlign:"left"}} colSpan={j==row.length-1?max$cols-j:1}>
                        //        {label}
                        //        {ctrl}
                        //    </td>);

                    }else{
                        tds.push(
                            <td key={j}>
                                {label}
                                {ctrl}
                            </td>);
                    }


                });
                trs.push(<tr key={i}>{tds}</tr>);
            })


            var title;
            if(this.props.title!==undefined&&this.props.title!==null)
            {
                title=
                    <tr>
                        <th colSpan={max$cols}>{this.props.title}</th>
                    </tr>

            }
            return(
                <form name="PanelForm" className="form panel" action={this.props.query!==undefined&&this.props.query!==null?this.props.query.url:""}
                      method="post">
                    <div className="row">
                        <div className="col-sm-12">
                            <table className="table table-bordered center panel">
                                <thead>
                                {title}
                                </thead>
                                <tbody>
                                {trs}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>);

        }else{

            if(this.props.auto==true)
                this.fetch();


            return(
                <div className="row">
                    <div className="col-sm-12">
                        <table></table>
                    </div>
                </div>);
        }
    }
});
export default Panel;