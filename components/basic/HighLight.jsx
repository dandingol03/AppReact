import React from 'react';
import {render} from 'react-dom';
import Panel from '../panel/Panel.jsx';
import '../../css/components/basic/highLight.css';

var HighLight = React.createClass({

    render           : function () {
        var component = null;
        if (this.props.type !== undefined && this.props.type !== null) {
            switch (this.props.type) {
                case "Panel":
                    component = <Panel
                        title={this.props.title}
                        autoComplete={true}
                        auto={true}
                        bean={this.props.bean}
                        query={this.props.query}
                        />
                    break;
                default:
                    component = <table >
                        <tbody>
                        <tr>
                            <td>month</td>
                            <td>year</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2016</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2015</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>2014</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>2013</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>2012</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>2011</td>
                        </tr>
                        </tbody>
                    </table>
                    break;
            }
        }


        return (
            <div className="highLight" style={{height:"400px",position:"relative"}} ref="highLight">
                <div className="left"
                     style={{left:"10%",width:"80%",position:"absolute",float:"left",backgroundColor: "#edf7ff",height: "100%",textAlign:"center"}}>
                    <div className="component">
                        {component}
                    </div>

                </div>
                <div className="right" style={{width:"10%",float:"right",backgroundColor: "#edf7ff",height:"100%"}}>
                    <div className="menu on">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
            </div>);
    },
    componentDidMount: function () {


        $(".highLight .menu").click(function () {
            $(this).toggleClass("on");
            $(".highLight .component").fadeToggle();
            if (!$(this).hasClass("on"))
                $(".highLight").animate({height: '40px'});
            else
                $(".highLight").animate({height: '400px'});
        });
    }
});
module.exports = HighLight;