import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React, { useEffect } from 'react';
import { fetchAllDevices, setActiveGlobal } from "../../store/modules/devices/actions";
import { fetchAllGroups, searchGroups } from "../../store/modules/groups/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { Spinner } from "../../components/Spinner/Spinner";
import request, { wsEndpoint } from "../../service";
import {flattenGroup} from "../../components/ManageDeviceForm/ManageDeviceForm";
import { CircularProgress } from "material-ui";


const getRootGroups = (groups) => {
    const parentGroups = [];

    if (typeof groups.subGroups === "undefined") {
        return parentGroups
    }

    return groups.subGroups;

}

const Devices = ({ allGroups, fetchAllDevices, fetchAllGroups, push, devicesAsync, groupsAsync, setActiveGlobal,inputEmpty,searchedGroups}) => {

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


    const rootGroups = getRootGroups(inputEmpty!=='' ? allGroups : searchedGroups).map((grupa) => {
        return (
            <DeviceGroup group={grupa}
                         key={grupa.groupId}/>
        );
    });

    const filterSearchGroups = (e) =>{
        inputEmpty = e.target.value
        console.log(inputEmpty)
        searchedGroups=flattenGroup(allGroups.subGroups)
        if(inputEmpty.length>=3){
        searchedGroups = searchedGroups.filter(function (k){
             return k.name.includes(inputEmpty)
        })
    }
        console.log(searchedGroups)
        
    }

    return (
        <div className="page devices">
            <div className="top">
                <h1> Overview </h1>
                <button className="create" onClick={() => push(RouteLink.ManageDevice)}>Create machine</button>
            </div>
            <div>
            <input className='search' type='text' id='groupInput' onChange = {filterSearchGroups} placeholder='Search by group name'/>
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
    devicesAsync: state.devices.async,
    groupsAsync: state.groups.async
}), { fetchAllDevices, fetchAllGroups, push, setActiveGlobal })(Devices);
