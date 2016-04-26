import React from 'react';
import {render} from 'react-dom';
import Panel from '../../../../../components/panel/Panel.jsx';

Boot();
function Boot()
{
    var bean={
        url:"/serviceHall/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"exemptionPage",
            reactActionName:"exemptionEnglishApplyInitUseReact"
        }
    }
    render(
        <Panel
            title="³ö¹úÁôÑ§ÉêÇë"
            autoComplete={true}
            auto={true}
            bean={bean}
            />
        , document.getElementById('root'))

}