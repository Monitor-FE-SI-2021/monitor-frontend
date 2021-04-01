import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import React, { useState } from "react";
import { CastConnected } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import dayjs from 'dayjs';
import { connect } from "react-redux";
import { selectDevice, updateDevicesTableForGroup } from "../../store/modules/devices/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

import './device_table.scss'
import request, { wsEndpoint } from "../../service";
import { showSwalToast } from "../../utils/utils";
import FilterList from "@material-ui/icons/FilterList";
import { Checkbox, FormControl, Input, ListItemText, MenuItem, Select } from "@material-ui/core";
import { DEVICE_STATUS } from "../../store/modules/devices/devices";
import { Spinner } from "../Spinner/Spinner";
import CustomPagination from "../CustomTable/components/CustomPagination";

const DeviceTable = ({
                         devices,
                         selectDevice,
                         push,
                         user,
                         activeDevices,
                         deviceTable,
                         group,
                         updateDevicesTableForGroup
                     }) => {

    const [statusFilterOpened, setStatusFilterOpened] = React.useState(false);

    const async = deviceTable?.async;

    const editDevice = (device) => {
        selectDevice(device);
        push(RouteLink.ManageDevice);
    }

    const connectDevice = (device) => {
        const ipAddr = activeDevices.find(d => (d.name === device.name && d.location === device.location))?.ip;

        if (ipAddr) {
            request(wsEndpoint + "/agent/connect", "POST", {
                name: device.name,
                location: device.location,
                user: user,
                ip: ipAddr,
            }).then(r => {
                if (r?.data?.type === "Connected") {
                    showSwalToast("Uređaj je uspješno konektovan.", 'success')
                    push(RouteLink.Dashboard)
                }
            })
        } else {
            showSwalToast("Uređaj nije online.");
        }
    }

    const canConnectToDevice = device => {

        const activeDevice = activeDevices.find(d => (d.name === device.name && d.location === device.location));

        return activeDevice && (activeDevice.status === 'Disconnected' || activeDevice.status === 'Online');
    }

    const [tableFields] = useState([
        {
            name: 'name',
            title: 'Naziv',
            sort: true,
        },
        {
            name: 'location',
            title: 'Lokacija',
        },
        {
            name: 'status',
            title: 'Status',
            slot: 'status'
        },
        {
            name: 'lastTimeOnline',
            title: 'Posljednji put online',
            width: '30%',
            sort: true,
            slot: 'lastTimeOnline'
        },
        {
            name: 'actions',
            title: 'Akcije',
            width: '20%',
            align: 'right',
            slot: 'actions'
        }]
    )

    const handleFiltersChange = (name, value) => {

        updateDevicesTableForGroup({
            groupId: group.groupId,
            data: {
                [name]: value
            }
        })
    }

    const handleChangePage = (page) => {
        updateDevicesTableForGroup({ groupId: group.groupId, data: { page } })
    }

    const handleChangePerPage = (perPage) => {
        updateDevicesTableForGroup({ groupId: group.groupId, data: { perPage } })
    }

    return (
        <div className='device-table'>
            <FilterList className='filter-btn' onClick={() => setStatusFilterOpened(true)}/>
            {statusFilterOpened ?
                <FormControl style={{ float: 'right' }}>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={statusFilterOpened}
                        onClose={() => setStatusFilterOpened(false)}
                        onOpen={() => setStatusFilterOpened(true)}
                        value={deviceTable.status}
                        input={<Input/>}>
                        <MenuItem value="" disabled>
                            <em>Status</em>
                        </MenuItem>
                        <MenuItem>
                            <Checkbox checked={deviceTable.status === DEVICE_STATUS.ACTIVE}
                                      onChange={(e, val) =>
                                          handleFiltersChange('status', val === true ? DEVICE_STATUS.ACTIVE : DEVICE_STATUS.INACTIVE)
                                      }/>
                            <ListItemText primary="Active"/>
                        </MenuItem>
                    </Select>
                </FormControl>
                : null}
            {async ? <Spinner/> : devices.length !== 0 ? (
                <React.Fragment>
                    <CustomTable data={devices} fields={tableFields}>
                        <TableSlot slot='actions' render={dataRow => (
                            <div className='actions'>
                                {canConnectToDevice(dataRow) && (
                                    <CastConnected onClick={() => connectDevice(dataRow)}/>
                                )}
                                <Edit className='edit-btn' onClick={() => editDevice(dataRow)}/>
                            </div>
                        )}/>

                        <TableSlot slot='lastTimeOnline' render={dataRow => (
                            <span>
                                {dayjs(dataRow.lastTimeOnline).format('DD.MM.YYYY HH:mm:ss')}
                            </span>
                        )}/>

                        <TableSlot slot='status' render={dataRow => (
                            <span>{canConnectToDevice(dataRow) ? 'Offline' : 'Online'}</span>
                        )}/>
                    </CustomTable>

                    <CustomPagination totalCount={deviceTable.totalCount}
                                      page={deviceTable.page}
                                      perPage={deviceTable.perPage}
                                      handleChangePage={handleChangePage}
                                      handleChangePerPage={handleChangePerPage}
                    />
                </React.Fragment>

            ) : <div className='no-results-message'>
                Nema rezultata.
            </div>}
        </div>
    )
}

export default connect((state, ownProps) => {

        const { group } = ownProps;
        const groupId = group?.groupId || null;

        const deviceTable = state.devices.deviceTables?.[groupId] || {};

        return {
            activeDevices: state.devices.activeDevices,
            user: state.login.user,
            deviceTable
        }
    }
    ,
    {
        selectDevice, push, updateDevicesTableForGroup
    }
)(DeviceTable);
