import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchDevicesForGroup } from "../../store/modules/devices/actions";
import { Spinner } from "../Spinner/Spinner";


const DeviceGroup = ({ group, fetchDevicesForGroup, deviceTable }) => {

    const [hidden, setHidden] = useState(true);

    const devices = deviceTable?.devices ?? [];
    const async = deviceTable?.async;

    useEffect(() => {

        const hasNoSubGroups = group.subGroups.length === 0;

        if (!hidden && hasNoSubGroups) {
            fetchDevicesForGroup(group.groupId);
        }

    }, [hidden, group]);

    let subGroupsRendered = group.subGroups.map(subGroup => {
        return <ConnectedDeviceGroup group={subGroup}
                                     key={subGroup.groupId}/>
    })

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
            {!hidden && (
                <React.Fragment>
                    {async ? <Spinner/> : devices.length !== 0 ? <DeviceTable devices={devices}/> : null}
                    {subGroupsRendered || null}
                </React.Fragment>
            )}
        </div>
    )
}

const ConnectedDeviceGroup = connect((state, ownProps) => {

    const { group } = ownProps;
    const groupId = group?.groupId || null;

    const deviceTable = state.devices.deviceTables?.[groupId] || {};

    return {
        deviceTable,
    }
}, { fetchDevicesForGroup })(DeviceGroup);

export default ConnectedDeviceGroup;
