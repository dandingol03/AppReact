/**
 * Created by dandi_000 on 2016/2/23.
 */


import React from 'react';
import {render} from 'react-dom';
import Table from './components/forms/Table.jsx';

Boot()

function Boot()
{
    var columns={
        titles:['d1','d2','d3'],
        fields:['name','age','sex'],
        cols:3
    };

/*    var data=[
        {'name':'wjj','age':18,'sex':'man'},
        {'name':'zyy','age':25,'sex':'woman'}
    ]*/
    var data_options={
        widths:["25%","25%","25%","25%"],
        components:[
            {name:"查询",type:"query",params:{reactPageName:'newCultivateTeachSchedulePage',
                reactActionName:'reactGetTestData'},
            url:"gradms/bsreactPageDataRequest.do"},
            {
                name:"年级",type:"dropdown",params:[
                {link:"www.baidu.com",title:"baidu"},
                {link:"www.sohu.com",title:"sohu"},
                {link:"www.kuaibo.com",title:"kuaibo"},
                {link:"www.shanda.com",title:"shanda"}]
            }
        ]
    }


    var width="600px";
    var divRowStyle = {
        marginTop: 20
    };
    render(
        <div className="row" style={divRowStyle}>
            <div className="container">
                <Table tdBasic={true} multiEnable={1}
                       width={width} center={true}
                       data-options={data_options} />
            </div>
        </div>
        , document.getElementById('root'));
}





