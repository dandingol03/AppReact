import React from 'react';
import {render} from 'react-dom';
import Mapper from '../../components/basic/Mapper.jsx';
Boot()

function Boot()
{  var fields=[
    {"label":"tableA"},
    {"label":"tableB"},
    {"label":"tableC"}


   ];

   var bean={
       url:"/bsuims/reactPageDataRequest.do",
        params:{
        reactActionName:"selectAllTable",
        reactPageName:"processTableRulePage"
}
   }
    render(

        <Mapper  fields={fields} bean={bean}/>

        , document.getElementById('root'))


}