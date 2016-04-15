import React from 'react';
import {render} from 'react-dom';
import '../../css/components/forms/ordinaryTable/OrdinaryTable.css';

var OrdinaryTable =React.createClass({
    fetch:function(){
        this.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function(response){
                this.setProps({data:response,data$initialed:true});
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


        return ({autoFetch:autoFetch,data$initialed:data$initialed});
    },
    componentWillReceiveProps:function(props)
    {
        //更新data$initialed状态
        if(props.data$initialed!==undefined&&props.data$initialed!==null)
            this.setState({data$initialed:props.data$initialed});
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
            if(Object.prototype.toString.call(this.props.data)=="[object Array]"&&this.props.data.length>1)
            {
                colSpan=0;
                for(var field in this.props.data[0])
                {
                    colSpan++;
                }
                trs=new Array();
                this.props.data.map(function(row,i) {
                    var tds=new Array();
                    row.map(function(cell,j) {

                       tds.push(
                           <td key={j}>
                           {cell}
                           </td>);
                    });
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