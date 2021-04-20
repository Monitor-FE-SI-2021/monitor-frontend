import { RouteLink } from "../../store/modules/menu/menu";
import { connect } from "react-redux";
import React from "react";
import { push } from "connected-react-router";
import './admin_panel.scss';
import AdminUsersTable from "../../components/AdminUsersTable/AdminUsersTable";
import { TextField } from "@material-ui/core";
import { searchUsers } from "../../store/modules/users/actions";

const AdminPanel = ({ push, searchUsers, searchText }) => {

    return (
        <div className="page admin-panel">
            <div className="top">
                <span className='page-title'>Korisnici</span>
                <div>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageUser)}>Kreiraj korisnika</button>
                </div>
            </div>
            <TextField className='search'
                       label="Pretraži korisnike"
                       size={'small'}
                       variant="outlined"
                       value={searchText}
                       onChange={e => searchUsers(e.target.value)}
            />
            <AdminUsersTable/>
        </div>
    )
}

export default connect((state) => ({
    users: state.users.users,
    searchText: state.users.searchText
}), {
    push,
    searchUsers
})(AdminPanel)
