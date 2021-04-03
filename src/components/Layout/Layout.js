import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { RouteLink } from "../../store/modules/menu/menu";
import classnames from "classnames";
import { connect } from "react-redux";
import Devices from "../../pages/Devices/Devices";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Reporting from "../../pages/Reporting/Reporting";
import ManageDevice from "../../pages/ManageDevice/ManageDevice";
import Terminal from "../Terminal/Terminal";
import TwoFactorAuthentication from "../TwoFactorAuthentication/TwoFactorAuthentication";
import RemoteControl from "../../pages/RemoteControl/RemoteControl";
import FileManagerView from "../../pages/FileManager/FileManager";
import { Spinner } from "../Spinner/Spinner";

const Layout = ({ isMenuExpanded, loginAsync, userAsync, user }) => {
    if (loginAsync || userAsync) {
        return <Spinner/>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={classnames("layout", { "menu-expanded": isMenuExpanded })}>
            <Header/>

            <div className='main-view'>
                <Switch>
                    <Route exact path={RouteLink.Dashboard} component={Dashboard}/>
                    <Route path={RouteLink.Devices} component={Devices}/>
                    <Route path={RouteLink.Reporting} component={Reporting}/>
                    <Route path={RouteLink.AddDevice} component={ManageDevice}/>
                    <Route path={RouteLink.Terminal} component={Terminal}/>
                    <Route path={RouteLink.RemoteControl} component={RemoteControl}/>
                    <Route path={RouteLink.TwoFactorAuthentication} component={TwoFactorAuthentication}/>
                    <Route path={RouteLink.FileManagerView} component={FileManagerView}/>
                </Switch>
            </div>
        </div>
    )
};

export default connect(
    (state) => ({
        isMenuExpanded: state.menu.isMenuExpanded,
        loginAsync: state.login.loginAsync,
        userAsync: state.login.userAsync,
        user: state.login.user,
  }),
  {}
)(Layout);
