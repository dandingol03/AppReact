/**
 * Created by dell on 2016/6/4.
 */
/**
 * Created by dell on 2016/5/23.
 */
import React from 'react';
import {render} from 'react-dom';
import Panel from '../../../../components/panel/Panel.jsx';
import OrdinaryTable from '../../../../components/forms/OrdinaryTable.jsx'
import '../../../../css/components/basic/highLight.css';
Boot()

function Boot()
{
    var filterField= {
        "huji":true,
        "dk":true,
        "book":true,
        "xyk":true,
        "ts":true,
        "zzgx":true,
        "xsz":true
    }

    var query={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"infoStuLeavingSchoolInfoCollegeProcessRulePage",
            reactActionName:"infoStuleavingSchoolStuUpdateInfo"
        }
    }

    var title={content:"离校信息办理状态"}
    var PanelTitle={content:"需填写信息"}
    render(
        <div>
            <div>
                <div className="highLight" style={{height:"600px",position:"relative"}} ref="highLight">
                    <div className="left"
                         style={{left:"10%",width:"80%",position:"absolute",float:"left",backgroundColor: "#edf7ff",height: "100%",textAlign:"center"}}>
                        <div className="component">
                            <table className="content">
                            <tbody>
                            <tr>
                                <td className="head" style={{textAlign:"center"}}>
                                    填写须知
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={7} className="main" height={25} style={{borderTop:"none",textAlign:"left" }}>
                                   1. 在校延期同学做特别处理，直接在校园卡自助圈存机上做操作,有效期至2017年7月10日。
                                    <br/>&nbsp;&nbsp;&nbsp;2.请先去图书馆注销读者信息，再来做校园卡操作
                                    <br/>&nbsp;&nbsp;&nbsp;3.毕业生校园卡处理方式选择:
                                    <br/>&nbsp;&nbsp;&nbsp;(1)“毕业校园卡销户退余额”：毕业生离校后不再使用校园卡，校园卡销户退余额。信息办将于7月1日~3日将校园卡销户，余额转存至同学们对应的中国银行卡内。7月5日以后，同学们可在银行卡交易记录内查询。请同学们的中国银行卡保留到10月份以后。如果余额小于1元，银行不受理，销户金额将无法转到银行卡内，请同学们谅解。销户金额转存不成功的将由学校财务挂账。

                                    <br/>&nbsp;&nbsp;&nbsp;(2)“毕业正式卡转临时卡使用”： 毕业生离校后，如果还需要回校使用校园卡，此选项可将正式卡转为临时卡使用，余额留在校园卡内不变。按学校规定，临时卡将在每次存款时，加收15%的管理费，（转卡时的余额不扣管理费）。信息办将于7月1~3日为同学们办理转卡手续，7月5日以后，选择此项的同学可以到圈存机上，做“毕业转卡”操作，将卡片转为临时卡继续使用，卡片有效期延至2017年6月1日，到期后本人携带身份证到充值点办理延期手续，一次延期一年。详细使用说明，同学们可到充值点免费领取《山东大学校园临时卡使用手册》。
                                    <br/>&nbsp;&nbsp;&nbsp;(3)“本校升学继续使用”： 本校本科生考入本校研究生、本校硕士生考入本校博士生、本硕连读直升硕士、保资的学生，校园正式卡可继续使用至新学期开学时。信息办将于7月1~3日为本校升学同学办理延期手续，7月5日以后，本校升学的毕业生，可以到圈存机选择“在校延期”操作，校园卡有效期延至2016年9月10日，余额不变。9月10日以后，信息办将这批卡统一销户，卡内余额转入同学们对应的新生校园卡内。
                                    <br/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        <OrdinaryTable
            query={query}
            autoFetch={true}
            title={title}
            filterField={filterField}
            />
        <Panel
           bean={query}
            auto={true}
           autoComplete={true}
           title={PanelTitle}
        />
        </div>
        , document.getElementById('root'))


}