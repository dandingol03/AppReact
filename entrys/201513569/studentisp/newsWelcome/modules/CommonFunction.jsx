import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import '../../../../../css/newsWelcome/commonFunction.css';


var SyncStore = require('../../../../../components/flux/stores/SyncStore');
var SyncActions= require('../../../../../components/flux/actions/SyncActions');


var funcs=[
    {
        label:'入学须知',
        route:window.App.getAppRoute()+"/freshmanNavigation/freshman_entranceGuidanceInit.do",
        img:'function1.png'
    },
    {
        label:'基本信息',
        route:window.App.getAppRoute()+"/baseInfoManage/yxStuBaseInfoUpdateInit.do",
        img:'function2.png'
    },
    {
        label:'家庭情况',
        route:"/sduyingxin"+"/baseInfoManage/yxStudent_difficult_survey.do?flag=newStu",
        img:'function3.png'
    },
    {
        label:'到校报到',
        route:"/sduyingxin"+"/trafficplan/trafficPlanInit.do?type=1&flag=newStu",
        img:'function4.png'
    }
];

var trans={
    '0':'one',
    '1':'two',
    '2':'three',
    '3':'four',
    '4':'five',
    '5':'six',
    '6':'seven'
}



var CommonFunction=React.createClass({
    _onFinish:function(){
        var finishes=SyncStore.getFinishes();
        for(var route in finishes)
        {
            console.log("finish route====\r\n" + route);
        }
        this.setState({finishes:finishes});
    },
    getInitialState:function(){
        return ({finishes: null});
    },
    render:function(){

        var menus=new Array();
        var finishes=this.state.finishes;
        funcs.map(function(func,i) {
            var span=null;
            if(finishes!==null&&finishes!==undefined) {
                if(finishes[func.route]==true) {
                    span=   <span style={{position: "absolute",marginLeft: "30px",top: "50px",fontSize:"1.6em"}}>
                                <i className="fa fa-check" style={{color:"#222"}}></i>
                            </span>
                }
            }
            menus.push(
                <div className={"block "+trans[i]} key={i} style={{position:"relative"}}>
                    {span}
                    <div className="functionalAreas">
                        <Link
                            to={App.getAppRoute()+(func.route!==undefined&&func.route!==null?func.route:"")}>
                            <img src={Deploy.getResourceDeployPrefix()+"/images/"+func.img}
                                 alt="功能1"></img>
                        </Link>
                        <span className="functionSpan">
                            {func.label}
                        </span>
                    </div>
                </div>);
        });

        return(
            <div className="commonFunction">
                {menus}
            </div>
        );
    },
    componentDidMount:function(){
        SyncStore.addFinishListener(this._onFinish)
    },
    componentWillMount:function(){
        SyncStore.removeFinishListener(this._onFinish);
    }
});
module.exports=CommonFunction;