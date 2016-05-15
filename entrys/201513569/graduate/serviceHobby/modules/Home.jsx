import React from 'react';
import {render} from 'react-dom';
import News from '../modules/News.jsx';
import NEWS from '../data/news.json';
var Home =React.createClass({

    render:function(){

     return (
         <div>
             <News data={NEWS}/>
             {this.props.children}
         </div>
     )

    }
});

export default Home;