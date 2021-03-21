import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from './store/store'
import { Route } from 'react-router-dom';
import Layout from "./components/Layout/Layout";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div id='app'>
                <Route path='/' component={Layout}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
