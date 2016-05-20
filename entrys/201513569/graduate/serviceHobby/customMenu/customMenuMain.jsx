import React from 'react';
import {render} from 'react-dom';
import CustomMenu from '../../../../../components/basic/CustomMenu.jsx';


Boot();

function Boot() {

    var query = {
        url   : "/bsuims/reactPageDataRequest.do",
        params: {
            reactPageName  : "",
            reactActionName: ""
        }
    }
    var data = [
        {selected: true, name: "a"},
        {selected: true, name: "b"},
        {selected: true, name: "c"},
        {selected: true, name: "d"},
        {selected: true, name: "e"},
        {selected: false, name: "f"},
        {selected: false, name: "g"},
        {selected: false, name: "h"},
        {selected: false, name: "i"},
        {selected: false, name: "j"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"},
        {selected: false, name: "k"}
    ];
    require(["../../../../../components/basic/CustomMenu.jsx"], function (Component) {
        render(
            React.createElement(Component, {data: data, query: query})
            , document.getElementById('root'));

    });


    //render(
    //    <CustomMenu
    //        data={data}
    //        query={query}
    //        />
    //    , document.getElementById('root'));


}