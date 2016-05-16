import React from 'react';
import {render} from 'react-dom';
import Download from '../../../components/basic/Download.jsx';
import Panel from '../../panel/Panel.jsx';
import OrdinaryTable from '../../forms/OrdinaryTable.jsx';
var  ProxyQ =require('../../proxy/ProxyQ.js');


var PanelTable=React.createClass({
    recurse:function(pool,rule,in$param,out$param,group$field){
        if(pool!==undefined&&pool!==null)
        {
            if(Object.prototype.toString.call(pool)=='[object Array]')
            {
                for(var i=0;i<pool.length;i++)
                {
                    var prefix=rule;
                    prefix+=pool[i].v;
                    if(pool[i].r!==undefined&&pool[i].r!==null)
                    {
                        prefix+='|';
                        this.recurse(pool[i].r,prefix,in$param,out$param,group$field);
                    }else{
                        //当递归至叶结点时,重新压入数据

                        in$param.map(function(row,j) {
                            var matchs='';
                            group$field.map(function(field,k) {
                                matchs+=row[field];
                                if(k!=group$field.length-1)
                                    matchs+='|';
                            });
                            if(matchs==prefix)
                                out$param.push(row);
                        });
                    }
                }
            }
        }

    },
    //该方法返回false或该键在数组的下标
    existedIn:function(d2,pool){
        var existed=false;
        for(var i=0;i<pool.length;i++)
        {
            if(pool[i].v==d2)
            {
                existed=i;
                break;
            }
        }
        return existed;
    },
    group:function(data,group$field) {

        var pool=new Array();
        var existedIn=this.existedIn;
        data.map(function(row,i) {
            var ob;
            var re;
            var p=pool;
            //初始化pool
            group$field.map(function(field,j) {
                //如果该分组字段不位于队尾
                if(j!=group$field.length-1)
                {
                    re=existedIn(row[field],p);
                    if(re===false)//如果pool中没有此键
                    {
                        ob=new Object();
                        ob.v=row[field];
                        ob.c=1;
                        ob.r=new Array();
                        p.push(ob);
                    }else{
                        ob=p[re];
                        ob.c++;
                    }
                    p=ob.r;
                }else{
                    re=existedIn(row[field],p);
                    if(re===false)
                    {
                        ob=new Object();
                        ob.v=row[field];
                        ob.c=1;
                        p.push(ob);
                    }else{
                        ob=p[re];
                        ob.c++;
                    }
                }
            });
        });

        //重新生成数据
        var gen=new Array();
        this.recurse(pool,'',data,gen,group$field);
        //根据重新生成的数据源gen进行pool的i设置

        return [pool,gen];
    },
    clickHandle:function(ob){
        if(this.props.query!==undefined&&this.props.query!==null)//本地配置查询按钮的路径
        {
            var params;
            if(ob.params!==undefined&&ob.params!==null&&Object.prototype.toString.call(ob.params)=='[object String]')
            {
                params=Object.assign(this.props.query.params,JSON.parse(ob.params));
            }
            else
                params=Object.assign(this.props.query.params,ob.params);
            ProxyQ.queryHandle(
                null,
                this.props.query.url,
                params,
                null,
                function(response){
                    //这里需要统一规范后台返回的数据格式
                    var ob=new Object();
                    if(response.arr!==undefined&&response.arr!==null)
                        ob.data=response.arr;
                    var pool;
                    if(ob.data!==undefined&&ob.data!==null)
                    {
                        if(this.props.group$field!==undefined&&this.props.group$field!==null)
                        {
                            var arr=this.group(this.props.data,this.props.group$field);
                            ob.data=arr[1];
                            ob.pool=arr[0];
                        }
                    }



                    if(response.tail!==undefined&&response.tail!==null)
                    {
                        try{
                            ob.tail=eval(response.tail);
                        }catch(e)
                        {
                            alert("error="+e);
                        }
                    }
                    if(response.translation!==undefined&&response.translation!==null)
                        ob.translation=response.translation;
                    this.setProps(ob);
                }.bind(this)
            );
        }
        else{
            this.queryHandle(
                null,
                ob.url,
                ob.params,
                null,
                function(response){
                    //这里需要统一规范后台返回的数据格式
                    var ob=new Object();
                    if(response.arr!==undefined&&response.arr!==null)
                        ob.data=response.arr;
                    if(response.tail!==undefined&&response.tail!==null)
                    {
                        try{
                            ob.tail=eval(response.tail);
                        }catch(e)
                        {
                            alert("error="+e);
                        }
                    }
                    if(response.translation!==undefined&&response.translation!==null)
                        ob.translation=response.translation;
                    this.setProps(ob);
                }.bind(this)
            );
        }
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
                console.error(this.props.url, status, err.toString());
            }
        });
    },
    getInitialState:function(){

        var comps;
        if(this.props.comps!==undefined&&this.props.comps!==null)
        {
            comps=this.props.comps;
        }


        return({comps:comps});
    },
    render:function(){


        return (
            <div className="row">
                <div className="col-sm-12 col-md-12">
                <Panel
                    data={this.state.comps}
                    auto={true}
                    bean={this.props.bean}
                    autoComplete={true}
                    query={this.props.query}
                    clickHandle={this.clickHandle}
                    />
                <OrdinaryTable
                    autoFetch={false}
                    data={this.props.data}
                    pool={this.props.pool}
                    translation={this.props.translation}
                    filterField={this.props.filterField}
                    title="论文匿命评阅"
                    />
                </div>

            </div>
           )




    }
});
export default PanelTable;