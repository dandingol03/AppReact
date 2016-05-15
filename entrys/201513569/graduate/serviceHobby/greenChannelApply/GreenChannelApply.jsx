import React from 'react';
import {render} from 'react-dom';
import Panel from '../../../../../components/panel/Panel.jsx';


var GreenChannelApply=React.createClass({


    render:function(){

        var bean={
            url:'serviceHall/bsuims/reactPageDataRequest.do',
            reactActionName:"",
            reactPageName:""
        }

        var query={

        }

        return(
            <Panel
                title="绿色通道申请"
                autoComplete={true}
                auto={true}
                bean={bean}
                query={query}
                />
        )


    }
});
export default GreenChannelApply;


