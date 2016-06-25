import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import Nav from '../../../../../components/basic/Nav.jsx';
import IndexScroll from '../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import CustomMenu from '../../../../../components/basic/CustomMenu.jsx';
import HighLight from '../../../../../components/basic/HighLight.jsx';
import Footer from '../../../../../components/basic/Footer.jsx';
import '../../../../../css/serviceHobby/basic/app.css';
import MENU from '../data/menus.json';
import Scales from '../data/scaleBar.json';
import Scrolls from '../data/scrolls.json';


var App =React.createClass({
    app$init:function(){

    },

    render:function(){

        return (
        /**
         * header box part
         */
            <div>
                <Nav logo={Deploy.getResourceDeployPrefix()+"/"+"images/school_logo.png"} data={MENU}/>

                <div className="topbg"></div>

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
                                    <li>您有n条公告 <Link to="/news">更多》</Link></li>
                                    <li>您有m条通知 <Link to="/news">更多》</Link></li>
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
                                        <img src={Deploy.getResourceDeployPrefix()+"/"+"images/function1.png"} alt="功能1"></img>
                                    </a>
                                    <span className="functionSpan">申请绿色通道</span>
                                </div>
                            </div>
                            <div className="block two">
                                <div className="functionalAreas">
                                    <a href="#" onclick="LinkClickFunction(this)">
                                        <img src={Deploy.getResourceDeployPrefix()+"/"+"images/function2.png"} alt="功能1"></img>
                                    </a>
                                    <span className="functionSpan">申请宿舍</span>
                                </div>
                            </div>
                            <div className="block three">
                                <div className="functionalAreas">
                                    <a href="#" onclick="LinkClickFunction(this)">
                                        <img src={Deploy.getResourceDeployPrefix()+"/"+"images/function3.png"} alt="功能1"></img>
                                    </a>
                                    <span className="functionSpan">申请导师</span>
                                </div>
                            </div>
                            <div className="block four">
                                <div className="functionalAreas">
                                    <a href="#" onclick="LinkClickFunction(this)">
                                        <img src={Deploy.getResourceDeployPrefix()+"/"+"images/function4.png"} alt="功能1"></img>
                                    </a>
                                    <span className="functionSpan">申请免修英语</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                <ScaleBar data={Scales}/>
                {this.props.children}
                <Footer/>
            </div>

        )
    },
    componentDidMount:function(){
        this.app$init();
    }

});

export default App;