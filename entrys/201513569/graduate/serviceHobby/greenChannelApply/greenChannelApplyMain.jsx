import React from 'react';
import {render} from 'react-dom';
import Panel from '../../../../../components/panel/Panel.jsx';


Boot();
function Boot()
{
    var comps=[
        {row:['perName|span','perNum|span']},
        {row:['sex|span','perIdCard|span']},
        {row:['college|span','major|span']},
        {row:['className|span','loanType|select']},
        {row:['applyReason|textarea']},
        {row:['submit|query']}
    ];

    var query={
        url:'serviceHall/bsuims/reactPageDataRequest.do',
        reactActionName:"",
        reactPageName:""
    }

    render(

        <Panel
            title="绿色通道申请"
            data={comps}
            autoComplete={true}
            query={query}
            />
        , document.getElementById('root'))
}