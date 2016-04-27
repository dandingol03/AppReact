import React from 'react';
import {render} from 'react-dom';
import '../../css/components/forms/ordinaryTable/OrdinaryTable.css';

var OrdinaryTable =React.createClass({
    group:function(data){
        var grouped;
        var pool=new Object();
        var state=this.state;
        data.map(function(row,i) {

            var str='';
            state.group$field.map(function(field,j) {
                str+=row[field]
                if(j!==state.group$field.length-1)
                str+="|";
            });
            var link=str.split('|');

        })


        return grouped;
    },
    fetch:function(){
        this.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function(response){

                var data;
                if(this.state.group$field!==undefined&&this.state.group$field!==null)
                    data=this.group(response);
                else
                    data=response;
                this.setState({data:data,data$initialed:true});
            }.bind(this)
        )
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
        //自动拉取服务器数据
        var autoFetch;
        if(this.props.autoFetch!==undefined&&this.props.autoFetch!==null)
            autoFetch=this.props.autoFetch;
        else
            autoFetch=false;

        //数据是否绑定
        var data$initialed;
        if(this.props.data!==undefined&&this.props.data!==null)
            data$initialed=true;
        else
            data$initialed=false;

        //分组字段
        var group$field;
        if(this.props["group-field"]!==undefined&&this.props["group-field"]!==null)
            group$field=this.props["group-field"];

        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            if(group$field!==null&&group$field!==undefined&&Object.prototype.toString.call(group$field)=='[object Array]')
            {
                data=this.group(this.props.data);
            }else{
                data=this.props.data;
            }
            data$initialed=true;
        }else{
            data$initialed=false;
        }
        return ({autoFetch:autoFetch,data$initialed:data$initialed,
                group$field:group$field,data:data});
    },
    render:function(){
        if(this.state.data$initialed!==true)
        {
            if(this.state.autoFetch==true)
                this.fetch();
            return (
               <table>
               </table>
            )
        }else{
            var colSpan=1;
            var trs;
            if(Object.prototype.toString.call(this.state.data)=="[object Array]"&&this.state.data.length>1)
            {
                colSpan=0;
                for(var field in this.props.data[0])
                {
                    colSpan++;
                }
                trs=new Array();
                this.state.data.map(function(row,i) {
                    var tds=new Array();
                    var j=0;
                    for(var field in row)
                    {
                        tds.push(
                            <td key={j ++}>
                                {row[field]}
                            </td>);
                    }

                    trs.push(
                        <tr key={i}>
                            {tds}
                        </tr>
                    )

                });


            }

            return (
                <table className="table table-bordered center">
                <thead>
                <tr>
                    <th colSpan={colSpan}>{this.props.title}</th>
                </tr>
                </thead>
                <tbody>
                {trs}
                </tbody>
            </table>
            )

        }


    }
});
export default OrdinaryTable;