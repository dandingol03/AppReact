import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import Nav from '../../../../../components/basic/Nav.jsx';
import IndexScroll from '../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import CustomMenu from '../../../../../components/basic/CustomMenu.jsx';
import HighLight from '../../../../../components/basic/HighLight.jsx';
import Footer from '../../../../../components/basic/Footer.jsx';
import '../../../../../less/serviceHobby/basic/root.less';
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
                <Nav logo={Deploy.getResourceDeployPrefix()+"/images/school_logo.png"} data={MENU}/>


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
                                    <li>您有N条公告信息 <Link to="/news">更多》</Link></li>
                                    <li> &nbsp;&nbsp;2016年6月1日放假的通知...</li>
                                    <li>您有7条未读信息 <Link to="/news">更多》</Link></li>
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
                </div>

                <HighLight type="OrdinaryTable"
                           title='<span  style="font-size: 14px;color: #6EA0FF;font-weight:bold;text-align:center">个人信息状态</span>'
                           query={{ url:'/bsuims/reactPageDataRequest.do',
                                   params: {
                                      reactActionName: "registerInformationReact",
                                      reactPageName  : "registerRulePage"
                                            }
                                 }}
                           filterField={{
                               "stuName":true,
		                       "stuNum":true,
		                       "feeStatus":true,
		                       "baseInfoFillStatus":true,
		                       "moralityFillStatus":true,
		                       "greenwayStatus":true,
		                       "trafiicFillStatus":true,
                               "studyStateStr":true
                             }}
                    />

                <IndexScroll data={Scrolls}/>

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