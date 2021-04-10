import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState } from "react";
import React from 'react';
import { CalendarToday } from "@material-ui/icons";
import dayjs from 'dayjs';
import './UsersTable.scss';
import MyScheduler from '../../pages/Tasks/components/MyScheduler';


const UsersTable = ({ users, tasks } ) => {
    const [tableData, setTableData] = useState(users);
    const [selectedUser, setSelectedUser] = useState({"name" : "prvi", "lastname" : "prvi", "email" : "mail", "phone" : "telefon"})
    const downloadTableRow = (tableRow) => {
        console.log(tableRow);
    }

    const viewCalendar = (user) => {

        let newHidden = !hidden;
        setHidden(newHidden);
        setSelectedUser(user);
        console.log("U tabeli je user" + user.name);
    }

    const [hidden, setHidden] = useState(true);

    return (
        <div className="grid-container">
            <div className="tableWrap">

              <table>
                <tr>
                   <th id="table-header">Name</th>
                   <th id="table-header">Lastname</th>
                   <th id="table-header">Calendar</th>
                </tr>
                {users.map(user => 
                  <tr>
                    <th>{user.name}</th>
                    <th>{user.lastname}</th>
                    <th>
                       < CalendarToday className='calendar-btn' onClick={() => viewCalendar(user)}/>
                    </th>
                </tr>)}
               </table>
                
            </div>
           
            <div className="scheduler">
                  {!hidden && (
                    <React.Fragment>
                       {<MyScheduler tasks={ tasks }/>}    
                    </React.Fragment>
                  )}
            </div>

            <div className="map">
                   
            </div>
            
        </div>
    )
}

export default UsersTable;