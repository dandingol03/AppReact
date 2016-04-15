import React from 'react';

var HideElement=React.createClass({
    foldCb:function(){
        if(this.props.name!==undefined&&this.props.name!==null)
            this.props.foldCb(this.props.name);
    },
    render:function() {

        var hideTrs;
        if (this.props.personInfo !== undefined && this.props.personInfo !== null) {
            var personInfo = this.props.personInfo;
            if (personInfo !== undefined && personInfo !== null) {
                hideTrs = ( <tr>
                    <td>
                        {personInfo.email}
                    </td>
                </tr>);
            }
        }

        return (
            <table className="table table-bordered center">
                <thead>
                <tr >
                    <th colSpan={1}>个人简介<span className="glyphicon glyphicon-menu-up folding"
                                              onClick={this.foldCb}></span></th>
                </tr>
                </thead>
                <tbody>
                {hideTrs}
                </tbody>
            </table>)
    }
});
export default HideElement;
