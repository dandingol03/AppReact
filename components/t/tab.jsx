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

    render(

        <Mapper  fields={fields}/>

        , document.getElementById('root'))


}