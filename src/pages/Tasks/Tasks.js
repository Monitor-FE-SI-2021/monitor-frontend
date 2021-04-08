import { connect } from "react-redux";
import UsersTable from '../../components/UsersTable/UsersTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import {  FormControl, MenuItem, Select , Popover  } from "@material-ui/core";
import request from "../../service";

// import './ReportList.scss';
// import { frequenciesFilter } from './constants';

const Tasks = ({push}) => {
    const [users, setUsers] = useState([{"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime2", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime3", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"}]);
    

    
    
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

    return (
        <div className="reportingWrapper page">
             <div  className="header">
                <h1> Users List</h1>
                
            </div>
            <div className="usersTable">
                <UsersTable users={ users} />     
            </div>
        </div>
    )
};
export default connect(state => ({}), {push})(Tasks);
