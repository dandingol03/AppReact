import React from 'react';
import {render} from 'react-dom';
import PasswordModify from '../password/PasswordModify.jsx';
var  TodoStore = require('../../../../../components/flux/stores/TodoStore');

var MainSection = React.createClass({
    _onChange: function() {
        var stores= TodoStore.getAll();
        for(var id in stores)
        {
            console.log("id="+stores[id].id);
            console.log("text="+stores[id].text);
            console.log();
        }
    },
    render:function(){
        var path=this.props.route.path;
        var ctrl;
        if(path!==undefined&&path!==null)
        {
            switch(path)
            {
                case "/password/modify":
                    ctrl=<PasswordModify/>
                    break;
                default:
                    break;
            }
        }
        return (
            <div ref="mainSection" style={{display:"none",margin: "300px auto 60px auto",width:"980px"}}>
                {ctrl}
            </div>
        );


    },
    componentDidMount: function() {
        //TodoStore.addChangeListener(this._onChange);
        $(this.refs["mainSection"]).slideDown(300);
    },

    componentWillUnmount: function() {
        $(this.refs["mainSection"]).slideUp(300);
        //TodoStore.removeChangeListener(this._onChange);
    }
});
export default MainSection;