import React from 'react';
import {render} from 'react-dom';
import Panel from '../panel/Panel.jsx';
import OrdinaryTable from '../forms/OrdinaryTable.jsx';
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
                case "OrdinaryTable":


                    component =
                        <div>
                            <div >
                                <br/>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="head" style={{textAlign:"center"}}>
                                            报到须知
                                            <br/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >
                                            &nbsp;2015级研究生：
                                            <br/>&nbsp;&nbsp;&nbsp;你好！
                                            <br/>&nbsp;&nbsp;&nbsp;为方便你的入学报到与注册，请于来校报到注册前，在迎新系统中完成下列信息填写：
                                            <br/>&nbsp;&nbsp;&nbsp;1.“个人信息管理”菜单：
                                            <br/>&nbsp;&nbsp;&nbsp;（1）“学术规范承诺书”：完成学术规范试题并签署承诺书；
                                            <br/>&nbsp;&nbsp;&nbsp;（2）“联系方式维护”：完善个人联系方式；
                                            <br/>&nbsp;&nbsp;&nbsp;（3）“学籍信息”：包括基本信息、培养信息、入学前信息、家庭信息、工作经历等五部分内容。请各位研究生按照允许修改的字段，逐一完善。信息填写不完善者不能报到注册，无法使用系统。
                                            <br/>&nbsp;&nbsp;&nbsp;2.“报到注册”菜单：
                                            <br/>&nbsp;&nbsp;&nbsp;（1）“宿舍申请”：便于学校学生公寓管理服务中心为申请住宿新生统一安排宿舍，不申请者不予安排；
                                            <br/>&nbsp;&nbsp;&nbsp;（2）“绿色通道申请”：家庭经济困难研究生可通过“绿色通道”申请国家助学贷款或暂缓缴费；
                                            <br/>&nbsp;&nbsp;&nbsp;（3）“病史填写”、“打印体检表”：请研究生新生从系统中填写病史记录，提前下载打印体检表（正反面打印），按照学校规定的时间携带校园卡（余额须大于40元）、体检表，到规定的校区进行健康检查。

                                            <br/>&nbsp;&nbsp;&nbsp;3.邮箱开通和无线网服务
                                            <br/>&nbsp;&nbsp;&nbsp;  学校为学生自动开通校内邮箱，并提供全校各校区的无线网服务，相关说明请查阅政策文件->系统说明中新生电子邮件使用说明与新生校园网使用说明。
                                            <br/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <OrdinaryTable
                                title={this.props.title}
                                query={this.props.query}
                                autoFetch={true}
                                filterField={this.props.filterField}
                                />
                        </div>

                    break;
                default:
                    component = <table >
                        <tbody>
                        </tbody>
                    </table>
                    break;
            }
        }


        return (
            <div className="highLight" style={{height:"600px",position:"relative"}} ref="highLight">
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
                $(".highLight").animate({height: '600px'});
        });
    }
});
module.exports = HighLight;