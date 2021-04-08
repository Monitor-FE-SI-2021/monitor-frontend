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
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"},
    {"name" : "ime", "lastname" : "prezime", "email" : "mail", "phone" : "telefon"}]);
    
    

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
