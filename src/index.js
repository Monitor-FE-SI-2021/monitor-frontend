import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import { ConnectedRouter, push } from "connected-react-router";
import { connect, Provider } from "react-redux";
import store, { history } from './store/store'
import { Route, Switch } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import ForgotPasswordEmail from "./pages/Login/ForgotPasswordEmail";
import ForgotPasswordQuestions from "./pages/Login/ForgotPasswordQuestions";
import PasswordReset from "./pages/Login/PasswordReset";
import { STORAGE_KEY } from "./utils/consts";
import { RouteLink } from "./store/modules/menu/menu";
import { getMe } from "./store/modules/login/login";
import { MuiThemeProvider } from "material-ui";
import ForgotPassword from "./pages/Login/ForgotPassword";

const App = ({ user, getMe, push }) => {

    useEffect(() => {

        const route = window.location.pathname;

        const token = localStorage.getItem(STORAGE_KEY);

        if (route === '/forgot-password-email' || route.slice(0, route.lastIndexOf('/')) === '/password-reset'
            || route === '/forgot-password-questions' || route === '/forgot-password-type') {
            return;
        }

        if (!token) {
            history.push(RouteLink.Login);
            return;
        }

        if (!user) {
            getMe().then(() => {
                push(route !== '/login' ? route : '/')
            })
        }

    }, [])

    return (
        <div id='app'>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/forgot-password-email' component={ForgotPasswordEmail}/>
                <Route path='/password-reset' component={PasswordReset}/>
                <Route path='/forgot-password-questions' component={ForgotPasswordQuestions}/>
                <Route path='/forgot-password-type' component={ForgotPassword}/>
                <Route path='/' component={Layout}/>
            </Switch>
        </div>
    )
}

const ConnectedApp = connect(state => ({
    user: state.login.user,
}), { getMe, push })(App);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ConnectedApp/>
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

