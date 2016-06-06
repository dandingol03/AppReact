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
        "oper":true,
        "status":true,
        "input":true
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
        <OrdinaryTable
            query={query}
            autoFetch={true}
            title={title}
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