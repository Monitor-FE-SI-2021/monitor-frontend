import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { RouteLink } from "../../store/modules/menu";
import classnames from 'classnames';
import { connect } from "react-redux";
import Devices from "../../pages/Devices/Devices";
import PrimjerKomponente from "../PrimjerKomponente";
import Dashboard from "../../pages/Dashboard/Dashboard";
import RemoteControl from "../../pages/RemoteControl/RemoteControl"
const Layout = ({ isMenuExpanded }) => (
    <div className={classnames('layout', { 'menu-expanded': isMenuExpanded })}>
        <Header/>

        <div className='main-view'>
            <Switch>
                <Route exact path={RouteLink.Dashboard} component={Dashboard}/>
                <Route path={RouteLink.Devices} component={Devices}/>
                <Route path={RouteLink.Test} component={PrimjerKomponente}/>
                <Route path ={RouteLink.RemoteControl} component={RemoteControl}></Route>
            </Switch>
        </div>
    </div>
);

export default connect(state => ({
    isMenuExpanded: state.menu.isMenuExpanded
}), {})(Layout);