import React from 'react';
import {render} from 'react-dom';
import dict from '../../data/json/dictionary.json';

var Radio=React.createClass({
    changeCb:function(evt){
        var target=evt.target;
        console.log();
        console.log();

    },
    render:function(){
        var radios;
        var props=this.props;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            radios=new Array();
            var changeCb=this.changeCb;
            props.data.map(function(item,i) {
                radios.push(
                    <div style={{display:"inline"}} key={i}>
                        <span style={{margin:"0px 20px"}}>{item.label}</span>
                        <input type="radio" value={item.value} name={props.ctrlName} onChange={changeCb}/>
                    </div>
                );
            });
        }
        return (
            <div>
                {radios}
            </div>
        )
    }
});
export default Radio;