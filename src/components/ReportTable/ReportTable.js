import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import dayjs from 'dayjs';

const ReportTable = ({ reports }) => {
    const [tableData, setTableData] = useState(reports);

    const downloadTableRow = (tableRow) => {
        console.log(tableRow);
    }

    const [tableFields, setTableFields] = useState([
        {
            name: 'name',
            title: 'Report name',
        },
        {
            name: 'startDate',
            title: 'Date',
            slot: 'startDate',
        },
        // {
        //     name: 'frequency',
        //     title: 'Frequency',
        // },
        {
            name: 'actions',
            title: 'Download',
            width: '20%',
            align: 'left',
            slot: 'actions',
        }
    ])

    return (
        <CustomTable data={tableData} fields={tableFields}>

            <TableSlot slot='startDate' render={(dataRow) => (
                <div>
                    {dayjs(dataRow.startDate).format('DD.MM.YYYY.')}
                </div>
            )}/>

            <TableSlot slot='actions' render={dataRow => (
                <div>
                    <GetAppIcon onClick={() => downloadTableRow(dataRow)}/>
                </div>
            )}/>

        </CustomTable>
    )
}

export default ReportTable;