import React from 'react';
import {render} from 'react-dom';
import Panel from '../../../../../components/panel/Panel.jsx';


Boot();
function Boot()
{
    var bean={
        url:'serviceHall/bsuims/reactPageDataRequest.do',
        params: {
            reactActionName: "addApplyInfoInitPanelUseReact",
            reactPageName  : "gradGreenWayPage"
        }
    }


    var query={
        url:'serviceHall/bsuims/reactPageDataRequest.do',
        reactActionName:"",
        reactPageName:""
    }

    render(

        <Panel
            title="绿色通道申请"
            autoComplete={true}
            auto={true}
            bean={bean}
            query={query}
            />
        , document.getElementById('root'))
}