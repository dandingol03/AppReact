import React from 'react';
import {render} from 'react-dom';
import News from '../modules/News.jsx';
import PasswordModify from '../password/PasswordModify.jsx';
import Tab from '../../../../../components/basic/Tab.jsx';
import NEWS from '../data/news.json';
import '../../../../../css/serviceHobby/basic/home.css';
import HighLight from '../../../../../components/basic/HighLight.jsx';
var Home =React.createClass({

    render:function(){
        var query = {

            url   : "/bsuims/reactPageDataRequest.do",
            params: {
                reactPageName  : "degreeAnonymousThesisReviewResult",
                reactActionName: "deegreeThesisReviewResultUseReact"
            }
        }
        var bean = {
            url   : "/bsuims/reactPageDataRequest.do",
            params: {
                reactPageName  : "degreeAnonymousThesisReviewResult",
                reactActionName: "deegreeThesisReviewPanelUseReact"
            }
        }
        var filterField = {
            "order"        : true,
            "stuNum"       : true,
            "stuName"      : true,
            "grade"        : true,
            "stuTypeName"  : true,
            "stuMajorName" : true,
            "thesisLevel"  : true,
            "commentResult": true,
            "attachs"      : true
        }


     return (
         <div className="total" style={{minHeight:"650px",marginTop:"0px",paddingBottom:"30px"}}>
             <HighLight type="OrdinaryTable"
                        title='<span  style="font-size: 14px;color: #6EA0FF;font-weight:bold;text-align:center">个人信息状态</span>'
                        query={{ url:'/bsuims/reactPageDataRequest.do',
                                   params: {
                                      reactActionName: "registerInformationReact",
                                      reactPageName  : "registerRulePage"
                                            }
                                 }}
                        filterField={{
                               "stuName":true,
		                       "stuNum":true,
		                       "feeStatus":true,
		                       "baseInfoFillStatus":true,
		                       "moralityFillStatus":true,
		                       "greenwayStatus":true,
		                       "trafiicFillStatus":true,
                               "studyStateStr":true
                             }}
                 />



             <div className="vcc-index_title_box vcc-index_title_box_1">
                 <div className="vcc-index_title">
                     <span href="#" className="vcc-index_title_a">个人信息</span>
                 </div>
             </div>


             <Tab data={[
        {
            "name":"查看课表" ,comp: {
                name        : "Task",
            data:[
            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
            ,

            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
            ,


            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"},
                {name: "生理健康", rowSpan: "1"}
            ]
        ]
                    }
        },
        {
            "name":"学生表现" ,comp: {
            name        : "PanelTable",
            autoComplete: true,
            query       : query,
            bean        : bean,
            filterField : filterField
                                }
        },
        {
            "name":"学位信息" ,comp: {
            name        : "PanelTable",
            autoComplete: true,
            query       : query,
            bean        : bean,
            filterField : filterField
                                }
        },
        {
            "name":"学籍信息" ,comp: {
            name        : "PanelTable",
            autoComplete: true,
            query       : query,
            bean        : bean,
            filterField : filterField
                                }
        }
    ]} width="1024px"  gradient={true}/>


             {this.props.children}
         </div>
     )

    }
});

export default Home;