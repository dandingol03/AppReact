import React from 'react';
import {render} from 'react-dom';
var ProxyQ = require('../../components/proxy/ProxyQ');
import { Link } from 'react-router'
var Image = React.createClass({
    render: function () {

        var link = null;

        var image = null;
        if (this.props.src !== undefined && this.props.src !== null) {
            image = <img src={this.props.src} style={{marginTop:"20px"}}/>
        }
        if (this.props.link !== undefined && this.props.link !== null)
            link = <Link to={this.props.link}>{image}</Link>
        else {
            link = <Link>{image}</Link>
        }
        return (
            <div>
                {link}
            </div>)
    }
});
module.exports = Image;