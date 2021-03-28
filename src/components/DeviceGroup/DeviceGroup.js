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
            <div className='tab' onClick={toggleArrow}>
                <button className={hidden ? 'collapsed' : 'expanded'}/>
                <h2>{group.name}</h2>
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
        fetchDevicesForGroup,
        updateDevicesTableForGroup
    }
)(DeviceGroup);

export default ConnectedDeviceGroup;
