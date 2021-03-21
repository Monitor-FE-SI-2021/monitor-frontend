import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from './store/store'
import { Route } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Terminal from "./components/Terminal/App"

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div id='app'>
                <Route path='/' component={Layout}/>
                <Route path='/terminal' component={Terminal}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
