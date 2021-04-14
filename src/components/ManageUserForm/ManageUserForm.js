import React from "react";
import { connect } from "react-redux";
import { TextField, MenuItem } from '@material-ui/core';
import { showSwalToast } from "../../utils/utils";
import { RouteLink } from "../../store/modules/menu/menu";
import { push } from "connected-react-router";
import {AsyncButton} from "../AsyncButton/AsyncButton";
import "../ManageDeviceForm/ManageDeviceForm.scss"

const MangeUserForm = ({ push }) => {
    return (
        <form className="manage-device-form">
            <TextField variant="outlined" label="Ime" name="name" />

            <TextField variant="outlined" label="Prezime" name="lastname" />

            <TextField variant="outlined" label="Email" name="email" />

            <TextField variant="outlined" label="Broj telefona" name="phone" />

            <TextField variant="outlined" label="Šifra" type="password" name="password" />

            <TextField variant="outlined" label="Ponovite šifru" type="password" name="passwordRepeat" />

            <TextField
                variant="outlined"
                select
                name="roleId"
                label="Uloga"
                className="group-selector"
            />

            <div className='buttons'>
                <button className="custom-btn outlined" onClick={() => push(RouteLink.AdminPanel)}>Otkaži</button>
                <AsyncButton className="custom-btn" >
                    Kreiraj korisnika
                </AsyncButton>
            </div>
        </form>
    );
}

export default connect(() => {}, { push })(MangeUserForm)