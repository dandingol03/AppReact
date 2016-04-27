import React from 'react';
import {render} from 'react-dom';
import Panel from '../../../../../components/panel/Panel.jsx';

Boot();

function Boot()
{
    var data=[
        {row:['stuType|select','query']}
    ];
    var query={
        url:"/gradms/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"fuckThesis",
            reactActionName:"deegreeThesisReviewResult"
        }
    }
    render(
        <Panel
            data={data}
            autoComplete={true}
            query={query}
            />
        , document.getElementById('root'))

}