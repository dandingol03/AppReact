import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/hide.css';

/**
 * 1.本组件完成子组件的包装加壳
 * 2.本组件完成显示状态的控制
 */

var Hide=React.createClass({
    transitinStatus:function(){

        this.setState({status:!this.state.status});
    },
    getInitialState:function(){

        var status=false;
        if(this.props.status!==undefined&&this.props.status!==null)
            status=this.props.status;

        return ({status:status})
    },
    componentWillReceiveProps:function(props)
    {
        if(props,status!==undefined&&props.status!==null)
        {
            this.setState({status:!this.state.status});
        }
    },
    render:function(){

        console.log();
        console.log();
        console.log();
        console.log();
        if(this.state.status==false)
        {
            return (
                <div >
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        }else{
            return (
                <div style={{display:"none"}}>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        }



    }
});
export default Hide;