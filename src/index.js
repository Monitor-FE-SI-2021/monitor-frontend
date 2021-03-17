import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import App from './App';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from './store/store'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
