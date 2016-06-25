import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/horizontal.css';
var ProxyQ = require('../proxy/ProxyQ');

/**
 *
 */

var Horizontal = React.createClass({
    fetch          : function () {
        ProxyQ.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function (response) {
                var ob = new Object();
                var data = null;
                data = response.arr;
                if (data !== null) {
                    ob.data$initialed = true;
                    ob.data = data;
                }

                if (response.translation !== undefined && response.translation !== null) {
                    ob.translation = response.translation;
                }
                this.setState(ob);
            }.bind(this)
        )
    },
    getInitialState: function () {
        var data$initialed = false;
        var data;
        if (this.props.data !== undefined && this.props.data !== null) {
            data = this.props.data;
            data$initialed = true;
        }

        return ({data: data, data$initialed: data$initialed});
    },
    getStyle       : function () {
        var ob = new Object();
        if (this.props.width !== undefined && this.props.width !== null)
            ob.width = this.props.width;

        return ob;
    },
    render         : function () {
        if (this.state.data !== undefined && this.state.data !== null) {
            var trs = new Array();
            var state = this.state;
            var k = 0;
            for (var field in state.data) {

                var label = null;
                if (state.translation[field] !== undefined && state.translation[field] !== null)
                    label = state.translation[field];
                else
                    label = field;
                trs.push(
                    <tr key={k++}>
                        <td key={0}>{label}</td>
                        <td key={1}>{state.data[field]}</td>
                    </tr>
                );
            }

            return (
                <div className="horizontal">
                    <table className={"table table-bordered center "+(this.props.highLight==true?"highLight":"")}>
                        <tbody>
                        {trs}
                        </tbody>
                    </table>
                </div>
            )
        }
        else {
            if (this.props.auto == true && this.state.data$initialed == false)
                this.fetch();

            return (
                <div className="row horizontal" style={this.getStyle()}>
                    <div className="col-sm-12">
                        <table></table>
                    </div>
                </div>);
        }
    }
});
module.exports = Horizontal;