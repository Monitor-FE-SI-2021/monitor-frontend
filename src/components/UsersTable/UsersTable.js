import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import React from 'react';
import { CalendarToday } from "@material-ui/icons";
import dayjs from 'dayjs';
import './UsersTable.scss';


const UsersTable = ({ users }) => {
    const [tableData, setTableData] = useState(users);

    const downloadTableRow = (tableRow) => {
        console.log(tableRow);
    }

    const viewCalendar = (user) => {

        let newHidden = !hidden;
        setHidden(newHidden);
    }

    const [hidden, setHidden] = useState(true);

    const [tableFields, setTableFields] = useState([
        {
            name: 'name',
            title: 'Name',
        },
        {
            name: 'lastname',
            title: 'Lastname',
        },
        {
            name: 'email',
            title: 'Email',
        },
        {
            name: 'phone',
            title: 'Phone number',
        },
        {
            title: 'Calendar',
            slot: 'actions',
        }
    ])

    return (
        <div>
            <div className="tableWrap">
               <CustomTable data={tableData} fields={tableFields}>

                   <TableSlot slot='actions' render={dataRow => (
                      <div>
                        < CalendarToday className='calendar-btn' onClick={() => viewCalendar(dataRow)}/>
                      </div>
                    )}/>

                </CustomTable>
            </div>

            <br></br>

            <div>
            {/* KOMPONENTA */}
               {!hidden && (
                  <React.Fragment>
                      {<UsersTable users={users}/>}    
                  </React.Fragment>
               )}
            </div>
        </div>
    )
}

export default UsersTable;