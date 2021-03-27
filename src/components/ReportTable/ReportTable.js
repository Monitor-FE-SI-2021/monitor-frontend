import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import { Delete } from "@material-ui/icons";
import dayjs from 'dayjs';

const ReportTable = ({ reports }) => {
    const [tableData, setTableData] = useState(reports);

    const deleteTableRow = (tableRow) => {
        console.log(tableRow);
    }

    const [tableFields, setTableFields] = useState([
        {
            name: 'name',
            title: 'Report name',
        },
        {
            name: 'date',
            title: 'Date',
        },
        // {
        //     name: 'status',
        //     title: 'Status',
        //     slot: 'status'
        // },
        // {
        //     name: 'lastTimeOnline',
        //     title: 'Posljednji put online',
        //     width: '30%',
        //     slot: 'lastTimeOnline'
        // },
        {
            name: 'actions',
            title: 'Akcije',
            width: '20%',
            align: 'right',
            slot: 'actions'
        }
    ])

    return (
        <CustomTable data={tableData} fields={tableFields}>

            <TableSlot slot='actions' render={dataRow => (
                <Delete onClick={() => deleteTableRow(dataRow)}/>
            )}/>

            <TableSlot slot='date' render={dataRow => (
                <span>
                    {dayjs(dataRow.date).format('DD.MM.YYYY HH:mm:ss')}
                </span>
            )}/>

            {/* <TableSlot slot='status' render={dataRow => (
                <span>{dataRow.status === true ? 'Online' : 'Offline'}</span>
            )}/> */}

        </CustomTable>
    )
}

export default ReportTable;