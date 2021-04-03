import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import { fetchAllDevices, setActiveGlobal } from "../../store/modules/devices/actions";
import { fetchAllGroups, searchGroupsAction } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { Spinner } from "../../components/Spinner/Spinner";
import request, { wsEndpoint } from "../../service";


const getRootGroups = (groupTree) => {
    const parentGroups = [];

    if (typeof groupTree.subGroups === "undefined") {
        return parentGroups
    }

    return groupTree.subGroups;

}

const Devices = ({
                     allGroups,
                     fetchAllDevices,
                     fetchAllGroups,
                     push,
                     devicesAsync,
                     groupsAsync,
                     setActiveGlobal,
                     groupsSearchText,
                     searchGroupsAction,
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

    const rootGroups = (Boolean(groupsSearchText) ? searchedGroups : getRootGroups(allGroups)).map((grupa) => {
        return (
            <DeviceGroup group={grupa}
                         shouldRenderSubgroups={!Boolean(groupsSearchText)}
                         key={grupa.groupId}/>
        );
    });

    const searchGroups = (e) => {

        const searchText = e.target.value;

        // if (searchText?.length >= 3) {
        //
        // }

        searchGroupsAction(searchText);
    }

    return (
        <div className="page devices">
            <div className="top">
                <h1> Pregled mašina </h1>
                <div>
                    <button className="create" onClick={() => push(RouteLink.ManageGroup)}>Kreiraj grupu</button>
                    <button className="create" onClick={() => push(RouteLink.ManageDevice)}>Kreiraj mašinu</button>
                </div>
            </div>
            <div>
                <input className='search'
                       type='text'
                       id='groupInput'
                       onChange={searchGroups}
                       value={groupsSearchText}
                       placeholder='Search by group name'/>
                <input className='search' type='text' placeholder='Search by device name'/>
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
    searchedGroups: state.groups.searchedGroups,
    devicesAsync: state.devices.async,
    groupsAsync: state.groups.async,
    groupsSearchText: state.groups.searchText,
    searchedGroups: state.groups.searchedGroups,
}), { fetchAllDevices, fetchAllGroups, push, setActiveGlobal, searchGroupsAction })(Devices);
