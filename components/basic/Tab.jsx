import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/tab.css';
import PanelTable from '../compounds/panelTable/PanelTable.jsx';


var Tab=React.createClass({
    tabCb:function(evt){
        var target=evt.target;
        var $target=$(target);
        var index = $target.attr("data-index");
        var $dataTabs=$(this.refs["dataTabs"]);
        var dataTabs=$dataTabs.find("div");
        for(var i=0;i<dataTabs.length;i++) {
            var $dataTab=$(dataTabs[i]);
            if(i==index) {
                $dataTab.slideDown();
            }else{
                $dataTab.css("display", "none");
            }
        }
        this.setState({selected: index});
    },
    getInitialState:function(){

        return ({selected: -1});
    },
    render:function(){

        var tabs=new Array();
        var datatabs=new Array();
        var tabCb=this.tabCb;
        var state=this.state;

        this.props.data.map(function(item,i){
            tabs.push(
                <li className={state.selected==i?"cli "+"active":"cli"} onClick={tabCb} key={i} data-index={i}>
                    {item.name}
                </li>);
            if(item.dataTab!==undefined&&item.dataTab!==null)
            {
                var datatab=item.dataTab;
                datatabs.push(
                    <div key={i} style={{display:"none"}}>
                        <PanelTable
                            bean={datatab.bean}
                            autoComplete={datatab.autoComplete}
                            query={datatab.query}
                            filterField={datatab.filterField}/>
                    </div>
                 );
            }

        });
        return(<div className="tab">
                    <div className="tab-body" >
                          <ul>
                              {tabs}
                          </ul>
                    </div>
                    <div ref="dataTabs">
                        {datatabs}
                    </div>
               </div>)



    }
});
export default Tab;
