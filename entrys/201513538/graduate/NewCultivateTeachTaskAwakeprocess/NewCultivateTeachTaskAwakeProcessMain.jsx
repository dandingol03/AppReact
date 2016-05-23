/**
 * Created by dell on 2016/5/23.
 */
import React from 'react';
import {render} from 'react-dom';
import PanelTable from '../../../../components/compounds/panelTable/PanelTable.jsx';
Boot()

function Boot()
{
    var filterField= {
       "courseNum":true,
        "courseName":true,
        "term":true,
        "input":true
    }

    var bean={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"newCultivateTeachTaskAwakeprocessRulePage",
            reactActionName:"getTeachTaskAwakeInfoInit"
        }
    }
    render(
        <PanelTable
            bean={bean}
            autoComplete={true}
            filterField={filterField}
            />
        , document.getElementById('root'))


}