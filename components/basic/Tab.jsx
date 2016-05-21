import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/tab.css';
import PanelTable from '../../components/compounds/panelTable/PanelTable.jsx';
import Panel from '../../components/panel/Panel.jsx';
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
        var dataTabs = $dataTabs.children("div");
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
                    {item.title}
                </li>);
            if (item.comp !== undefined && item.comp !== null)
            {
                var comp = item.comp;
                var entity = null;

                switch (comp.name) {
                    case "PanelTable":
                        entity = <PanelTable
                            bean={comp.bean}
                            autoComplete={comp.autoComplete}
                            query={comp.query}
                            filterField={comp.filterField}/>
                        break;
                    case "Panel":
                        entity = <Panel/>
                        break;
                    case "OrdinaryTable":
                        entity = <OrdinaryTable/>
                        break;
                    case "EmbedTable":
                        entity = <EmbedTable
                            data={comp.data}
                            embedCols={comp.embedCols}
                            />
                        break;
                    default:
                        entity = <div></div>
                        break;
                }
                dataTabs.push(
                    <div key={i} style={{display:"none",width:"100%"}}>
                        {entity}
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
            <div className="tab-data" ref="dataTabs">
                        {dataTabs}
                    </div>
               </div>)



    }
});
export default Tab;
