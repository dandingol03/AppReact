import React from 'react';
import {render} from 'react-dom';
import Nav from '../../../../../components/basic/Nav.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import MainSection from '../modules/MainSection.jsx';
import ViceSection from '../modules/ViceSection.jsx';
import '../../../../../css/serviceHobby/basic/app.css';
import MENU from '../data/menus.json';
import Scales from '../data/scaleBar.json';



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
                {this.props.children}


                <ScaleBar data={Scales}/>
            </div>

        )
    },
    componentDidMount:function(){
        this.app$init();
    }

});

export default App;