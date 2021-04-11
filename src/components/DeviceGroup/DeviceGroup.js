import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchDevicesForGroup, updateDevicesTableForGroup } from "../../store/modules/devices/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { debounce } from "lodash/function";
import { Edit } from "@material-ui/icons";
import { selectGroup } from "../../store/modules/groups/actions";

const DeviceGroup = ({
                         push,
                         group,
                         deviceTable,
                         fetchDevicesForGroup,
                         updateDevicesTableForGroup,
                         groupsSearchText,
                         devicesSearchText,
                         selectGroup,
                         shouldRenderSubgroups = true
                     }) => {

    const [hidden, setHidden] = useState(true);

    const devices = deviceTable?.devices ?? [];

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

    const fetchData = () => fetchDevicesForGroup({
        groupId: group.groupId,
        page: deviceTable.page,
        perPage: deviceTable.perPage,
        status: deviceTable.status,
        sortField: deviceTable.sortField,
        sortOrder: deviceTable.sortOrder
    });

    const fetchDataDebounced = useCallback(
        debounce(fetchData, 400),
        []
    );

    useEffect(() => {

        const hasNoSubGroups = group.subGroups.length === 0;

        if (!hidden && hasNoSubGroups) {
            fetchData();
        }

    }, [hidden, group, deviceTable.page, deviceTable.perPage, deviceTable.status, deviceTable.sortField, deviceTable.sortOrder]);


    // search useEffect so i can debounce it
    useEffect(() => {
        const hasNoSubGroups = group.subGroups.length === 0;

        if (!hidden && hasNoSubGroups) {
            fetchDataDebounced();
        }
    }, [devicesSearchText])


    let subGroupsRendered = group.subGroups.map(subGroup => {
        return <ConnectedDeviceGroup group={subGroup}
                                     key={subGroup.groupId}/>
    })

    const isListView = Boolean(groupsSearchText);       // If groups are being searched, list mode is on

    const shouldAllowOpen = !isListView || (isListView && group.subGroups?.length === 0);

    const toggleHidden = () => {

        if (!shouldAllowOpen) return;

        let newHidden = !hidden;
        setHidden(newHidden);
    }

    const editGroup = (group) => {
        selectGroup(group);
        push(RouteLink.ManageGroup);
    }

    return (
        <div className='device-group'>
            <div className='tab'>
                <div className='title' onClick={toggleHidden}>
                    {shouldAllowOpen && <button className={hidden ? 'collapsed' : 'expanded'}/>}
                    <div className='group-name-container'>
                        <span className='group-name'>{group.name}</span>
                        <Edit className='edit-group-btn' onClick={() => editGroup(group)}/>
                    </div>
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
                    {!subGroupsRendered?.length && <DeviceTable devices={devices} group={group} showGroup={false}/>}
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
            groupsSearchText: state.groups.searchText,
            devicesSearchText: state.devices.searchText
        }
    }
    ,
    {
        push,
        fetchDevicesForGroup,
        updateDevicesTableForGroup,
        selectGroup
    }
)(DeviceGroup);

export default ConnectedDeviceGroup;
