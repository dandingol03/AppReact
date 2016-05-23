import React from 'react';
import {render} from 'react-dom';
import '../../css/components/basic/tab.css';

import PanelTable from '../compounds/panelTable/PanelTable.jsx';
import Panel from '../../components/panel/Panel.jsx';
import OrdinaryTable from '../../components/forms/OrdinaryTable.jsx';
import EmbedTable from '../../components/forms/EmbedTable.jsx';
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
        var dataTabs=$dataTabs.children("div");
        for(var i=0;i<dataTabs.length;i++){

            var $dataTab=$(dataTabs[i]);
            if(i==index) {
                $dataTab.slideDown();
            }else{
                $dataTab.css("display", "none");
            }
        }
        this.setState({selected: index});
    },
    secondTabCb:function(evt){//TODO:zyy
        var target=evt.target;
        var $target=$(target);
        var index = $target.attr("data-index");
        var $dataTabs=$(this.refs["dataTabs"]);
        var second=$dataTabs.children("div")[this.state.selected];
        var $secondDataTabs=$(second).find(".second_data_tab");
        var datas=$secondDataTabs.children("div");
        for(var i=0;i<datas.length;i++){
            var $dataTab=$(datas[i]);
            if(i==index) {
                $dataTab.slideDown();
            }else{
                $dataTab.css("display", "none");
            }
        }
        this.setState({secondSelected:index});

    },//TODO:zyy
    getInitialState:function(){
        return ({selected: -1,secondSelected:-1});
    },
    render:function(){
        var tabs=new Array();
        var dataTabs = new Array();
        var tabCb=this.tabCb;
        var state=this.state;
        var secondTabCb=this.secondTabCb;
        this.props.data.map(function(first,i){
            tabs.push(
                //一级Tab
                <li className={state.selected==i?"cli "+"active":"cli"} onClick={tabCb} key={i} data-index={i}>
                    {first.title}
                </li>);
            //TODO:zyy
            if(first.sub!==null&&first.sub!==undefined) {
                var secondTabs=new Array();
                var datatab = first.sub;
                var secondDatatabs=new Array();
                datatab.map(function (secondTab, j) {
                    //二级Tab
                    secondTabs.push(
                                    <li className={state.secondSelected==j?"cli"+"active":"cli"} onClick={secondTabCb}
                                                        key={j} data-index={j}>
                                        {secondTab.title}
                                    </li>);
                    if (secondTab.comp !== undefined && secondTab.comp !== null) {
                        var comp = secondTab.comp;
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
                                    embedCols={comp.embedCols}/>
                                break;
                            default:
                                entity = <div></div>
                                break;
                        }
                        secondDatatabs.push(
                            <div key={j} style={{display:"none",width:"100%"}}>
                                {entity}
                            </div>);

                    }
                });

            }


            datatabs.push(
                <div className="second" key={i}  style={{display:"none",height:"100%"}}>
                    <div className="second-Tab-body">
                        <ul>
                            {secondTabs}
                        </ul>
                    </div>
                    <div className="second_data_tab">
                        {secondDatatabs}
                    </div>
                </div>
            );
        });

        return(<div className="tab">
                    <div className="tab-body" >
                          <ul>
                              {tabs}
                          </ul>
                    </div>
                    <div ref="dataTabs" className="data-tab">
                        {datatabs}

                    </div>
               </div>)
    }
});
export default Tab;
