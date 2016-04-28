import React from 'react';
import {render} from 'react-dom';
import PanelTable from '../../../../../components/compounds/panelTable/PanelTable.jsx';

Boot()

function Boot()
{
    var filterField= {
        "courseName": true,
        "courseNum":true,
        "courseType":true,
        "credit":true,
        "classHour":true,
        "termCount":true,
        "examTypeName":true,
        "managerName":true,
        "detail":true
    }

   var  query={
    url:"/gradms/bsuims/reactPageDataRequest.do",
        params:{
        reactActionName:"allCourseQueryDoQuery",
            reactPageName:"newCultivateAllCourseQueryPage"
        }
    }


    render(
        <PanelTable
            bean={{
                url:"/gradms/bsuims/reactPageDataRequest.do",
                params:{
                reactActionName:"allCourseQueryInit",
                reactPageName:"newCultivateAllCourseQueryPage"
                }
            }}
            autoComplete={true}
            query={query}
            filterField={filterField}
            />
        , document.getElementById('root'))


}