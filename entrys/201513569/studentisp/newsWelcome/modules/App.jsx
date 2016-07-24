import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import Nav from '../../../../../components/basic/Nav.jsx';
import IndexScroll from '../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import Footer from '../../../../../components/basic/Footer.jsx';
import CommonFunction from './CommonFunction.jsx';
import Brief from './Brief.jsx';
import News from './News.jsx';
import '../../../../../css/serviceHobby/basic/app.css';
import MENU from '../data/menus.json';
import Scales from '../data/scaleBar.json';
var SyncActions= require('../../../../../components/flux/actions/SyncActions');
var ProxyQ = require('../../../../../components/proxy/ProxyQ');

var App = React.createClass({
    app$init: function () {

    },
    render           : function () {

        return (
        /**
         * header box part
         */
            <div>
                <Nav logo={Deploy.getResourceDeployPrefix()+"/"+"images/school_logo.png"} data$initialed={true}/>

                <div className="topbg"></div>

                <div className="keyNavigation">
                    <div className="top">
                        <div className="block">
                            <Brief data={['欢迎登陆山东大学电子迎新平台，请仔细阅读报道须知和各类通知,','并尽快选择下面的功能按要求完善相关信息和业务申请，有√标注的图标表示该业务已经完成。']}/>
                        </div>
                    </div>
                    <div className="bottom">
                        <CommonFunction auto={true}/>
                    </div>
                </div>

                {this.props.children}
                <ScaleBar data={Scales}/>
                <Footer/>
            </div>

        )
    },
    componentDidMount: function () {
        this.app$init();
    }

});

export default App;