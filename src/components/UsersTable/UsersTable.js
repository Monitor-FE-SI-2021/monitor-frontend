import CustomTable, { TableSlot } from '../CustomTable/CustomTable';
import { useState, useEffect } from "react";
import React from 'react';
import { CalendarToday } from "@material-ui/icons";
import dayjs from 'dayjs';
import './UsersTable.scss';
import UserScheduler from '../../pages/Tasks/components/UserScheduler';
import request, { userTasks } from "../../service";

const UsersTable = ({ users } ) => {
    const [tableData, setTableData] = useState(users);
    const [selectedUser, setSelectedUser] = useState({"name" : "prvi", "lastname" : "prvi", "email" : "mail", "phone" : "telefon", userId: 1})
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        request(userTasks + "/" + selectedUser.userId).then(r => {
            console.log(r);    
        console.log(selectedUser.userId);
            setTasks(r.data.data)});
        
    }, [selectedUser])

    const downloadTableRow = (tableRow) => {
        console.log(tableRow);
    }

    const viewCalendar = (user) => {

        let newHidden = !hidden;
        setHidden(newHidden);
        setSelectedUser(user);
        console.log(selectedUser);
    }

    const [hidden, setHidden] = useState(true);

    return (
        <div className="users-table grid-container">
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
                       {<UserScheduler tasks={ tasks }/>}    
                    </React.Fragment>
                  )}
            </div>

            <div className="map">
                   
            </div>
            
        </div>
    )
}

export default UsersTable;