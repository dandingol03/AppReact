import React from 'react';
import {render} from 'react-dom';
import DiminishMain from './diminishMainCompoundUnChecked.jsx';

Boot();

function Boot(){
    render(
        <DiminishMain/>
        , document.getElementById('root'));
}