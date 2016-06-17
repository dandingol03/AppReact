/**
 * Created by outstudio on 16/5/6.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './modules/App.jsx';
import Home from './modules/Home.jsx';
import MainSection from './modules/MainSection.jsx';


render((
    <Router history={browserHistory}>
        <Route path={window.App.getAppRoute()} component={App}>
            <IndexRoute component={Home}/>
            <Route path={window.App.getAppRoute()+"/password/modify"} component={MainSection}/>
            <Route path={window.App.getAppRoute()+"/allCourseQuery"} component={MainSection}/>
            <Route path={window.App.getAppRoute()+"/news"} component={MainSection}/>
        </Route>
    </Router>
), document.getElementById('root'))

