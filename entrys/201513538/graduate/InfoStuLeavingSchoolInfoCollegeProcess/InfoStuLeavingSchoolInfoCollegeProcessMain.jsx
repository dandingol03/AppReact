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
            reactPageName:"InfoStuLeavingSchoolInfoCollegeProcessRulePage",
            reactActionName:"infoStuleavingSchoolStuUpdateInfo"
        }
    }

    var title="离校信息办理状态";
    var PanelTitle="需填写信息";
    render(



       <div>
        <div style={{margin:"50px"}}>
            <table style={{border:" 1px solid #6EA0FF",position:"relative",height:"120px",width:"100%" }}>
                <thead>
                <tr>
                <th style={{border:" 1px solid #6EA0FF",textAlign:"center",height:"30px"}}>
                    注意事项
                </th>
                    </tr>
                    </thead>
                <tbody>
                <tr><td style={{paddingLeft:"10px"}}> 1.在校延期同学做特别处理，直接在校园卡自助圈存机上做操作,有效期至2017年7月10日。</td></tr>
                <tr><td style={{paddingLeft:"10px"}}> 2.请先去图书馆注销读者信息，再来做校园卡操作。</td></tr>
                </tbody>
            </table>
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