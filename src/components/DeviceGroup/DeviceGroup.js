import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {fetchDevicesForGroup} from "../../store/modules/devices/actions";

const DeviceGroup = ({ group,fetchDevicesForGroup, allGroups, allDevices }) => {

    const [hidden, setHidden] = useState(true);

    // useEffect(() => {
    //     fetchDevicesForGroup(group.groupId)
    // })

    const getSubGroups = (groups, groupId) => {
        const subGroups = [];

        for (let group of groups) {
            if (group.parentGroup === groupId) {
                subGroups.push(group);
            }
        }

        return subGroups;
    }

    const getFilterDevices = (devices) => {
        const filteredDevices = [];

        for (let device of devices) {
            if (device.groupId === group.groupId) {
                filteredDevices.push(device);
            }
        }

        return filteredDevices;
    }

    // let subGroups = getSubGroups(allGroups, group.groupId).map(subGroup => {
    //     return <ConnectedDeviceGroup group={subGroup}
    //                                  key={subGroup.groupId}/>
    // });

    console.log(group);
    let subGroups = group.subGroups.map(subGroup => {
        return <ConnectedDeviceGroup group={subGroup}
                                          key={subGroup.groupId}/>
    })

    //let filteredDevices = getFilterDevices(devices);

    let filteredDevices = getFilterDevices(group.devices);

    if (subGroups.length === 0) {
        subGroups = null;
    }

    let data = null;

    if (!hidden) {
        data = <React.Fragment>
            {filteredDevices.length !== 0 ? <DeviceTable devices={filteredDevices}/> : null}
            {subGroups}
        </React.Fragment>
    }


    const toggleArrow = () => {
        let newHidden = !hidden;
        setHidden(newHidden);
    }

    return (
        <div className='group'>
            <div className='tab' onClick={toggleArrow}>
                <button className={hidden ? 'collapsed' : 'expanded'}/>
                <h2>{group.name}</h2>
            </div>
            {data}
        </div>
    )
}

const ConnectedDeviceGroup = connect(state => ({
    allDevices: state.devices.devices,
    allGroups: state.groups.groups,
}), {fetchDevicesForGroup})(DeviceGroup);

export default ConnectedDeviceGroup;
