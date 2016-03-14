
import React from 'react';

var ButtonElement=React.createClass({
        /**
         * options,this property will store the configure which behaviour u want the ButtonElement component to behaviour
         * @method getInitialState
         * @param options {Object} u configure in this object
         * @returns the state of component
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