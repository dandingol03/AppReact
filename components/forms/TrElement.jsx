import React from 'react';
import TdWrapper from './wrapper/TdWrapper.jsx';
/**
 * @author,danding001
 * @property,rowData(*)
 * @property,rowIndex(typeof *===number)
 * @property,isLineNumberVisible(true|false)
 * @property,multiEnable(false|number)
 */
var TrElement =React.createClass({
    render:function(){
        //TODO:urgent config un-support
        //1.var dw=React.createClass(className,classProps,child1,child2,...,childN)

        var isLineNumberVisible=this.props.isLineNumberVisible;
        var multiEnable=this.props.multiEnable;
        var tdBasic=this.props.tdBasic;
        var widths=this.props.widths;


        var rowData=this.props.rowData;
        var tds;
        if(rowData!==null&&rowData!==undefined)
        {
            tds=new Array();
            var index=0;
            for(var field in rowData)
            {
                var width=null;
                if(widths!==false&&index<widths.length)
                    width=widths[index];
                var item=rowData[field];
                if(item===false||item===true)
                    item=""+item;
                tds.push(<TdWrapper   width={width} tdBasic={tdBasic}
                                    tdData={item} multiEnable={multiEnable} key={index++}/>);
            }
        }
        else{
           tds=(<TdWrapper  tdBasic={tdBasic}
                             multiEnable={multiEnable} />)
        }
        var tr$color;
        if(this.props["tr-color"]!==undefined&&this.props["tr-color"]!==null) {
            tr$color = {backgroundColor:this.props["tr-color"]};
        }
        if(isLineNumberVisible===true)
        {
            return (<tr  style={tr$color} >
                <td>{this.props.rowIndex}</td>
                {tds}
            </tr>)
        }else{
            return (<tr style={tr$color}>
                {tds}
            </tr>)
        }

    }
});
export default TrElement