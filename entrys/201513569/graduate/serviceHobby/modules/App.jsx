import React from 'react';
import {render} from 'react-dom';
import Nav from '../../../../../components/basic/Nav.jsx';
import IndexScroll from '../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import News from '../modules/News.jsx';
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
                <Nav logo="./images/logo.png"  data={MENU}/>
                <IndexScroll data={Scrolls}/>




                <ScaleBar data={Scales}/>

                {this.props.children}
            </div>

        )
    },
    componentDidMount:function(){
        this.app$init();
    }

});

export default App;