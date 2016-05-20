import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/tab.css';
import PanelTable from '../compounds/panelTable/PanelTable.jsx';
import OrdinaryTable from '../../components/forms/OrdinaryTable.jsx';
import EmbedTable from '../../components/forms/EmbedTable.jsx';


/**
 * Tab component
 *
 *
 *
 */


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
        var dataTabs = new Array();
        var tabCb=this.tabCb;
        var state=this.state;

        this.props.data.map(function(item,i){
            tabs.push(
                <li className={state.selected==i?"cli "+"active":"cli"} onClick={tabCb} key={i} data-index={i}>
                    {item.name}
                </li>);
            if(item.dataTab!==undefined&&item.dataTab!==null)
            {
                var dataTab = item.dataTab;
                var comp;
                switch (dataTab.type) {
                    case "PanelTable":
                        comp = <PanelTable
                            bean={dataTab.bean}
                            autoComplete={dataTab.autoComplete}
                            query={dataTab.query}
                            filterField={dataTab.filterField}/>
                        break;
                    case "Panel":
                        comp = <div></div>
                        break;
                    case "OrdinaryTable":
                        comp = <OrdinaryTable/>
                        break;
                    case "EmbedTbale":
                        comp = <EmbedTable/>
                        break;
                    default:
                        comp = <div></div>
                        break;
                }
                dataTabs.push(
                    <div key={i} style={{display:"none"}}>
                        {comp}
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
                        {dataTabs}
                    </div>
               </div>)



    }
});
export default Tab;
