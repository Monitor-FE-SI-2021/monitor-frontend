import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchDevicesForGroup, updateDevicesTableForGroup } from "../../store/modules/devices/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

const DeviceGroup = ({
                         push,
                         group,
                         deviceTable,
                         fetchDevicesForGroup,
                         updateDevicesTableForGroup,
                         devicesSearchText,
                         shouldRenderSubgroups = true
                     }) => {

    const createDevice = (group) => {
        push({
            pathname: RouteLink.ManageDevice,
            state: { group }
        });
    }

    const createGroup = (group) => {
        push({
            pathname: RouteLink.ManageGroup,
            state: { group }
        });
    }

    const [hidden, setHidden] = useState(true);

    const devices = deviceTable?.devices ?? [];

    useEffect(() => {

        const hasNoSubGroups = group.subGroups.length === 0;

        if (!hidden && hasNoSubGroups) {
            fetchDevicesForGroup({
                groupId: group.groupId,
                page: deviceTable.page,
                perPage: deviceTable.perPage,
                status: deviceTable.status,
                sortField: deviceTable.sortField,
                sortOrder: deviceTable.sortOrder
            });
        }

    }, [hidden, group, deviceTable.page, deviceTable.perPage, deviceTable.status, deviceTable.sortField, deviceTable.sortOrder, devicesSearchText]);

    let subGroupsRendered = group.subGroups.map(subGroup => {
        return <ConnectedDeviceGroup group={subGroup}
                                     key={subGroup.groupId}/>
    })

    const toggleArrow = () => {
        let newHidden = !hidden;
        setHidden(newHidden);
    }


    return (
        <div className='device-group'>
            <div className='tab'>
                <div className='title' onClick={toggleArrow}>
                    <button className={hidden ? 'collapsed' : 'expanded'}/>
                    <span className='group-name'>{group.name}</span>
                </div>
                <div className='buttons'>
                    {group.subGroups.length === 0 ?
                        <button className={'custom-btn outlined'}
                                onClick={() => createDevice(group)}>
                            + Mašina
                        </button>
                        : null}
                    <button className={'custom-btn outlined'} onClick={() => createGroup(group)}>
                        + Grupa
                    </button>
                </div>
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
            devicesSearchText: state.devices.searchText
        }
    }
    ,
    {
        push,
        fetchDevicesForGroup,
        updateDevicesTableForGroup
    }
)(DeviceGroup);

export default ConnectedDeviceGroup;
