import {RouteLink} from "../../store/modules/menu/menu";
import { connect } from "react-redux";
import React from "react";
import { push } from "connected-react-router";
import "../Devices/Devices.scss"
import AdminUsersTable from "../../components/AdminUsersTable/AdminUsersTable";

const AdminPanel = ({ push }) => {
    return (
        <div className="page devices">
            <div className="top">
                <span className='page-title'> Admin Panel </span>
                <div>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageUser)}>Kreiraj korisnika</button>
                </div>
            </div>
            <div>
                <AdminUsersTable />
            </div>
        </div>
    )
}

export default connect(null, { push })(AdminPanel)
