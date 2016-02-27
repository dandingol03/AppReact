/**
 * Created by dandi_000 on 2016/2/25.
 */

import React from 'react';
import TrElement from './TrElement.jsx';
import ButtonElement from '../basic/ButtonElement.jsx';
import DropDownButtonElement from '../basic/DropDownButtonElement.jsx';
import ComboBox from  '../basic/ComboBox.jsx';

var Table=React.createClass({
    queryCallBack:function(ob){
        var data=ob.data;
        var titles=new Array();
        for(var field in ob.data[0])
        {
            titles.push(field);
        }

        var cols=titles.length;
        if(cols!==undefined&&cols!==null) {
            if(cols<1)
                cols=1;
        }
        else
            cols=1;
        this.setState({data:ob.data,cols:cols,titles:titles});
    },
    getInitialState:function() {
        //data optional,table component will be renderd when data first be injected if null
        var data = this.props.data;
        //1.columns（title，width，field,tdBasic) required data-option option
        //
        //2.columns
        //TODO:search for duplicate field

        //tdBasic是否单态
        var tdBasic = this.props.tdBasic;
        if (tdBasic === null || tdBasic === undefined || tdBasic === true)
            tdBasic = true;
        else
            tdBasic = false;
        //
        var multiEnable = this.props.multiEnable;
        if (multiEnable === undefined || multiEnable === null || multiEnable === false || isNaN(parseInt(multiEnable)))
            multiEnable = 1;


        //width,表格总长
        var width = this.props.width;
        if (width !== undefined && width !== null) {
            if (!isNaN(width))
                width += "px";
            var pattern = /px$/g;
            if (!pattern.test(width))
                throw "width invalid,you should pass a number or a string like .px";
        }

        //cell width customer
        var widths;
        //components list
        var components;
        if(this.props["data-options"]!==null&&this.props["data-options"]!==undefined)
        {
            var options=this.props["data-options"];
            //widths fetch
            if(options.widths!==null&&options.widths!==undefined)
            {
                widths=options.widths;
            }
            //components fetch
            if(options.components!==null&&options!==undefined)
            {
                components=options.components;
            }
        }

        //cols should be changed since data injected every time
        var cols;
        if(this.props.cols!==undefined&&this.props.cols!==null&&!isNaN(parseInt(this.props.cols)))
        {
            cols=this.props.cols;
        }
        else
            cols=1;

        return {
            width: width, widths:widths,cols:cols,components:components,
            multiEnable: multiEnable, tdBasic: tdBasic, data: data
        };
    }
    ,
    render:function(){


        {/*css style width*/}
        var w=this.state.width;
        var widthStyle=null;
        if(w!==undefined&&w!==null)
        {
            widthStyle={width:w }
        }else
            {
                widthStyle = {width: "100%"}
            }

        {/*css style center*/}
        var center;
        if(this.props.center===true)
        center=true;
        var centerStyle={
            textAlign: "center",
            marginLeft:"auto",
            marginRight:"auto"
        }


        var isLineNumberVisible=this.props.isLineNumberVisible
        if(isLineNumberVisible===undefined||isLineNumberVisible===null)
         isLineNumberVisible=false;
        else
         isLineNumberVisible=true;

        //tbody表头
        var titles;
        var ths;
        if(this.state.titles!==null&&this.state.titles!==undefined&&this.state.titles.length>0)
        {
            titles=this.state.titles.map(function(item,i) {
                return(<th key={i}>{item}</th>);
            });
        }
        if(titles!==null&&titles!==undefined)
        {
            ths=(<tr>{titles}</tr>);
        }



        if(isLineNumberVisible===true)
            titles.splice(0,0,"<th>#<th>");
        var multiEnable=this.state.multiEnable;
        var tdBasic=this.state.tdBasic;

        var widths=this.state.widths;
        var rows;
        if(this.state.data!==undefined&&this.state.data!==null){
             rows=this.state.data.map(function(item,i) {
                return (<TrElement  tdBasic={tdBasic} rowData={item} rowIndex={i}
                                    multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                                    widths={widths}  key={i}/>);
            });
        }
        else{
            rows=<TrElement  tdBasic={tdBasic}
                             multiEnable={multiEnable} isLineNumberVisible={isLineNumberVisible}
                             widths={widths}  />
        }

        {/*var queryOb={
            url:'.do',
            params:{formName:'getEditPanel',pageName:'balabala'},
            handle:this.queryHandle
        }*/}


        {/*<input type="text" className="form-control" placeholder="Search"/>-->*/}
        {/*   <DropDownButtonElement
         title="请选择年级"
         menus={menus}
         />*/}
        var querycb=this.queryCallBack;
        var components;
        if(this.state.components!==undefined&&this.state.components!==null)
        {
            components=this.state.components.map(function(item,i) {
                if (item.type == "query")//查询组件
                {
                    return (<ButtonElement  type="button"
                                            buttonClass="btn btn-default" title={item.name}
                                           query={item} handle={querycb} key={i}/>)
                }
                if(item.type=="dropdown")//下拉组件
                {
                    var name=item.name;
                   return(<DropDownButtonElement
                       title={name}
                       params={item.params} key={i}
                       />)
                }
            })
        }

    return(
        <table className="table table-bordered center" style={Object.assign(centerStyle,widthStyle)}>
            <thead>
            <tr>

                <th colSpan={this.state.cols}>
                    {components}
                </th>
            </tr>
            </thead>
            <tbody>
            {ths}
            {rows}
             </tbody>
        </table>
    );
    }
});

export default Table