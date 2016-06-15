import React from 'react';
import {render} from 'react-dom';
import News from '../modules/News.jsx';
import PasswordModify from '../password/PasswordModify.jsx';
import Tab from '../../../../../components/basic/Tab.jsx';
import NEWS from '../data/news.json';
import '../../../../../css/serviceHobby/basic/home.css';
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
         <div  className="total" style={{marginTop:"120px"}}>




             <Tab data={[
        {
            "name":"查看课表" ,comp: {
                name        : "Task",
            data:[
            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
            ]
            ,

            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
            ]
            ,


            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
            ]
            ,
            [
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"},
                {name: "生理健康", rowSpan: "2"}
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