import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/tab.css';


var Tab=React.createClass({
    linkCb:function(evt){
        var target=evt.target;
        var $target=$(target);
        var index = $target.attr("data-index");

        this.setState({selected: index});
    },
    getInitialState:function(){

        return ({selected: -1});
    },
    render:function(){

        var lis=new Array();
        var linkCb=this.linkCb;
        var state=this.state;
        this.props.data.map(function(item,i){
            if(state.selected!==undefined&&state.selected!==null&&
                i==parseInt(state.selected))
            {
                lis.push(<li className="cli active" onClick={linkCb} key={i} data-index={i}>{item.name}</li>);
            }
            else{
                lis.push(<li className="cli" onClick={linkCb} key={i} data-index={i}>{item.name}</li>);
            }

        });

        return(<div className="tab">
                    <div className="tab-body" >
                          <ul>
                              {lis}
                          </ul>
                    </div>
               </div>)



    }
});
export default Tab;
