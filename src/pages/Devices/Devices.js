import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import { fetchAllDevices } from "../../store/modules/devices/actions";
import { fetchAllGroups } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

const getRootGroups = (groups) => {
    const parentGroups = []

    for (let group of groups) {
        if (group.parentGroup === null) {
            parentGroups.push(group)
        }
    }

    return parentGroups
}

const Devices = ({ allGroups, fetchAllDevices, fetchAllGroups, push }) => {

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
            {rootGroups}
        </div>
    );
};

export default connect((state) => ({
    allDevices: state.devices.devices,
    allGroups: state.groups.groups,
}), { fetchAllDevices, fetchAllGroups, push })(Devices);
