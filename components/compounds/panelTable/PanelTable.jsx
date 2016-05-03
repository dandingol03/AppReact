import React from 'react';
import {render} from 'react-dom';
import Download from '../../../components/basic/Download.jsx';
import Panel from '../../panel/Panel.jsx';
import OrdinaryTable from '../../forms/OrdinaryTable.jsx';

var PanelTable=React.createClass({
    clickHandle:function(ob){
        if(this.props.query!==undefined&&this.props.query!==null)
        {
            var params;
            params=Object.assign(this.props.query.params!==null&&this.props.query.params!==undefined?this.props.query.params:'',
                ob!==undefined&&ob!==null?ob:'');
            this.queryHandle(
                null,
                this.props.query.url,
                params,
                null,
                function(response){
                    //这里需要统一规范后台返回的数据格式
                    this.setProps({data:response.arr});
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
                <div className="col-sm-12">
                <Panel
                    data={this.state.comps}
                    bean={this.props.bean}
                    auto={true}
                    autoComplete={true}
                    query={this.props.query}
                    clickHandle={this.clickHandle}
                    />
                <OrdinaryTable
                    autoFetch={false}
                    data={this.props.data}
                    filterField={this.props.filterField}
                    />
                </div>
            </div>



           )




    }
});
export default PanelTable;