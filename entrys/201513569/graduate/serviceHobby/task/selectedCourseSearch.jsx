import React from 'react';
import {render} from 'react-dom';
import Task from '../../../../../components/basic/Task.jsx';

Boot();

function Boot() {
    var data =
        [
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

    render(
        <Task data={data}/>
        , document.getElementById('root'))
}