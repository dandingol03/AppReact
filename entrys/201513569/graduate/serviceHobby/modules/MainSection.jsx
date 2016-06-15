import React from 'react';
import {render} from 'react-dom';
import PasswordModify from '../password/PasswordModify.jsx';
import AllCourseQuery from './../allCourseQuery/allCourseQueryMain.jsx';
import News from './News.jsx';
import '../../../../../css/serviceHobby/basic/mainSection.css';
var SyncActions = require('../../../../../components/flux/actions/SyncActions');


var MainSection = React.createClass({
    syncHandle     : function (ob) {
        //TODO:create new ob or update...
        var route = this.state.route[0];
        var label;
        switch (route)
        {
            case "/password/modify":
                label = "密码修改";
                break;
            case "/allCourseQuery":
                label = "成绩查询";
                break;
            case "/news":
                label = "查看新闻";
                break;
            default:
                label = "";
                break;
        }
        if (ob.completed) {
            SyncActions.cleanRoute(route);
        }
        else
            SyncActions.updateData(route, ob.required, label);
    },
    getInitialState: function () {
        var route = new Array();
        route.push(undefined);
        return ({route: route});
    },
    render:function(){
        var path=this.props.route.path;
        var ctrl;
        var breadcrumb;
        var label;
        if(path!==undefined&&path!==null)
        {
            var route = this.state.route;
            if (route.length != 1)
                route.splice(0, 1);
            route.push(path);
            switch(path)
            {
                case App.getAppRoute() + "/password/modify":
                    ctrl=<PasswordModify/>
                    label = "密码改业务";
                    break;
                case App.getAppRoute() + "/allCourseQuery":
                    ctrl = <AllCourseQuery syncHandle={this.syncHandle} route={path}></AllCourseQuery>
                    label = "成绩查询业务";
                    break;
                case App.getAppRoute() + "/news":
                    ctrl = <News query={{
                                             url:"/bsuims/reactPageDataRequest.do",
                                            params:{
                                                reactPageName:"groupNewsReactPage",
                                                reactActionName:"listTypeNewsUseReact"
                                            }
                                         }}
                                 auto={true}/>;
                    label = "新闻查询业务";
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
            breadcrumb =
                <div className="crumb_box">
                    <div className="crumb_title">
                        <span className="crumb_title_content">{spans}</span>

                        <div className="crumb_detail">{label}</div>
                    </div>
                </div>
        }
        return (
            <div style={{margin: "100px auto 0 auto",paddingBottom:"200px",width:"100%",backgroundColor:"#edf7ff"}}>
                {breadcrumb}
                <div ref="mainSection" className="mainSection"
                     style={{display:"none",width:"1024px",marginLeft:"auto",marginRight:"auto"}}>
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
        //TODO:emit change
        $(this.refs["mainSection"]).slideUp(300);
        //TodoStore.removeChangeListener(this._onChange);
    }
});
export default MainSection;