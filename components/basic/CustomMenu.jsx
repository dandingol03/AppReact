import React from 'react';
import {render} from 'react-dom';
import Trans from '../../data/json/translation.json';
var ProxyQ = require("../../components/proxy/ProxyQ");
import '../../css/components/basic/customMenu.css';
/**
 * 1.downLimit,订制菜单数的最小下限
 * 2.upLimit,订制菜单数的最大上限
 *
 *
 */

var CustomMenu = React.createClass({
    selectedCb               : function (evt) {//已选中菜单的取消点击行为
        var target = evt.target;
        var $target = $(target);
        var index = parseInt($target.attr("data-index"));
        var state = this.state;
        if (target.checked == true) {
            if (state.selected.length >= 1) {
                state.selected.map(function (item, i) {
                    if (item == index)
                        state.selected.splice(i, 1);
                });

            }
        } else {
            state.selected.push(index);
        }

    },
    unselectedCb             : function (evt) {//已选中菜单的增加点击行为
        var target = evt.target;
        var $target = $(target);
        var index = parseInt($target.attr("data-index"));
        var state = this.state;
        if (target.checked == true) {
            if (state.selected.length >= 1) {
                state.selected.push(index);
            }
        } else {
            state.selected.map(function (item, i) {
                if (item == index)
                    state.selected.splice(i, 1);
            });
        }
    },
    customCb                 : function (evt) {
        var candidate = this.refs["candidate"];
        var $candidate = $(candidate);
        var display = $candidate.css("display");
        if (display == "none")
            this.setState({customizing: true});
        else {
            if (this.props.query !== undefined && this.props.query !== null) {
                var params = this.props.query.params;
                if (this.state.selected.length >= 1) {
                    params.selected = JSON.stringify(this.state.selected);
                }
                ProxyQ.queryHandle(
                    null,
                    this.props.query.url,
                    params,
                    'json',
                    function (response) {
                        var ob = new Object();
                        ob.data$initialed = true;
                        ob.customizing = false;
                        ob.data = response.data;
                        this.setState(ob);
                    }.bind(this)
                );
            }
        }
        $candidate.slideToggle();
    },
    fetch                    : function () {
        ProxyQ.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function (response) {
                var data = null
                var ob = new Object();
                if (Object.prototype.toString.call(response) != '[object Array]')
                    if (response.data !== undefined && response.data !== null)
                        if (Object.prototype.toString.call(response.data) == '[object Array]')
                            data = response.data;
                        else
                            data = response;
                if (data !== null)
                    ob.data = data;
                ob.data$initialed = true;
                ob.customizing = false;
                this.setState(ob);
            }.bind(this)
        )

    },
    getInitialState          : function () {
        var data;
        var data$initialed = null;
        if (this.props.data !== undefined && this.props.data !== null) {
            data = this.props.data;
            data$initialed = true;
        }

        var selected = new Array();
        return ({
            downLimit     : 4,
            upLimit       : 8,
            data          : data,
            data$initialed: data$initialed,
            customizing   : false,
            selected      : selected
        });
    },
    componentWillReceiveProps: function (props) {
        var ob = new Object();
        if (Object.prototype.toString.call(props.data) == "[object Array]") {
            ob.data = props.data;
        }
        this.setState(ob);
    },
    render                   : function () {
        var selected = null;
        var unselected = null;
        var customButton = <div className="menu_custom" key={-1}>
            <div className="functionalAreas">
                <a href="javascript:void(0)" onClick={this.customCb}>
                    <img src="./images/function1.png"/>
                </a>
            </div>
        </div>

        if (this.state.data$initialed !== true && (this.state.data == null || this.state.data == undefined)) {
            if (this.props.auto == true || this.props.auto == "true")
                this.fetch();
        } else {
            var selectedCb = this.selectedCb;
            var unselectedCb = this.unselectedCb;
            selected = new Array();
            var state = this.state;
            state.selected = new Array();
            state.data.map(function (menu, i) {

                if (menu.selected == true || menu.selected == "true") {

                    state.selected.push(i);
                    selected.push(
                        <div className={"block "+Trans[""+(i+1)]} key={i}>
                            {state.customizing == true ?
                                <input type="checkbox" className="" data-index={i} onChange={selectedCb}/> : null}
                            <div className="functionalAreas">
                            </div>
                        </div>
                    );
                } else {
                    if (unselected == null)
                        unselected = new Array();
                    unselected.push(
                        <div className="menu" key={i}>
                            {state.customizing == true ?
                                <input type="checkbox" data-index={i} onChange={unselectedCb}/> : null}
                            <div className="functionalAreas">
                            </div>
                        </div>
                    );
                }
            });


        }

        return <div className="customMenu">
            <div className="bottom">
                {customButton}
                {selected}
                <div className="candidate box" ref="candidate" style={{display:"none"}}>
                    {unselected}
                </div>
            </div>

        </div>
    }
});
export default CustomMenu;