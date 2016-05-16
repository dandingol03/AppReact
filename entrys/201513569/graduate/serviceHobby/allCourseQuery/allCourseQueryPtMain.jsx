import React from 'react';
import {render} from 'react-dom';
import PanelTable from '../../../../../components/compounds/panelTable/PanelTable.jsx';
var ProxyQ=require('../../../../../components/proxy/ProxyQ');
Boot()

function Boot()
{
    var filterField= {
       "order":true,
        "courseNum":true,
        "courseName": true,
        "courseType":true,
        "credit":true,
        "classHour":true,
        "termCount":true,
        "examTypeName":true,
        "managerName":true,
        "link":true
    }

    var  query={
    url:"/bsuims/reactPageDataRequest.do",
        params:{
        reactActionName:"allCourseQueryDoQuery",
            reactPageName:"newCultivateAllCourseQueryPage"
        }
    }


    render(
        <PanelTable
            bean={{
                url:"/bsuims/reactPageDataRequest.do",
                params:{
                reactActionName:"allCourseQueryInit",
                reactPageName:"newCultivateAllCourseQueryPage"
                }
            }}
            autoComplete={true}
            query={query}
            filterField={filterField}
            pagination={true}
            />
        , document.getElementById('root'))


}