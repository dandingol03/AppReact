import React from 'react';
import {render} from 'react-dom';
import NotedList from '../../../../../components/basic/NotedList.jsx';

Boot()

function Boot(){

    var title="个人信息";
    //var url="/ReactJPChatter/person/stuinfo_personBasicInfoUpdate.do"
    var data=[
        {content:"学号"},
        {content:"姓名"},
        {content:"年级"},
        {content:"职称"}
    ]

    var query={
        url:"/gradms/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:"personInfoPage",
            reactActionName:""
        }
    }
    render(
        <NotedList
            title={title}
            data={data}
            query={query}
            autoFetch={true}
            comp="menu"
            />
        , document.getElementById('root'))
}