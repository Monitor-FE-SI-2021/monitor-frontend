import {RouteLink} from "../../store/modules/menu/menu";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { push } from "connected-react-router";
import "../Devices/Devices.scss"
import AdminUsersTable from "../../components/AdminUsersTable/AdminUsersTable";
import {fetchAllUsers} from '../../store/modules/users/actions';

const AdminPanel = ({ push, 
                      fetchAllUsers,
                      users}) => {

    useEffect(()=> {
        fetchAllUsers();
    },[fetchAllUsers])

    return (
        <div className="page devices">
            <div className="top">
                <span className='page-title'> Admin Panel </span>
                <div>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageUser)}>Kreiraj korisnika</button>
                </div>
            </div>
            <div>
                <h3>Tabela svih korisnika</h3>
                <AdminUsersTable users={users}></AdminUsersTable>
            </div>
        </div>
    )
}

export default connect((state) =>({
    users: state.users.users
}), { 
    push, 
    fetchAllUsers 
})(AdminPanel)