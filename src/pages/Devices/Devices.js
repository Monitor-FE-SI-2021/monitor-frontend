import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import {
    fetchAllDevices,
    searchDevicesAction,
    setActiveGlobal,
    updateDevicesTableForGroup
} from "../../store/modules/devices/actions";
import { fetchAllGroups, searchGroupsAction } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { Spinner } from "../../components/Spinner/Spinner";
import request, { wsEndpoint, devices } from "../../service";
import { TextField } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd"
import { showSwalToast } from "../../utils/utils";
import AllDevices from "../../components/AllDevices/AllDevices";


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

        const { destination, source, draggableId } = result;

        if (destination == null) {
            return;
        }
        if (destination.droppableId === source.droppableId) {
            return;
        }

        // Splice source devices inplace
        const draggedDevice = deviceTables[source.droppableId].devices[source.index];

        // Set async
        updateDevicesTableForGroup({
            groupId: source.droppableId,
            data: {
                async: true
            },
        });

        updateDevicesTableForGroup({
            groupId: destination.droppableId,
            data: {
                async: true
            },
        });

        request(devices + `/${destination.droppableId}`, 'PUT', draggedDevice)
            .then(r => {

                // Splice source devices inplace
                deviceTables[source.droppableId].devices.splice(source.index, 1)

                // SOURCE GROUP
                updateDevicesTableForGroup({
                    groupId: source.droppableId,
                    data: {
                        totalCount: deviceTables[source.droppableId].devices.length,
                        devices: deviceTables[source.droppableId].devices,
                    }
                });

                // Splice destination devices inplace
                deviceTables[destination.droppableId].devices.splice(destination.index, 0, draggedDevice);

                // DESTINATION GROUP
                updateDevicesTableForGroup({
                    groupId: destination.droppableId,
                    data: {
                        totalCount: deviceTables[destination.droppableId].devices.length,
                        devices: deviceTables[destination.droppableId].devices,
                    },
                });

                showSwalToast(`Uspješno premještena mašina '${draggedDevice.name}'`, 'success');

            }).finally(() => {
            updateDevicesTableForGroup({
                groupId: source.droppableId,
                data: { async: false },
            });
            updateDevicesTableForGroup({
                groupId: destination.droppableId,
                data: { async: false },
            });
        })
    }

    const rootGroups = (Boolean(groupsSearchText) ? searchedGroups : getRootGroups(allGroups)).map((grupa, index) => {
        return (
            <DragDropContext onDragEnd={onDragEnd} key={grupa?.groupId || index}>
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
            {groupsSearchText === "" && devicesSearchText !== "" ?
                <AllDevices/>
                :
                <div className={'groups-list'}>
                    {async ? <Spinner color={'inherit'}/> : rootGroups}
                </div>}
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
}), {
    updateDevicesTableForGroup,
    fetchAllDevices,
    fetchAllGroups,
    push,
    setActiveGlobal,
    searchGroupsAction,
    searchDevicesAction
})(Devices);
