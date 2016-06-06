import React from 'react';
import {render} from 'react-dom';
import PasswordModify from '../password/PasswordModify.jsx';
import '../../../../../css/serviceHobby/basic/mainSection.css';
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
        var breadcrumb;
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

            var paths=path.split("/");
            var spans=new Array();
            if(paths[0]==""&&paths[1]=="")
            {
                spans.push(<span className="separator" key={0}>/</span>);
            }else{
                var k=0;
                paths.map(function(item,i) {
                    if(i==0)
                        spans.push(<span className="separator" key={k++}></span>);
                    else
                    {
                        spans.push(<span className="path-segment" key={k++}>{item}</span>);
                        if(i!==paths.length-1)
                            spans.push(<span className="separator" key={k++}>/</span>);
                    }

                });
            }
            breadcrumb=
                <div className="breadcrumb" style={{backgroundColor:"#edf7ff"}}>
                    {spans}
                </div>
            breadcrumb =
                <div className="crumb_box">
                    <div className="crumb_title">
                        <span className="crumb_title_content">{spans}</span>

                        <div className="crumb_detail">密码修改业务</div>
                    </div>
                </div>
        }
        return (
            <div style={{margin: "100px auto 0 auto",width:"100%",backgroundColor:"#edf7ff"}}>
                {breadcrumb}
                <div ref="mainSection" style={{display:"none"}}>
                    {ctrl}
                </div>
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