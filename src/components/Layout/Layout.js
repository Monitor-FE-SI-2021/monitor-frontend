import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { RouteLink } from "../../store/modules/menu/menu";
import classnames from "classnames";
import { connect } from "react-redux";
import Devices from "../../pages/Devices/Devices";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Reporting from "../../pages/Reporting/Reporting";
import ReportList from "../../pages/Reporting/ReportList";
import ManageDevice from "../../pages/ManageDevice/ManageDevice";
import TwoFactorAuthentication from "../TwoFactorAuthentication/TwoFactorAuthentication";
import { Spinner } from "../Spinner/Spinner";
import Terminal from "../Terminal/Terminal";
import RemoteControl from "../../pages/RemoteControl/RemoteControl";
import securityQuestions from "../securityQuestions/Questions"
import MyProfile from "../MyProfile/MyProfile"
import ManageGroup from "../../pages/ManageGroup/ManageGroup";

const Layout = ({ isMenuExpanded, loginAsync, userAsync, user }) => {
    if (loginAsync || userAsync) {
        return <Spinner className={'app-loader'}/>;
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
                    <Route path={RouteLink.ReportList} component={ReportList}/>
                    <Route path={RouteLink.Reporting} component={Reporting}/>
                    <Route path={RouteLink.ManageDevice} component={ManageDevice}/>
                    <Route path={RouteLink.ManageGroup} component={ManageGroup}/>
                    <Route path={RouteLink.TwoFactorAuthentication} component={TwoFactorAuthentication}/>
                    <Route path={RouteLink.Terminal} component={Terminal}/>
                    <Route path={RouteLink.MyProfile} component={MyProfile}/>
                    <Route path={RouteLink.securityQuestions} component={securityQuestions}/>
                    <Route
                        path={RouteLink.RemoteControl + "/:name?/:tab?"}
                        component={RemoteControl}
                    />
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
