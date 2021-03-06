

import React from 'react';
import {render} from 'react-dom';
import Table from './components/forms/Table.jsx';
import ButtonElement from './components/basic/ButtonElement.jsx';
import CoupleTableElement from './components/compounds/coupleTable/CoupleTableElement.jsx';


Boot()

//make your cb in table environment
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
                    this.setState({data:data,cols:cols,titles:titles});
                }
            }
        }
    }
}



function Boot()
{

    function check$apply$1(ob){
        console.log("ob="+ob);
    }

    var check$apply$2=function(ob){
        console.log("ob="+ob);

    }

    var data1=[
        {'name':'wjj','age':18,'sex':'man'},
        {'name':'zyy','age':25,'sex':'woman'},
        {'name':'bianfu','age':20,'sex':'woman'},
        {'name':'baomu','age':18,'sex':'woman'},
        {'name':'official','age':17,'sex':'woman'}
    ]
    var data2=[
    ]
    var data$options={
        url:"gradms/bsuims/reactPageDataRequest.do",
        params:{
            reactPageName:'newCultivateTeachSchedulePage',
            reactActionName:'reactGetCoupleData'
        }
    }
    var data$options$1={
        widths:["25%","25%","25%","25%"],
        components:[
            {
                name:"查询",type:"query",id:"query1",
                params:{
                    reactPageName:'newCultivateTeachSchedulePage',
                    reactActionName:'reactGetTestData'
                },
                url:"gradms/bsuims/reactPageDataRequest.do"
            },
            {
                name:"年级",type:"dropdown",data:[
                {link:"javascript:void(0)",title:"baidu",value:"baidu"},
                {link:"javascript:void(0)",title:"sohu",value:"sohu"},
                {link:"javascript:void(0)",title:"kuaibo",value:"kuaibo"},
                {link:"javascript:void(0)",title:"shanda",value:"shanda"}],
                id:"grade1"
            },
            {
                type:"input",
                id:"personId1"
            }
        ],
        checked:{
            url:"gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivateTeachSchedulePage',
                reactActionName:'reactGetTestData'
            },
            name:"增加上表选择",
            multiCheck:true
        },
        subscribe:[{type:'fire',callback:cb}]

    }

    var data$options$2={
        widths:["25%","25%","25%","25%"],
        components:[
            {
                name:"查询",type:"query",id:"query2",
                params:{
                    reactPageName:'newCultivateTeachSchedulePage',
                    reactActionName:'reactGetTestData'
                },
                url:"gradms/bsuims/reactPageDataRequest.do"
            },
            {
                name:"年级",type:"dropdown",data:[
                {link:"javascript:void(0)",title:"baidu",value:"baidu"},
                {link:"www.sohu.com",title:"sohu",value:"sohu"},
                {link:"www.kuaibo.com",title:"kuaibo",value:"kuaibo"},
                {link:"www.shanda.com",title:"shanda",value:"shanda"}],
                id:"grade2"
            }],
        checked:{
            url:"gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivateTeachSchedulePage',
                reactActionName:'reactGetTestData'
            },
            name:"增加下表选择",
            multiCheck:true
        },
        subscribe:[{type:'fire',callback:cb}]
    }


    /*    var tags=[{"data":data1,"data-options":data$options$1}
     ,{"data":data2,"data-options":data$options$2}];*/
    var tags=[
        {"data-options":data$options$1,"data":data1}
        ,{"data-options":data$options$2,"data":data2}
    ];
    var containerStyle={textAlign:"center"};
    render(
        <CoupleTableElement tags={tags} data-options={data$options}/>
        , document.getElementById('root'))

}


