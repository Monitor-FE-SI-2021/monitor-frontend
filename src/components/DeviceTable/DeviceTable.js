import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import { CastConnected } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import dayjs from 'dayjs';
import { connect } from "react-redux";
import { selectDevice } from "../../store/modules/devices/actions";
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

import './device_table.scss'

const DeviceTable = ({ devices, selectDevice, push }) => {
    const [tableData, setTableData] = useState(devices);

    const editDevice = (device) => {
        selectDevice(device);
        push(RouteLink.ManageDevice);
    }

    const connectDevice = (tableRow) => {
        console.log(tableRow)
    }

    const [tableFields, setTableFields] = useState([
        {
            name: 'name',
            title: 'Naziv',
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


    return (
        <CustomTable data={tableData} fields={tableFields}>
            <TableSlot slot='actions' render={dataRow => (
                <div className='actions'>
                    <CastConnected onClick={() => connectDevice(dataRow)}/>
                    <Edit className='edit-btn' onClick={() => editDevice(dataRow)}/>
                </div>
            )}/>

            <TableSlot slot='lastTimeOnline' render={dataRow => (
                <span>
                    {dayjs(dataRow.lastTimeOnline).format('DD.MM.YYYY HH:mm:ss')}
                </span>
            )}/>

            <TableSlot slot='status' render={dataRow => (
                <span>{dataRow.status === true ? 'Online' : 'Offline'}</span>
            )}/>
        </CustomTable>
    )
}

export default connect(null, { selectDevice, push })(DeviceTable);
