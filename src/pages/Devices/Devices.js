import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import {fetchAllDevices, fetchDevicesForGroup} from "../../store/modules/devices/actions";
import { fetchAllGroups } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { CircularProgress } from "@material-ui/core";
import { Spinner } from "../../components/Spinner/Spinner";

const getRootGroups = (groups) => {
    const parentGroups = [];

    if(typeof groups.subGroups === "undefined"){
        return parentGroups
    }

    return groups.subGroups;

}

const Devices = ({ allGroups, fetchAllDevices, fetchAllGroups, push, devicesAsync, groupsAsync }) => {

    const async = devicesAsync || groupsAsync;


    useEffect(() => {
        fetchAllDevices();
        fetchAllGroups();
    }, [fetchAllDevices, fetchAllGroups])



    const rootGroups = getRootGroups(allGroups).map((grupa) => {
        return (
            <DeviceGroup group={grupa}
                         key={grupa.groupId}/>
        );
    });

    return (
        <div className="page devices">
            <div className="top">
                <h1> Pregled mašina </h1>
                <button className="create" onClick={() => push(RouteLink.AddDevice)}>Kreiraj mašinu</button>
            </div>
            <div className={'groups-list'}>
                {async ? <Spinner color={'inherit'}/> : rootGroups}
            </div>
        </div>
    );
};

export default connect((state) => ({
    allDevices: state.devices.devices,
    allGroups: state.groups.groups,
    devicesAsync: state.devices.async,
    groupsAsync: state.groups.async
}), { fetchAllDevices,fetchAllGroups, push })(Devices);
