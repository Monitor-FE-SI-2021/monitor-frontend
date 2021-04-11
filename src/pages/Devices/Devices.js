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

import {DragDropContext} from 'react-beautiful-dnd'

const getRootGroups = (groups) => {
    const parentGroups = [];

    if (typeof groups.subGroups === "undefined") {
        return parentGroups
    }

    return groups.subGroups;

}

const Devices = ({ allGroups, fetchAllDevices, fetchAllGroups, push, devicesAsync, groupsAsync, setActiveGlobal, deviceTables }) => {

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


    const onDragEnd = (result) => {

        const { destination, source, draggableId} = result;

        console.log(result);
        console.log(deviceTables);

        if(destination == null){
            return;
        }
        if(destination.droppableId === source.droppableId){
            return;
        }

        const draggedDevice = (deviceTables[source.droppableId].devices.splice(source.index, 1)[0]);
        deviceTables[source.droppableId].totalCount = deviceTables[source.droppableId].devices.length;
        deviceTables[destination.droppableId].devices.splice(destination.index, 0, draggedDevice);
        deviceTables[destination.droppableId].totalCount = deviceTables[destination.droppableId].devices.length;

        console.log(deviceTables[source.droppableId]);
        console.log(deviceTables[destination.droppableId]);
        console.log(deviceTables[source.droppableId].devices);
        console.log(deviceTables[destination.droppableId].devices);
    }

    const rootGroups = getRootGroups(allGroups).map((grupa) => {
        return (
            <DragDropContext onDragEnd = {onDragEnd}>
                <DeviceGroup group={grupa}
                            key={grupa.groupId}/>
            </DragDropContext>
        );
    });

    return (
        <div className="page devices">
            <div className="top">
                <h1> Pregled mašina </h1>
                <button className="create" onClick={() => push(RouteLink.ManageDevice)}>Kreiraj mašinu</button>
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
    groupsAsync: state.groups.async,
    deviceTables: state.devices.deviceTables
}), { fetchAllDevices, fetchAllGroups, push, setActiveGlobal })(Devices);
