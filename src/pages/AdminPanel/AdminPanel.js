import { RouteLink } from "../../store/modules/menu/menu";
import { connect } from "react-redux";
import React from "react";
import { push } from "connected-react-router";
import './admin_panel.scss';
import AdminUsersTable from "../../components/AdminUsersTable/AdminUsersTable";

const AdminPanel = ({ push }) => {

    return (
        <div className="page admin-panel">
            <div className="top">
                <span className='page-title'>Korisnici</span>
                <div>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageUser)}>Kreiraj korisnika</button>
                </div>
            </div>
            <AdminUsersTable/>
        </div>
    )
}

export default connect((state) => ({
    users: state.users.users
}), {
    push,
})(AdminPanel)
