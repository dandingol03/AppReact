import React from 'react';
import {render} from 'react-dom';
import Download from '../../../components/basic/Download.jsx';
import Panel from '../../panel/Panel.jsx';
import OrdinaryTable from '../../forms/OrdinaryTable.jsx';
import Pagination from '../../../components/basic/Pagination.jsx';
var ProxyQ=require('../../proxy/ProxyQ');

var PanelTable=React.createClass({
    clickHandle:function(ob){
        if(this.props.query!==undefined&&this.props.query!==null)
        {
            var params;
            params=Object.assign(this.props.query.params!==null&&this.props.query.params!==undefined?this.props.query.params:'',
                ob!==undefined&&ob!==null?ob:'');
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
                    if(response.tail!==undefined&&response.tail!==null)
                    {
                        try{
                            ob.tail=eval(response.tail);
                        }catch(e)
                        {
                            alert("error="+e);
                        }
                    }
                    if(response.translation!==undefined&&response.translation!==null){
                        ob.translation=response.translation;
                    }
                    if(response.pageInfo!==undefined&&response.pageInfo!==null)
                    {
                        ob.pageInfo=response.pageInfo;
                    }
                    else {
                        var length = ob.data.length;
                        console.log();
                        console.log();
                        ob.pageInfo = {
                            perSize: 40,
                            size   : length
                        };
                    }

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
    pageCb:function(ob){
        if(Object.prototype.toString.call(ob)=='[object Object]')
        {
            this.setState({pageInfo: ob});
        }
    },
    goGetPageData:function(data)
    {
        if(data!==undefined&&data!==null)
        {
            var selected = 0;
            var perSize = 40;
            if (this.state.pageInfo !== undefined && this.state.pageInfo !== null) {
                selected = this.state.pageInfo.selected;
                perSize = this.state.pageInfo.perSize;
            }
            return data.slice(selected * perSize, (selected + 1) * perSize > data.length ? data.length : (selected + 1) * perSize);
        }

    },
    getInitialState:function(){

        var comps;
        if(this.props.comps!==undefined&&this.props.comps!==null)
        {
            comps=this.props.comps;
        }

        return({comps:comps});
    },
    renderPage : function () {
        var pagination = null;
        if (this.props.pagination == true) {
            pagination = <Pagination pageCb={this.pageCb}
                                     perSize={this.props.pageInfo!==undefined&&this.props.pageInfo!==null?this.props.pageInfo.perSize:40}
                                     size={this.props.data!==undefined&&this.props.data!==null?this.props.data.length:0}/>;
        }
        return pagination;
    },
    render:function(){
        var data;
        if(this.props.pagination==true)
        {
            data=this.goGetPageData(this.props.data);
        }
        else
            data=this.props.data;

        return (
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <Panel
                        data={this.state.comps}
                        bean={this.props.bean}
                        auto={true}
                        auto={true}
                        bean={this.props.bean}
                        autoComplete={true}
                        query={this.props.query}
                        clickHandle={this.clickHandle}
                        />
                    <OrdinaryTable
                        autoFetch={false}
                        data={data}
                        tail={this.props.tail}
                        filterField={this.props.filterField}
                        translation={this.props.translation}
                        />
                    {this.renderPage()}
                </div>
            </div>



           )




    }
});
export default PanelTable;