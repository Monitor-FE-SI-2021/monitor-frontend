import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { TextField, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { fetchAllGroups } from "../../store/modules/groups/actions";
import request, { groups } from "../../service";
import { showSwalToast } from "../../utils/utils";
import { RouteLink } from "../../store/modules/menu/menu";
import { push } from "connected-react-router";
import "./ManageGroupForm.scss"


// fieldValues is a prop for passing the field values for when the form is opened in edit mode
// the required form of the object is
// {name: "value", location: "value", latitude: "value", longitude: "value", installationCode: "value", group: "value"}
const ManageGroupForm = ({ parentGroup, push, groupOptions, fetchAllGroups }) => {

    const initialValues = {
        name: "",
        parentGroup: parentGroup?.groupId ?? ''
    }

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})


    const transformFormToGroup = (form) => {
        return {
            Name: form.name ?? '',
            ParentGroup: form.parentGroup ?? ''
        }
    }

    useEffect(() => {

        if (!groupOptions?.length) {
            fetchAllGroups();
        }

    }, [fetchAllGroups, groupOptions?.length])

    const validate = () => {
        let temp = {}

        if (values.name === "")
            temp.name = "This field is required"
        else
            temp.name = ""

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

        const groupData = transformFormToGroup(values);

        //Šta ako postoji već grupa sa istim imenom?

        if (validate()) {
            request(groups + `/CreateGroup`, 'POST', groupData)
                .then(r => {
                    console.log(r.data);
                    showSwalToast(`Uspješno kreirana grupa ${groupData.Name}`, 'success');
                    setValues(initialValues);
                    push(RouteLink.Devices);
                })
        }
    }

    return (
        <form className="manage-device-form" onSubmit={handleSubmit}>
            <TextField variant="outlined" label="Naziv" name="name" value={values.name} onChange={handleInputChange}
                       {...(errors.name && { error: true, helperText: errors.name })} />

            <TextField
                variant="outlined"
                select
                name="parentGroup"
                value={values.parentGroup}
                label="Nadgrupa"
                onChange={handleInputChange}
                className="group-selector"
                {...(errors.group && { error: true, helperText: errors.group })}
            >
                {groupOptions.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                        {group.name}
                    </MenuItem>
                ))}
            </TextField>

            <Button type="cancel" variant="contained" onClick={() => push(RouteLink.Devices)}>Otkaži</Button>
            <Button type="submit" variant="contained">Kreiraj grupu</Button>
        </form>
    );
}

export default connect(state => {

    const groupsTree = state.groups.groups;

    const flatten = data => {

        return data.reduce((acc, group) => {
            acc.push(group);
            if (group?.subGroups?.length) {
                acc.push(...flatten(group.subGroups))
            }
            return acc;
        }, [])
    }

    const allGroups = groupsTree.subGroups ? flatten(groupsTree.subGroups) : [];

    const groupOptions = allGroups.map(g => ({
        id: g.groupId,
        name: g.name
    }))

    return {
        groupOptions
    }
}, { fetchAllGroups, push })(ManageGroupForm);
