import React from 'react';
import {render} from 'react-dom';
import OrdinaryTable from '../../components/forms/OrdinaryTable.jsx';
import '../../css/components/basic/mapper.css';


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
    getInitialState: function(){
        var fields=null;
        if(this.props.fields!==undefined&&this.props.fields!==null){
            fields=this.props.fields;
        }


        return {currentIndex: 0,fields:fields}
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

    render: function(){
        var tabs=new Array();
        var tools=[];
        var dataTabs=[];
        var state=this.state;
        var tabCb=this.tabCb;
        if(this.state.fields!==undefined&&this.state.fields!==null)
        {
            var that=this;
            this.state.fields.map(function(field,i) {
                tabs.push(
                    <li key={i}>
                        <span>{field.label}</span>
                        <span className="fa fa-minus minus" onClick={that.minusCb.bind(that,i)}></span>
                    </li>);
            }) ;
        }



        var query={
            url:"/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:"newCultivateAllCourseQueryPage",
                reactActionName:"allCourseQueryDoQuery"
            }
        }


        if(this.state.fields!==undefined&&this.state.fields!==null&&this.state.fields.length>0){

            var filterField={};
            this.state.fields.map(function(ele,i){
                var field=ele.label;
                filterField[field] = "true";
            })

            return (

                <div className="mapper">
                    <div className="header">
                        <ul >
                            {tabs}
                        </ul>

                        <div className="tools">
                            <span className="fa fa-plus" onClick={this.plusCb}></span>
                            <span className="fa fa-circle-o-notch" onClick={this.queryCb}></span>
                        </div>
                    </div>

                    <OrdinaryTable
                        filterField={filterField}
                        />
                </div>
            )
        }
        else{

            return (

                <div className="mapper">
                    <div className="header">
                        <ul >
                            {tabs}
                        </ul>

                        <div className="tools">
                            <span className="fa fa-plus" onClick={this.plusCb}></span>
                            <span className="fa fa-circle-o-notch" onClick={this.queryCb}></span>
                        </div>
                    </div>


                </div>
            )
        }

    },
    componentDidMount:function(){
         var dom_node=$("#mapper_re_modal")[0];
         dom_node.addEventListener("_addTable",this._onAdd);
    }


});
module.exports=Mapper;