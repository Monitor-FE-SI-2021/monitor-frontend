import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchDevicesForGroup, updateDevicesTableForGroup } from "../../store/modules/devices/actions";
import { Spinner } from "../Spinner/Spinner";
import CustomPagination from "../CustomTable/components/CustomPagination";


const DeviceGroup = ({ group, deviceTable, fetchDevicesForGroup, updateDevicesTableForGroup }) => {

    const [hidden, setHidden] = useState(true);

    const devices = deviceTable?.devices ?? [];

    useEffect(() => {

        const hasNoSubGroups = group.subGroups.length === 0;

        if (!hidden && hasNoSubGroups) {
            fetchDevicesForGroup({
                groupId: group.groupId,
                page: deviceTable.page,
                perPage: deviceTable.perPage,
                status: deviceTable.status
            });
        }

    }, [hidden, group, deviceTable.page, deviceTable.perPage, deviceTable.status]);

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
                    {!subGroupsRendered?.length && <DeviceTable devices={devices} group={group}/>}
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
    }
    ,
    {
        fetchDevicesForGroup,
        updateDevicesTableForGroup
    }
)(DeviceGroup);

export default ConnectedDeviceGroup;
