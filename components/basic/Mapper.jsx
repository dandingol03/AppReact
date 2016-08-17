import React from 'react';
import {render} from 'react-dom';
import OrdinaryTable from '../../components/forms/OrdinaryTable.jsx';
import '../../css/components/basic/mapper.css';
import Select from './Select.jsx';
var ProxyQ=require('../proxy/ProxyQ');

var Mapper=React.createClass({
    plusCb:function(){
        window.App.fieldRemodal.content({'label':"添加字段"});
        window.App.fieldRemodal.show();
    },
    minusCb:function(index){
        var fields=this.state.fields;
        fields.splice(index,1);
        this.setState({fields:fields});
    },
    queryCb:function(){

    },
    fetch:function() {
        var url = this.props.bean.url;
        var params = this.props.bean.params;
        console.log('url====' + url);
        ProxyQ.queryHandle(
            null,
            this.props.bean.url,
            this.props.bean.params,
            null,
            function (response) {
                //这里需要统一规范后台返回的数据格式
                var tables = new Object();
                if (response.data !== undefined && response.data !== null && response.data != "") {

                    tables = response.data;
                }
                else
                    console.log("type of response is wrong");
                if (tables !== null)
                    this.setState({tables:tables});

            }.bind(this)
        );
    },


    getInitialState: function(){
        var fields=null;
        var tables=null;
        if(this.props.fields!==undefined&&this.props.fields!==null){
            fields=this.props.fields;
        }
        if(this.props.tables!==undefined&&this.props.tables!==null){
            tables=this.props.tables;
        }

        return {currentIndex: 0,fields:fields,tables:tables}
    },

    _onAdd:function(data){
        let table=data.detail;
        let fields=this.state.fields;
        if(table!==undefined&&table!==null){
            var tableInfo={label:table};
            fields.push(tableInfo);
            this.setState({fields:fields});
        }

    },

    render: function() {
        var tabs = new Array();
        var filterField = {};
        var tools = [];
        var dataTabs = [];
        var table=null;
        var state = this.state;
        var tabCb = this.tabCb;

        var query = {
            url: "/bsuims/reactPageDataRequest.do",
            params: {
                reactPageName: "newCultivateAllCourseQueryPage",
                reactActionName: "allCourseQueryDoQuery"
            }
        }

        if (this.state.tables !== undefined && this.state.tables !== null) {
            var arr = this.state.tables;
                table = <Select auto={false} ctrlName='表名' disabled={false} data={arr}/>;

                if (this.state.fields !== undefined && this.state.fields !== null) {
                    var that = this;
                    this.state.fields.map(function (field, i) {
                        tabs.push(
                            <li key={i}>
                                <span>{field.label}</span>
                                <span className="fa fa-minus minus" onClick={that.minusCb.bind(that,i)}></span>
                            </li>);
                    });


                    this.state.fields.map(function (ele, i) {
                        var field = ele.label;
                        filterField[field] = "true";
                    });

                }

                    return (

                        <div className="mapper">
                            <div className="header">
                                {table}
                                <ul >
                                    {tabs}
                                </ul>

                                <div className="tools">
                                    <span className="fa fa-plus" onClick={this.plusCb}></span>
                                    <span className="fa fa-circle-o-notch" onClick={this.queryCb}></span>
                                </div>
                            </div>
                            <OrdinaryTable  filterField={filterField}
                                />
                        </div>
                    );


        }
        else {
            this.fetch();
            return (<div></div>);
        }
    },
    componentDidMount:function(){
         var dom_node=$("#mapper_re_modal")[0];
         dom_node.addEventListener("_addTable",this._onAdd);
    }

});
module.exports=Mapper;