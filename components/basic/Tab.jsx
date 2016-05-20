import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/tab.css';


var Tab=React.createClass({
    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null){
            data=this.props.data;
        }

        return({data:data});
    },
    linkCb:function(evt){
        var target=evt.target;
        var $target=$(target);
        var index = $target.attr("data-index");
        $target.addClass("active");
        var lis=$($target.parent()).find("li");
        for(var i=0;i<lis.length;i++) {
            var $li=$(lis[i]);
            if(i!==index) {
                $li.removeClass("active");
            }
        }
        this.setState({selected: index});
    },
    render:function(){

        var lis=new Array();
        var linkCb=this.linkCb;
        this.props.data.map(function(item,i){
                lis.push(<li className="cli" onClick={linkCb} key={i}>item.label</li>);
        })

        return(<div>
                    <div>
                          <ul>
                              {lis}
                          </ul>
                    </div>
               </div>)



    }
});
export default Tab;
