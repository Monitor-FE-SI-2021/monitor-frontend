import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchDevicesForGroup, updateDevicesTableForGroup } from "../../store/modules/devices/actions";
import { Spinner } from "../Spinner/Spinner";
import { push } from "connected-react-router";
import { selectGroup } from "../../store/modules/groups/actions";
import CustomPagination from "../CustomTable/components/CustomPagination";
import {RouteLink} from "../../store/modules/menu/menu";


const DeviceGroup = ({ group, deviceTable, selectGroup, push, fetchDevicesForGroup, updateDevicesTableForGroup }) => {

    const createDevice = (group) => {
        selectGroup(group);
        push(RouteLink.ManageDevice);
    }

    const createMachine = (group) => {
        selectGroup(group);
        push(RouteLink.ManageGroup);
    }

    const [hidden, setHidden] = useState(true);

    const devices = deviceTable?.devices ?? [];

    const async = deviceTable?.async;

    useEffect(() => {

        const hasNoSubGroups = group.subGroups.length === 0;

        if (!hidden && hasNoSubGroups) {
            fetchDevicesForGroup({ groupId: group.groupId, page: deviceTable.page, perPage: deviceTable.perPage });
        }

    }, [hidden, group, deviceTable.page, deviceTable.perPage]);

    let subGroupsRendered = group.subGroups.map(subGroup => {
        return <ConnectedDeviceGroup group={subGroup}
                                     key={subGroup.groupId}/>
    })

    const toggleArrow = () => {
        let newHidden = !hidden;
        setHidden(newHidden);
    }

    const handleChangePage = (page) => {
        updateDevicesTableForGroup({ groupId: group.groupId, data: { page } })
    }

    const handleChangePerPage = (perPage) => {
        updateDevicesTableForGroup({ groupId: group.groupId, data: { perPage } })
    }

    return (
        <div className='group'>
            <div className='tab'>
                <div className='title' onClick={toggleArrow}>
                    <button className={hidden ? 'collapsed' : 'expanded'}/>
                    <h2>{group.name}</h2>
                </div>
                <div className='buttons'>
                    {group.subGroups.length === 0 ?
                        <button onClick={() => createDevice(group) }>+ Mašina</button>
                        : null}
                    <button onClick={() => createMachine(group)}>+ Grupa</button>
                </div>
            </div>
            {!hidden && (
                <React.Fragment>
                    {async ? <Spinner/> : devices.length !== 0 ? (
                        <React.Fragment>
                            <DeviceTable devices={devices}/>
                            <CustomPagination totalCount={deviceTable.totalCount}
                                              page={deviceTable.page}
                                              perPage={deviceTable.perPage}
                                              handleChangePage={handleChangePage}
                                              handleChangePerPage={handleChangePerPage}
                            />
                        </React.Fragment>
                    ) : null
                    }
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
        push,
        fetchDevicesForGroup,
        selectGroup,
        updateDevicesTableForGroup
    }
)(DeviceGroup);

export default ConnectedDeviceGroup;
