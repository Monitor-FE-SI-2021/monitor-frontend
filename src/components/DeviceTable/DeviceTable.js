import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import { Delete } from "@material-ui/icons";
import dayjs from 'dayjs';
import orderBy from "lodash/orderBy";


const invertDirection = {
    asc: "desc",
    desc: "asc"
  };


const DeviceTable = ({ devices }) => {
    const [tableData, setTableData] = useState(devices);
    const [columnToSort, setColumnToSort] = useState("");
    const [sortDirection, setSortDirection] = useState("desc");

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
            slot: 'status'
        },
        {
            name: 'lastTimeOnline',
            title: 'Posljednji put online',
            width: '30%',
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

    const handleSort = columnName => {
        this.setState(state => ({
          columnToSort: columnName,
          sortDirection:
            state.columnToSort === columnName
              ? invertDirection[state.sortDirection]
              : "asc"
        }));
    };

    return (
        <CustomTable data={orderBy(tableData, this.state.columnToSort, this.state.sortDirection)} fields={tableFields}>
            handleSort={this.handleSort}
            <TableSlot slot='actions' render={dataRow => (
                <Delete onClick={() => deleteTableRow(dataRow)}/>
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

export default DeviceTable;