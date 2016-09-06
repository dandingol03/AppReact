/**
 * Created by dell on 2016/8/30.
 */
import React from 'react';
import {render} from 'react-dom';
import CoupleTableElement from '../../../../../../components/compounds/coupleTable/CoupleTableElement.jsx';
import OrdinaryTable from '../../../../../../components/forms/OrdinaryTable.jsx';
import NewCultivatePlan from './newCultivatePlan.jsx';
import DiminishMainCompound from '../studentSelfModifyCultivatePlan/DiminishMainCompound.jsx';
var ProxyQ=require('../../../../../../components/proxy/ProxyQ');

function cb(ob){
    console.log("ob=" + ob);
    if(ob!==undefined&&ob!==null)
    {
        if(ob.index!==undefined&&ob.index!==null) {
            if(this.props.index!==ob.index)//与发出消息的组件编号不同
            {
                var addRegex=/^add/g;
                var data=this.state.data;
                if(addRegex.test(ob.method))//将消息源的记录添加
                {
                    if(ob.multiCheck==true)
                    {
                        ob.content.map(function(item,i){
                            data.push(item);
                        });
                    }else{
                        data.push(ob.content);
                    }
                    var titles=new Array();
                    var cols;
                    for(var field in data[0])
                    {
                        titles.push(field);
                    }
                    cols=titles.length;
                    this.setState({data:data,cols:cols,titles:titles,data$initialed:true});
                }
            }
        }
    }
}

Boot();

function Boot()
{
    /**
     * OrdinaryTable 配置
     */
    var query={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:'newCultivateSessionPage',
            reactActionName:'newPlanSelectSession',

        }
    }

    /**
     * CoupleTable 配置
     */
    var data$options$1={

        subscribe:[{type:'fire',callback:cb}]

    }

    var data$options$2={
        subscribe:[{type:'fire',callback:cb}]
    }

    var data$options$3={
        subscribe:[{type:'fire',callback:cb}]
    }

    var tags=[
        {"data-options":data$options$1}
        ,{"data-options":data$options$2}
        ,{"data-options":data$options$3} ];

    var data$options={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:'newCultivatePlanPage',
            reactActionName:'newPlanSelectCourse',
            stuId:null,
        }
    }

    /**
     * S为学生
     * M为非学生
     * 刚开始时首先检查为学生还是老师
     */
    var verifyType={
        url:"/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:'newCultivateSessionPage',
            reactActionName:'newGetVerifyTypeCode'
        }
    }

    ProxyQ.queryHandle(
        'POST',
        verifyType.url,
        verifyType.params,
        null,
        function(data) {
            if (data.personType !== null && data.personType !== undefined && data.personType === "S") {
                if(data.stuId !== null && data.stuId !== undefined && data.stuId !== ""){
                    data$options.stuId = data.stuId;
                }

                render(
                    <div><DiminishMainCompound  />
                    </div>
                    , document.getElementById('cultivatePlanJsx'));

                //render(
                //    <div style={{paddingLeft:"50px",paddingRight:"50px"}}>
                //        <OrdinaryTable query={query} autoComplete={true} />
                //
                //        <CoupleTableElement tags={tags} data-options={data$options}/>
                //    </div>
                //    , document.getElementById('cultivateModifyCulPlanJsx'));

            } else if (data.personType !== null && data.personType !== undefined && data.personType === "M") {

                render(
                    <div>
                        <NewCultivatePlan/>
                    </div>
                    , document.getElementById('cultivateModifyCulPlanJsx'));
            }
        }
    );
}