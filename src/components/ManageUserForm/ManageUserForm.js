import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { TextField, MenuItem } from '@material-ui/core';
import { showSwalToast } from "../../utils/utils";
import { RouteLink } from "../../store/modules/menu/menu";
import { push } from "connected-react-router";
import {AsyncButton} from "../AsyncButton/AsyncButton";
import "../ManageDeviceForm/ManageDeviceForm.scss"
import validator from "validator/es";
import request, { roles } from "../../service";

const MangeUserForm = ({ push }) => {

    const [allRoles, setAllRoles] = useState([])

    const fetchRoles = () => {
        request(roles + `/GetRoles`, 'GET')
            .then(response => response.data)
            .then(r => {
                console.log(r.data)
                setAllRoles(r.data)
            })
    }

    useEffect( () => {
        fetchRoles()
    }, [])

    const initialValues = {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        passwordRepeat: "",
        roleId: ""
    }

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const validate = () => {
        let temp = {}
        let letterNumber = /^[0-9a-zA-Z]+$/
        const emptyFieldError = "Polje je obavezno"

        if (values.name === "")
            temp.name = emptyFieldError
        else if (!values.name.match(letterNumber) && !values.name.includes(" "))
            temp.name = "Polje smije sadržavati samo karaktere: A-Z, a-z, 0-9"
        else
            temp.name = ""

        if (values.lastname === "")
            temp.lastname = emptyFieldError
        else if (!values.lastname.match(letterNumber) && !values.lastname.includes(" "))
            temp.lastname = "Polje smije sadržavati samo karaktere: A-Z, a-z, 0-9"
        else
            temp.lastname = ""

        if (values.email === "")
            temp.email = emptyFieldError
        else if (!validator.isEmail(values.email))
            temp.email = "Pogrešan email"
        else
            temp.email = ""

        if (values.phone === "")
            temp.phone = emptyFieldError
        else if (!values.phone.match(/^[0-9]{6}/) && !values.phone.includes(" "))
            temp.phone = "Polje mora sadržavati najmanje 6 cifri"
        else
            temp.phone = ""

        temp.password = values.password ? "" : emptyFieldError
        temp.passwordRepeat = values.passwordRepeat ? "" : emptyFieldError
        if (!values.passwordRepeat.match(values.password)) {
            temp.passwordRepeat= "Polje nije saglasno sa poljem Šifra"
        }
        temp.roleId = values.roleId ? "" : emptyFieldError

        setErrors(temp)

        return Object.values(temp).every(x => x === "")
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            showSwalToast("Uspješno kreiran korisnik")
        }
    }

        return (
        <form className="manage-device-form" onSubmit={handleSubmit} >
            <TextField variant="outlined" label="Ime" name="name" value={values.name} onChange={handleInputChange}
                       {...(errors.name && { error: true, helperText: errors.name })} />

            <TextField variant="outlined" label="Prezime" name="lastname" value={values.lastname} onChange={handleInputChange}
                       {...(errors.lastname && { error: true, helperText: errors.lastname })} />

            <TextField variant="outlined" label="Email" name="email" value={values.email} onChange={handleInputChange}
                       {...(errors.email && { error: true, helperText: errors.email })} />

            <TextField variant="outlined" label="Broj telefona" name="phone" value={values.phone} onChange={handleInputChange}
                       {...(errors.phone && { error: true, helperText: errors.phone })} />

            <TextField variant="outlined" label="Šifra" type="password" name="password" value={values.password} onChange={handleInputChange}
                       {...(errors.password && { error: true, helperText: errors.password })} />

            <TextField variant="outlined" label="Ponovite šifru" type="password" name="passwordRepeat" value={values.passwordRepeat} onChange={handleInputChange}
                       {...(errors.passwordRepeat && { error: true, helperText: errors.passwordRepeat })} />

            <TextField
                variant="outlined"
                select
                name="roleId"
                label="Uloga"
                className="group-selector"
                value={values.roleId}
                onChange={handleInputChange}
            >
                {allRoles.map((role) => (
                    <MenuItem key={role.roleId} value={role.roleId}>
                        {role.name}
                    </MenuItem>
                ))}
            </TextField>

            <div className='buttons'>
                <button className="custom-btn outlined" onClick={() => push(RouteLink.AdminPanel)}>Otkaži</button>
                <AsyncButton className="custom-btn" onClick={handleSubmit}>
                    Kreiraj korisnika
                </AsyncButton>
            </div>
        </form>
    );
}

export default connect(null, { push })(MangeUserForm)