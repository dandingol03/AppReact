import React from 'react';
import {render} from 'react-dom';
import News from '../modules/News.jsx';
import PasswordModify from '../password/PasswordModify.jsx';
import Tab from '../../../../../components/basic/Tab.jsx';
import NEWS from '../data/news.json';
import '../../../../../css/serviceHobby/basic/home.css';
import HighLight from '../../../../../components/basic/HighLight.jsx';
import SMain from '../modules/SMain.jsx';

var Home = React.createClass({

    render: function () {
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
            <div className="Home">

                <SMain/>



                <div className="total" style={{minHeight:"650px",marginTop:"0px",paddingBottom:"30px"}}>





                    <Tab data={[
        {
            "name":"出行计划" ,comp: {
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
            "name":"校区介绍" ,comp: {
            name        : "PanelTable",
            autoComplete: true,
            query       : query,
            bean        : bean,
            filterField : filterField
                                }
        },
        {
            "name":"周边环境" ,comp: {
            name        : "PanelTable",
            autoComplete: true,
            query       : query,
            bean        : bean,
            filterField : filterField
                                }
        }
    ]} width="1024px" gradient={true}/>


                    {this.props.children}
                </div>
            </div>

        )

    }
});

export default Home;