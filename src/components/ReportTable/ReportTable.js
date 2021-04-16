import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import dayjs from 'dayjs';

const ReportTable = ({ report }) => {

    const downloadTableRow = (tableRow) => {
        window.open(tableRow.uriLink);
    }

    const tableFields = [
        {
            name: 'name',
            title: 'Report name',
        },
        {
            name: 'date',
            title: 'Date',
            slot: 'date',
        },
        {
            name: 'frequency',
            title: 'Frequency',
            slot: 'frequency',
        },
        {
            name: 'uriLink',
            title: 'Download',
            width: '20%',
            align: 'left',
            slot: 'uriLink',
        }
    ];

    return (
        <CustomTable data={report.reportInstances} fields={tableFields}>

            <TableSlot slot='date' render={(dataRow) => (
                <div>
                    {dayjs(dataRow.date).format('DD.MM.YYYY.')}
                </div>
            )}/>

            <TableSlot slot='uriLink' render={dataRow => (
                <div>
                    <GetAppIcon onClick={() => downloadTableRow(dataRow)}/>
                </div>
            )}/>

            <TableSlot slot='frequency' render={dataRow => (
                <div>{report.frequency}</div>
            )}/>

        </CustomTable>
    )
}

export default ReportTable;