import React from 'react';
import {render} from 'react-dom';
import dict from '../../data/json/dictionary.json';

var Select=React.createClass({
    dataInitial:function(){
            if(dict[this.props.ctrlName]!==undefined&&dict[this.props.ctrlName]!==null) {
                this.queryHandle(
                    null,
                    dict[this.props.ctrlName].url,
                    {
                        dictName:dict[this.props.ctrlName].alias
                    },
                    null,
                    function(response){
                        //这里需要统一规范后台返回的数据格式
                        if(response.arr!==undefined&&response.arr!==null)
                            this.setState({data:response.arr,data$initialed:true});
                        else
                            console.log("type of response is wrong");
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
    selectCb:function(evt){
        var target=evt.target;
        this.setState({selected:target.value});
    },
    getInitialState:function(){
        var auto;
        if(this.props.auto!==undefined&&this.props.auto!==null)
        {
            auto=this.props.auto;
        }

        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data=this.props.data;
        }

        var data$initialed;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data$initialed=true;
        }
        else
            data$initialed=false;





       return({selectedIndex:-1,auto:auto,data$initialed:data$initialed,data:data});
    },
    render:function(){
     if(this.state.data$initialed==true&&Object.prototype.toString.call(this.state.data)=='[object Array]')
     {
         var options=new Array();
         var selectCb=this.selectCb;
         this.state.data.map(function(item,i) {
            options.push(<option value={item.value} key={i}>{item.label}</option>);
         });
        return(
            <div style={{display:'inline'}}>
                <input name={this.props.ctrlName} style={{display:"none"}} value={this.state.selected}/>
                <select onChange={selectCb}>
                    <option key={-1} value={-1}>请选择</option>
                    {options}
                </select>
            </div>
        );
     }else{
         if(this.props.auto==true)
            this.dataInitial();

         return(<select ></select>);
     }


    }
});
export default Select;
