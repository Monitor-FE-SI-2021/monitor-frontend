import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import { fetchAllDevices, setActiveGlobal } from "../../store/modules/devices/actions";
import { fetchAllGroups } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { Spinner } from "../../components/Spinner/Spinner";
import request, { wsEndpoint } from "../../service";

const getRootGroups = (groups) => {
    const parentGroups = [];

    if (typeof groups.subGroups === "undefined") {
        return parentGroups
    }

    return groups.subGroups;

}

const Devices = ({ allGroups, fetchAllDevices, fetchAllGroups, push, devicesAsync, groupsAsync, setActiveGlobal }) => {

    useEffect(() => {
        request(wsEndpoint + "/agent/online")
            .then((res) => {
                setActiveGlobal(res.data)
            })
    }, [])

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
                <div>
                    <button className="create" onClick={() => push(RouteLink.ManageGroup)}>Kreiraj grupu</button>
                    <button className="create" onClick={() => push(RouteLink.ManageDevice)}>Kreiraj mašinu</button>
                </div>
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
}), { fetchAllDevices, fetchAllGroups, push, setActiveGlobal })(Devices);
