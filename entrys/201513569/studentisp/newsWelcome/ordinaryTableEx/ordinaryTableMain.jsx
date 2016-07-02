import React from 'react';
import {render} from 'react-dom';

import OrdinaryTable from '../forms/OrdinaryTable.jsx';
Boot();

function Boot() {

    render(
        <OrdinaryTable
            title='<span  style="font-size: 14px;color: #6EA0FF;font-weight:bold;text-align:center">个人信息状态</span>'
            query={{ url:'/bsuims/reactPageDataRequest.do',
                                   params: {
                                      reactActionName: "registerInformationReact",
                                      reactPageName  : "registerRulePage"
                                            }
                                 }}
            filterField={{
                               "stuName":true,
		                       "stuNum":true,
		                       "feeStatus":true,
		                       "baseInfoFillStatus":true,
		                       "moralityFillStatus":true,
		                       "greenwayStatus":true,
		                       "trafiicFillStatus":true,
                               "studyStateStr":true
                             }}
            />
        , document.getElementById('root'))

}