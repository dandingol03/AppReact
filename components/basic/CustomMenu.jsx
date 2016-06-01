import React from 'react';
import {render} from 'react-dom';
import Trans from '../../data/json/translation.json';
import Tab from '../../components/basic/Tab.jsx';
import Image from '../../components/basic/Image.jsx';
var ProxyQ = require("../../components/proxy/ProxyQ");
import '../../css/components/basic/customMenu.css';
/**
 * 1.downLimit,订制菜单数的最小下限
 * 2.upLimit,订制菜单数的最大上限
 * 3.recurse,递归循环,同时生成已选和未选2棵树
 */

var CustomMenu = React.createClass({
    recurseUnSelected  : function (leaf_key, in$param, out$param) {//将多级菜单形成2级菜单
        if (in$param !== null && in$param !== undefined) {
            var recurseUnSelected = this.recurseUnSelected;
            in$param.map(function (item, i) {
                if (item[leaf_key] !== undefined && item[leaf_key] !== null)//非叶结点
                {
                    recurseUnSelected(leaf_key, item[leaf_key], out$param);
                }
                else {//叶结点
                    var leaf = "{link:'',src:'" + item.src + "',type:'check',icon:'add',name:'" + item.name + "'," +
                        "id:'" + (item.id !== undefined && item.id !== null ? item.id : -1) + "'}|image";
                    out$param.push({menu: leaf});
                }
            });
        }
    },
    groupUnSelected    : function (leaf_key, in$param, out$param) {//就第一层导航进行分组
        if (out$param.tab == undefined || out$param.tab == null)
            out$param.tab = new Array();
        var recurseUnSelected = this.recurseUnSelected;
        in$param.map(function (first, i) {
            var tab = new Object();
            tab.name = first.name;
            tab.comp = new Object();
            tab.comp.name = "EmbedTable";
            tab.comp.embedCols = 4;
            tab.comp.data = {
                arr: [{
                    filterField: "menu",
                    border     : "none",
                    data       : []
                }
                ]
            };
            recurseUnSelected("sub", first[leaf_key], tab.comp.data.arr[0].data);
            out$param.push(tab);
        });

    },
    recurseSelectedMenu: function (leaf_key, global, in$param, out$param) {
        if (in$param !== undefined && in$param !== null) {
            var state = this.state;
            var recurseSelectedMenu = this.recurseSelectedMenu;
            in$param.map(function (item, i) {
                if (item[leaf_key] == undefined || item[leaf_key] == null) {
                    //增加已选中菜单的回调事件
                    var checkCb = function (evt) {
                        var target = evt.target;
                        if (target.checked == true || target.checked == "true") {
                            state.menu[item.id] = false;
                        } else {
                            delete state.menu[item.id];
                        }
                    };
                    out$param.push(
                        <div key={global.index++}>
                            {state.customizing == true ?
                                <Image link={item.link}
                                       src={item.src}
                                       type={item.type}
                                       onChange={checkCb}
                                    /> : <Image link={item.link}
                                                src={item.src}/>}
                        </div>);
                }
                else {
                    recurseSelectedMenu(leaf_key, global, item, out$param);
                }
            });
        }
    },
    unselectedCb       : function (ob) {//已选中菜单的增加点击行为
        if (ob.id !== undefined && ob.id !== null) {
            var state = this.state;
            if (!isNaN(index) && checked !== undefined && checked !== null) {
                if (checked == true) {
                    state.menu[ob.id] = true;
                } else {
                    delete state.menu[ob.id];
                }
            }
        }

    },
    customCb           : function (evt) {//处理定制菜单的增加和减少
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
    fetch          : function () {
        ProxyQ.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function (response) {
                var ob = new Object();
                if (response.data !== undefined && response.data !== null) {
                    if (response.data.selected !== undefined && response.data.selected !== null && response.data.selected.length > 0)
                        ob.selected = response.data.selected;
                    if (response.data.unselected !== undefined && response.data.unselected !== null && response.data.unselected.length > 0)
                        ob.unselected = response.data.unselected;
                }
                ob.data$initialed = true;
                ob.customizing = false;
                this.setState(ob);
            }.bind(this)
        )

    },
    getInitialState: function () {
        var data;
        var data$initialed;
        if (this.props.data !== undefined && this.props.data !== null) {
            data = this.props.data;
            data$initialed = true;
        }
        else
            data$initialed = false;


        var menu = new Object();
        return ({
            downLimit     : 4,
            upLimit       : 8,
            data          : data,
            data$initialed: data$initialed,
            customizing   : false,
            menu: menu
        });
    },
    componentWillReceiveProps: function (props) {
        var ob = new Object();
        if (Object.prototype.toString.call(props.data) == "[object Array]") {
            ob.data = props.data;
        }
        this.setState(ob);
    },
    render         : function () {

        if (this.state.data$initialed !== true) {
            if (this.props.auto == true)
                this.fetch();

            return (
                <div></div>
            )

        } else {
            var selectedMenus = null;
            var unselectedMenus = new Object();
            unselectedMenus.arr = null;
            var customButton = <div className="menu_custom" key={-1}>
                <div className="functionalAreas">
                    <a href="javascript:void(0)" onClick={this.customCb}>
                        <i className="fa fa-cogs icon-switcher" style={{background:"transparent"}}></i>
                    </a>
                </div>
            </div>

            if (this.state.data$initialed !== true) {
                if (this.props.auto == true || this.props.auto == "true")
                    this.fetch();
            } else {
                var unselectedCb = this.unselectedCb;
                var state = this.state;
                var global = new Object();
                global.index = 0;
                //搜集已选中菜单
                if (state.selected !== undefined && state.selected !== null && Object.prototype.toString.call(state.selected) == '[object Array]' && state.selected.length > 0) {
                    selectedMenus = new Array();
                    this.recurseSelectedMenu("sub", global, state.selected, selectedMenus);
                }
                if (state.customizing == true) {
                    unselectedMenus.arr = new Array();
                    //搜集未选中菜单形成tab组件数据
                    if (state.unselected !== undefined && state.unselected !== null && Object.prototype.toString.call(state.unselected) == '[object Array]' && state.unselected.length > 0) {
                        this.groupUnSelected("sub", state.unselected, unselectedMenus.arr);
                    }
                }

                var selectedCount = state.selected !== undefined && state.selected !== null ? state.selected.length : 0;
                return <div className="customMenu">
                    <div className="bottom">
                        {customButton}
                        {selectedMenus}
                        <div className="modal fade" ref="custom_modal" style={{display:"none"}}>
                            <div className="modal-dialog" style={{width:"980px"}}>
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
                                    <div className="modal-body" style={{padding:"15px"}}>
                                        <div className="uncandidate box">
                                            {selectedMenus}
                                        </div>
                                        <Tab
                                            data={unselectedMenus.arr}
                                            checkCb={unselectedCb}
                                            />
                                    </div>
                                    <div className="modal-footer" style={{borderTop:"0px"}}>
                                        <button type="button" className="btn btn-default" data-dismiss="modal">取消
                                        </button>
                                        <button type="button" className="btn btn-primary">提交更改</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }

        }
    }
});
module.exports = CustomMenu;