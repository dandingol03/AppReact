import React from 'react';
import {render} from 'react-dom';
import Nav from '../../../../../components/basic/Nav.jsx';
import IndexScroll from '../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import News from '../modules/News.jsx';
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
                <Nav logo="/gradms/serviceHobby/images/school_logo.png" data={MENU}/>


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
                    <div >
                        <CustomMenu auto={true} query={{
                                                url   : "/bsuims/reactPageDataRequest.do",
                                                params: {
                                                    reactPageName  : "serviceReactPage",
                                                    reactActionName: "getAuthMenus"
                                                    }
                                                }}
                                    apply={{
                                                url:"/bsuims/reactPageDataRequest.do",
                                                  params: {
                                                    reactPageName  : "serviceReactPage",
                                                    reactActionName: "updateCustomMenu"
                                                    }
                                                }}
                            />
                    </div>
                </div>

                <HighLight type="OrdinaryTable"
                           title={<span  style={{ fontSize: "14px",color:" #6EA0FF",fontWeight:"bold",textAlign:"center"}}>个人信息状态</span>}
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