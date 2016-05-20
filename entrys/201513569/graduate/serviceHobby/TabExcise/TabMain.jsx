
import React from 'react';
import {render} from 'react-dom';
import Tab from '../../../../../components/basic/Tab.jsx';

Boot();
function Boot(){

    var query={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"degreeAnonymousThesisReviewResult",
            reactActionName:"deegreeThesisReviewResultUseReact"
        }
    }
    var bean={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"degreeAnonymousThesisReviewResult",
            reactActionName:"deegreeThesisReviewPanelUseReact"
        }
    }
    var filterField= {
        "order":true,
        "stuNum":true,
        "stuName": true,
        "grade":true,
        "stuTypeName":true,
        "stuMajorName":true,
        "thesisLevel":true,
        "commentResult":true,
        "attachs":true
    }

    var dataTab={
            autoComplete:true,
            query:query,
            bean:bean,
            filterField:{filterField}
            };

    var data=[
        {name:"tab1",dataTab:dataTab},
        {name:"tab2"},
        {name:"tab3"},
        {name:"tab4"}
    ];



    render(
        <Tab data={data} />
        , document.getElementById('root'))
}