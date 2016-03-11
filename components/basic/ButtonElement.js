/**
 * desc,Created by outstudio on 16/3/11.
 * @class ButtonElement
 */
import React from 'react';

var ButtonElement=React.createClass({
        /**
         * options,this property will store the configure which behaviour u want the ButtonElement component to behaviour
         * @property options
         * @type Object
         * @returns {{options: *}}
         */
        getInitialState:function(){
                var options;
                if(this.props.options!==undefined&&this.props.options!==null) {
                        options=this.props.options;
                }

                return {options: options};

        },
        render:function(){
                return (<div>
                        i just don't care
                        </div>)
        }
})