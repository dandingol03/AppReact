import React from 'react';
import {render} from 'react-dom';
import Password from '../../../../../components/compounds/password/PasswordElement.jsx';
var PasswordModify=React.createClass({

    render:function(){

        var title="修改密码";
        var action="/ReactJPChatter/react/commitPassword.do";

        return(
            <Password title={title} action={action}/>
           );
    }
});
export default PasswordModify;

