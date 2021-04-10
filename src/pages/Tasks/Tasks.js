import { connect } from "react-redux";
import UsersTable from '../../components/UsersTable/UsersTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import {  FormControl, MenuItem, Select , Popover  } from "@material-ui/core";
import request, { userTasks } from "../../service";

// import './ReportList.scss';
// import { frequenciesFilter } from './constants';

const Tasks = ({push}) => {
    const [users, setUsers] = useState([{"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime2", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime3", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"}]);
    
    const [tasks, setTasks] = useState(
        {
        //   data: [
        //       {
        //           taskId: 33,
        //           userId: 7,
        //           deviceId: null,
        //           startTime: "2021-03-26T14:22:44.011+00:00",
        //           location: "Sarajevo - BBI",
        //           description: "test",
        //           endTime: "2021-03-26T16:22:44.011+00:00",
        //           statusId: 1,
        //           "device": null,
        //           "status": null,
        //           "user": null,
        //           "userTrackers": []
        //       },
        //       {
        //           "taskId": 105,
        //           "userId": 7,
        //           "deviceId": 19,
        //           "startTime": "2021-04-06T17:30:18.088+00:00",
        //           "location": null,
        //           "description": "SI konsultacije",
        //           "endTime": "2021-04-06T19:20:18.088+00:00",
        //           "statusId": 1,
        //           "device": {
        //               "deviceId": 19,
        //               "name": "Desktop PC 2",
        //               "location": "Sarajevo - SCC",
        //               "locationLongitude": 18.43,
        //               "locationLatitude": 43.5,
        //               "status": true,
        //               "lastTimeOnline": "2021-04-07T22:09:28.259808+00:00",
        //               "installationCode": null,
        //               "deviceUid": "d3143e54-d497-402f-82ef-b1b213c1d172",
        //               "deviceGroups": [],
        //               "errorLogs": [],
        //               "userCommandsLogs": [],
        //               "userTasks": []
        //           },
        //           "status": null,
        //           "user": null,
        //           "userTrackers": []
        //       },
        //       {
        //           taskId: 84,
        //           userId: 7,
        //           deviceId: null,
        //           startTime: "2021-04-15T08:05:40.487+00:00",
        //           location: "Sarajevo",
        //           description: "Test3",
        //           endTime: "2021-04-15T09:10:40.487+00:00",
        //           statusId: 4,
        //           "device": null,
        //           "status": null,
        //           "user": null,
        //           "userTrackers": []
        //       }
        //   ],
        //   "newAccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvc29iYTVAZW1haWwuY29tIiwicm9sZUlkIjoxLCJncm91cElkIjoxLCJpYXQiOjE2MTc4OTY0MzgsImV4cCI6MTYxNzg5ODIzOH0.AoUg2NTx_yFQy5BG5sRJF-G1bjlqNIgSqQImSjJx4Tg"
      }
      )
    
    
   /* const setData = async () => {
        

      
            setUsers([]);
            const res = await request("https://si-2021.167.99.244.168.nip.io/api/user/All");
            for (let re of res.data) //data.data 
                users.push(re);

            setUsers(users);
            
        
       
    };
   
    useEffect(() => {
        setData();
    }, []);*/

    useEffect(() => {
        request(userTasks).then(r => setTasks(r.data.data[4].userTasks));
        
    }, [])

    return (
        <div className="reportingWrapper page">
             <div  className="header">
                <h1> Users List</h1>
                
            </div>
            <div className="usersTable">
                <UsersTable users={ users } tasks={ tasks }/>     
            </div>
        </div>
    )
};
export default connect(state => ({}), {push})(Tasks);
