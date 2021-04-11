import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import { fetchAllDevices, searchDevicesAction, setActiveGlobal, updateDevicesTableForGroup } from "../../store/modules/devices/actions";
import { fetchAllGroups, searchGroupsAction } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { Spinner } from "../../components/Spinner/Spinner";
import request, { wsEndpoint, devices } from "../../service";
import { TextField } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd"
import { showSwalToast } from "../../utils/utils";

const getRootGroups = (groupTree) => {
    const parentGroups = [];

    if (typeof groupTree.subGroups === "undefined") {
        return parentGroups
    }

    return groupTree.subGroups;

}

const Devices = ({
                     allGroups,
                     updateDevicesTableForGroup,
                     fetchAllDevices,
                     fetchAllGroups,
                     push,
                     devicesAsync,
                     groupsAsync,
                     setActiveGlobal,
                     groupsSearchText,
                     searchGroupsAction,
                     devicesSearchText,
                     deviceTables,
                     searchDevicesAction,
                     searchedGroups = []
                 }) => {

    const async = devicesAsync || groupsAsync;

    useEffect(() => {
        request(wsEndpoint + "/agent/online")
            .then((res) => {
                setActiveGlobal(res.data)
            })
    }, [])

    useEffect(() => {
        fetchAllDevices();
        fetchAllGroups();
    }, [fetchAllDevices, fetchAllGroups])
    
    const onDragEnd = (result) => {
        
        const { destination, source, draggableId} = result;

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

        updateDevicesTableForGroup({groupId:source.droppableId, data:deviceTables[source.droppableId]});
        updateDevicesTableForGroup({groupId:destination.droppableId, data:deviceTables[destination.droppableId]});

        request(devices + `/${destination.droppableId}`, 'PUT', draggedDevice)
            .then(r => {
                console.log(r.data);
                showSwalToast(`Uspješno premještena mašina '${draggedDevice.name}'`, 'success');
            }).finally(() => {
            push(RouteLink.Devices);
        })
    }

    const rootGroups = (Boolean(groupsSearchText) ? searchedGroups : getRootGroups(allGroups)).map((grupa) => {
        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <DeviceGroup group={grupa}
                    key={grupa.groupId}/>
            </DragDropContext>   
        );
    });

    const searchDevices = (e) => {
        const searchText = e.target.value;
        searchDevicesAction(searchText);
    }

    const searchGroups = (e) => {
        const searchText = e.target.value;
        searchGroupsAction(searchText);
    }

    return (
        <div className="page devices">
            <div className="top">
                <span className='page-title'> Pregled mašina </span>
                <div>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageGroup)}>Kreiraj grupu</button>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageDevice)}>Kreiraj mašinu</button>
                </div>
            </div>
            <div className='search-fields'>
                <TextField
                    className='search'
                    size={'small'}
                    variant="outlined"
                    label="Pretraži grupe"
                    onChange={searchGroups}
                    value={groupsSearchText}
                />
                <TextField className='search'
                           label="Pretraži uređaje"
                           size={'small'}
                           variant="outlined"
                           value={devicesSearchText}
                           onChange={searchDevices}
                />
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
    groupsSearchText: state.groups.searchText,
    searchedGroups: state.groups.searchedGroups,
    devicesSearchText: state.devices.searchText,
    deviceTables: state.devices.deviceTables
}), { updateDevicesTableForGroup, fetchAllDevices, fetchAllGroups, push, setActiveGlobal, searchGroupsAction, searchDevicesAction })(Devices);
