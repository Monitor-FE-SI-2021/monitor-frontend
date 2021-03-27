import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import { ConnectedRouter, push } from "connected-react-router";
import { connect, Provider } from "react-redux";
import store, { history } from './store/store'
import { Route, Switch } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword";
import { STORAGE_KEY } from "./utils/consts";
import { RouteLink } from "./store/modules/menu/menu";
import { getMe } from "./store/modules/login/login";

const App = ({ user, getMe, push }) => {

    useEffect(() => {

        const route = window.location.pathname;

        const token = localStorage.getItem(STORAGE_KEY);

        if(route == RouteLink.ForgotPassword) {
            console.log("kdjaw");
            return;
        }

        if (!token) {
            history.push(RouteLink.Login);
            return;
        }

        if (!user) {
            getMe().then(() => {
                push(route);
            })
        }

    }, [])

    return (
        <div id='app'>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path={RouteLink.ForgotPassword} component={ForgotPassword}/>
                <Route path='/' component={Layout}/>
            </Switch>
        </div>
    )
}

const ConnectedApp = connect(state => ({
    user: state.login.user,
}), { getMe, push})(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConnectedApp/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
