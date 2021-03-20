import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import { Delete } from "@material-ui/icons";

const DeviceTable = ({devices}) => {
    const [tableData, setTableData] = useState(devices);

    const deleteTableRow = (tableRow) => {
        console.log(tableRow);
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
        },
        {
            name: 'lastTimeOnline',
            title: 'Posljednji put online',
            width: '20%',
        },
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

            </CustomTable>  
    )
}

export default DeviceTable;