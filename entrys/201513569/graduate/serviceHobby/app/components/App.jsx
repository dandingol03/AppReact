import React from 'react';
import {render} from 'react-dom';
var Nav = require('../../../../../../components/basic/Nav.jsx');
import IndexScroll from '../../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../../components/basic/ScaleBar.jsx';
var News = require('./News.jsx');
import CustomMenu from '../../../../../../components/basic/CustomMenu.jsx';
import HighLight from '../../../../../../components/basic/HighLight.jsx';
import Footer from '../../../../../../components/basic/Footer.jsx';
import Home from './Home.jsx';
import '../../../../../../css/serviceHobby/basic/app.css';
var MENU = require('../../data/menus.json');
var Scales = require('../../data/scaleBar.json');
var Scrolls = require('../../data/scrolls.json');

var App = React.createClass({
    app$init         : function () {

    },
    getRender        : function () {
        if (this.props.children !== undefined && this.props.children !== null)
            return this.props.children;
        else
            return <Home/>
    },
    render           : function () {

        return (
        /**
         * header box part
         */
            <div>
                <Nav logo="images/school_logo.png" data={MENU}/>

                <div className="keyNavigation">
                    <div className="top">
                        <div className="block left">
                            <div className="briefInformation">
                                <ul>
                                    <li>李四同学（201513557），早上好</li>
                                    <li>软件学院</li>
                                </ul>
                            </div>
                        </div>
                        <div className="block">
                            <div className="verticalBar"></div>
                        </div>
                        <div className="block center">
                            <div className="briefInformation">
                                <ul>
                                    <li>您有N条公告信息 <a href="#">更多》</a></li>
                                    <li> &nbsp;&nbsp;2016年6月1日放假的通知...</li>
                                    <li>您有7条未读信息 <a href="#">更多》</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="block">
                            <div className="verticalBar"></div>
                        </div>
                        <div className="block right">
                            <div className="briefInformation">
                                <ul>
                                    <li>登录次数：共100次</li>
                                    <li>上次登录：2016/05/06 10:03:03</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="commonFunction">
                            <div className="block one">
                                <div className="functionalAreas">
                                    <a href="#" onclick="LinkClickFunction(this)">
                                        <img src="images/function1.png" alt="功能1"></img>
                                     </a>
                                    <span className="functionSpan">申请绿色通道</span>
                                </div>
                            </div>
                            <div className="block two">
                                    <div className="functionalAreas">
                                        <a href="#" onclick="LinkClickFunction(this)">
                                            <img src="images/function2.png" alt="功能1"></img>
                                        </a>
                                        <span className="functionSpan">申请宿舍</span>
                                    </div>
                            </div>
                            <div className="block three">
                                    <div className="functionalAreas">
                                        <a href="#" onclick="LinkClickFunction(this)">
                                                <img src="images/function3.png" alt="功能1"></img>
                                        </a>
                                        <span className="functionSpan">申请导师</span>
                                    </div>
                            </div>
                            <div className="block four">
                                    <div className="functionalAreas">
                                         <a href="#" onclick="LinkClickFunction(this)">
                                                    <img src="images/function4.png" alt="功能1"></img>
                                         </a>
                                        <span className="functionSpan">申请免修英语</span>
                                    </div>
                            </div>
                        </div>
                    </div>

                </div>

                <HighLight type="Panel"
                           bean={{
                                                url:'/bsuims/reactPageDataRequest.do',
                                                params: {
                                                    reactActionName: "addApplyInfoInitPanelUseReact",
                                                    reactPageName  : "gradGreenWayPage"
                                                }
                                            }}
                           query={{ url:'/bsuims/reactPageDataRequest.do',
                                reactActionName:"",
                                reactPageName:""}}
                           title="绿色通道申请" auto={true}/>

                <IndexScroll data={Scrolls}/>

                <ScaleBar data={Scales}/>
                {this.getRender()}
                <Footer/>
            </div>

        )
    },
    componentDidMount: function () {
        this.app$init();
    }

});

module.exports = App;