import React from 'react';
import {render} from 'react-dom';
import Trans from '../../data/json/translation.json';
var ProxyQ = require("../../components/proxy/ProxyQ");
import '../../css/components/basic/customMenu.css';
/**
 * 1.downLimit,订制菜单数的最小下限
 * 2.upLimit,订制菜单数的最大上限
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
        var customModal = this.refs["custom_modal"];
        var $customModal = $(customModal);
        var display = $customModal.css("display");
        if (display == "none") {
            this.setState({customizing: true});
            $customModal.modal("show");
        }
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
            $customModal.modal("hide");
        }

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
        var selectedCount = this.state.selected.length;
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
                <div className="modal fade" ref="custom_modal" style={{display:"none"}}>
                    <div className="modal-dialog" style={{width:"65%"}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" style={{textAlign:"left"}}>
                                    定制常用功能
                                </h4>
                                <h5 style={{textAlign:"right",marginRight:"7%"}}>您已选择了{selectedCount}个功能</h5>
                            </div>
                            <div className="modal-body" style={{height:"330",padding:"15px"}}>
                                <div className="uncandidate box">
                                    {selected}
                                </div>
                                <div style={{border:"1px solid #eee"}}>
                                    <div className="candidate box"
                                         style={{height:"190px",overflow:"scroll 1px solid ",overflowX:"hidden"}}>
                                        {unselected}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{borderTop:"0px"}}>
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" className="btn btn-primary">提交更改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }
});
module.exports = CustomMenu;