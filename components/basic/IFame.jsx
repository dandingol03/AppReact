import React from 'react';
import {render} from 'react-dom';

let IFrame=React.createClass({
    getWidth:function(){
     return this.props.width!==undefined&&this.props.width!==null?this.props.width:"100%";
   },
    getHeight:function(){
        return this.props.height!==undefined&&this.props.height!==null?this.props.height:"100%";
    },
    getSrc:function(){
        let src=null;
        if(this.props.src!==undefined&&this.props.src!==null)
        {
            src=this.props.src;
            if(this.props.params!==null&&this.props.params!==undefined)
            {
                src += "?";
                for(let property in this.props.params)
                {
                    src+=property+'='+this.props.params[property];
                    src+='&';
                }
                src=src.substring(0,src.length-1);
            }
        }

        return src;
    },
   render:function(){
       return <iframe src={this.getSrc()}
                      width={this.getWidth()}
                      height={this.getHeight()}
                      frameBorder="no"></iframe>
   }
});
module.exports=IFrame;