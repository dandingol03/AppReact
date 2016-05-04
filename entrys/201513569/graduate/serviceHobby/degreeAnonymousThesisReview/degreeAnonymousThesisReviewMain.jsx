import React from 'react';
import {render} from 'react-dom';
import PanelTable from '../../../../../components/compounds/panelTable/PanelTable.jsx';


Boot();

function Boot(){
    var comps=[
        {row:['stuType|select','query']}
    ];
    var query={
        url:"/serviceHall/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"degreeAnonymousThesisReviewResult",
            reactActionName:"deegreeThesisReviewResult"
        }
    }
    var filterField= {
        "stuName": true,
        "stuId":true,
        "stuCollegeName":true,
        "stuMajorName":true,
        "thesisLevel":true,
        "commentResult":true,
        "attachs":true
    }

    render(
        <PanelTable
            comps={comps}
            autoComplete={true}
            query={query}
            filterField={filterField}
            />
        , document.getElementById('root'))


}