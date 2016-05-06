import React from 'react';
import {render} from 'react-dom';
import '../../../../../css/serviceHobby/basic/header.css';
import Nav from '../../../../../components/basic/Nav.jsx';





var App =React.createClass({
    fetch:function(){


    },
    queryHandle:function(){


    },
    menushow:function(obj1,obj2,cl){
        var index,id,timer,divcreate;
        divcreate=false;
        $(obj1).hover(
            function(){
                id=$(obj1).index(this);
                $(obj1).removeClass(cl);
                $(this).addClass(cl);
                hidecur();
                $(obj2).eq(id).stop(true,true).delay(400).slideDown(200, function(){});
                divcreate=true;
                index=id;

            },function(){
                id=$(obj1).index(this);
                divcreate=false;
                hidecur();
                $(obj1).removeClass(cl);
            });

        $(obj2).hover(function(){divcreate=true;hidecur();},function(){id=$(obj2).index(this);divcreate=false;hidecur();});
        function hidecur(){
            clearTimeout(timer);
            if(index!=id){$(obj2).eq(index).stop(true,true).delay(50).fadeOut("fast", function(){});	}
            timer=setTimeout(function(){
                if(!divcreate){
                    $(obj2).eq(id).stop(true,true).delay(50).fadeOut("fast", function(){});
                };
            },100);
        }

    },
    render:function(){
        return (
            /**
             * header box part
             */
            <div className="header_box">
                <div className="header">
                    <div className="logo">
                        <a>
                            <img src="./images/logo.png"
                                 alt="中国建设银行"/>
                            </a>
                    </div>

                    <div className="nav">
                        <ul>
                            <li className="" style={{marginLeft: "-2.57143px"}}>
                                <a href="javascript:void(0)" className="nav_a" >投资理财</a>

                                <div className="mnavL" style={{display: "none"}}>
                                    <div className="mnavL_info">
                                        <div className="mnavL_left_LL fl clearfix">
                                            <div className="tz_2" style={{marginLeft:"20px"}}>
                                                <table className="cell" width="100%">
                                                    <tbody>
                                                        <tr>
                                                            <td className="tz_td1">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="blue_td">
                                                                            <a href="javascript:void(0)" target="_blank">基金 &gt;</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td2">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="mtt_td1">
                                                                                <a href="javascript:void(0)" target="_blank" title="基金交易">
                                                                                    基金交易
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td3">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="mtt_td1">
                                                                                <a href="javascript:void(0)" target="_blank" title="基金公告" >基金公告</a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td4">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="mtt_td1">
                                                                                <a href="javascript:void(0)" target="_blank" title="热销基金">热销基金</a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td4">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="mtt_td1">
                                                                            <a href="javascript:void(0)" target="_blank" title="热销基金">热销基金</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td4">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="mtt_td1">
                                                                            <a href="javascript:void(0)" target="_blank" title="热销基金">热销基金</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td4">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="mtt_td1">
                                                                            <a href="javascript:void(0)" target="_blank" title="热销基金">热销基金</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td4">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="mtt_td1">
                                                                            <a href="javascript:void(0)" target="_blank" title="热销基金">热销基金</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                            <td className="tz_td4">
                                                                <table className="cell" width="100%">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td className="mtt_td1">
                                                                            <a href="javascript:void(0)" target="_blank" title="热销基金">热销基金</a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="xian"></div>
                                        </div>
                                    </div>
                                </div>
                            </li>


                        </ul>
                    </div>


                </div>



                {this.props.children}
            </div>
        )


    },
    componentDidMount:function(){


        this.menushow(".nav>ul>li",".mnavL","hover");
    }

});

export default App;