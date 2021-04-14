import {RouteLink} from "../../store/modules/menu/menu";
import { connect } from "react-redux";
import React from "react";
import { push } from "connected-react-router";
import "./AdminPanel.scss"

const AdminPanel = ({ push }) => {
    return (
        <div className="page admin-panel">
            <div className="top">
                <span className='page-title'> Admin Panel </span>
                <div>
                    <button className="custom-btn" onClick={() => push(RouteLink.ManageDevice)}>Kreiraj korisnika</button>
                </div>
            </div>
            <div>
                <h3>Tabela svih korisnika ?</h3>
            </div>
        </div>
    )
}

export default connect(() => {}, { push })(AdminPanel)