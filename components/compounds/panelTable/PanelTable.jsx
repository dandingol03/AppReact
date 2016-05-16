import React from 'react';
import {render} from 'react-dom';
import Download from '../../../components/basic/Download.jsx';
import Panel from '../../panel/Panel.jsx';
import OrdinaryTable from '../../forms/OrdinaryTable.jsx';
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
                    data={this.props.data}
                    tail={this.props.tail}
                    filterField={this.props.filterField}
                    translation={this.props.translation}
                    />
                </div>
            </div>



           )




    }
});
export default PanelTable;