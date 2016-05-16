import React from 'react';
import {render} from 'react-dom';



var Download=React.createClass({

    render:function() {
        var attach=null;
        if(this.props.attachId!==undefined&&this.props.attachId!==null)
        {
            var href="gradms/attachment/attachmentDownloadAttachmentBSFile.do?attachId="+this.props.attachId;
                attach=<a href="#" className="btn btn-block btn-primary " href={href}>{this.props.title}
                    <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></a>
        }
        return(<div>
                {attach}
                </div>);


    }
});
export default Download;