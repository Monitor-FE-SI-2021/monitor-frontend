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
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from "@material-ui/core";


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
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageGroup)}>Kreiraj grupu</button>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageDevice)}>Kreiraj mašinu</button>
                </div>
            </div>
            <div>
                <TextField
                    className='search'
                    size={'small'}
                    variant="outlined"
                    label="Pretraži grupe"
                    onChange={searchGroups}
                    value={groupsSearchText}
                />
                <TextField className='search'
                           InputProps={{
                               style: {

                               }
                           }}
                           label="Ime uređaja"
                           size={'small'}
                           variant="outlined"
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
}), { fetchAllDevices, fetchAllGroups, push, setActiveGlobal, searchGroupsAction })(Devices);
