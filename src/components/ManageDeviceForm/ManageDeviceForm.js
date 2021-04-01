import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles, TextField, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { cloneDeep } from "lodash";
import { fetchAllGroups } from "../../store/modules/groups/actions";
import request, { devices } from "../../service";
import { showSwalToast } from "../../utils/utils";
import { RouteLink } from "../../store/modules/menu/menu";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root, .MuiButton-root': {
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(3),
        },
        '& .MuiFormControl-root': {
            width: '50%',
        },
        '.MuiButton-root': {
            width: '25%',
        },
    },
}));

const initialValues = {
    name: "",
    location: "",
    latitude: "",
    longitude: "",
    installationCode: "",
    group: ""
}

// fieldValues is a prop for passing the field values for when the form is opened in edit mode
// the required form of the object is
// {name: "value", location: "value", latitude: "value", longitude: "value", installationCode: "value", group: "value"}
const ManageDeviceForm = ({ selectedDevice, groupOptions, fetchAllGroups, push }) => {

    const classes = useStyles();

    const [editMode, setEditMode] = useState(false);
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const transformDeviceToForm = (device) => {

        const form = cloneDeep(device);

        form.latitude = device.locationLatitude;
        form.longitude = device.locationLongitude;
        form.group = device.groupId;

        return form;
    }

    const transformFormToDevice = (form) => {
        return {
            Name: form.name ?? '',
            Location: form.location ?? '',
            LocationLongitude: form.longitude ?? '',
            LocationLatitude: form.latitude ?? '',
            InstallationCode: form.installationCode ?? '',
        }
    }

    useEffect(() => {

        if (!groupOptions?.length) {
            fetchAllGroups();
        }

        if (selectedDevice) {
            setValues(transformDeviceToForm(selectedDevice));
        }

        setEditMode(Boolean(selectedDevice));

    }, [selectedDevice])

    // initial values for when the form isn't opened in edit mode

    const validate = () => {
        let temp = {}
        let letterNumber = /^[0-9a-zA-Z]+$/

        if (values.name === "")
            temp.name = "This field is required"
        else if (!values.name.match(letterNumber) && !values.name.includes(" "))
            temp.name = "This field can only contain the following characters: A-Z, a-z, 0-9"
        else
            temp.name = ""

        if (values.location === "")
            temp.location = "This field is required"
        else if (!values.location.match(letterNumber) && !values.location.includes(" "))
            temp.location = "This field can only contain the following characters: A-Z, a-z, 0-9"
        else
            temp.location = ""

        temp.latitude = values.latitude.length > 0 ? "" : "This field is required"
        temp.longitude = values.longitude.length > 0 ? "" : "This field is required"
        temp.group = values.group ? "" : "This field is required!"
        temp.installationCode = values.installationCode ? "" : "This field is required!"
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

        const deviceData = transformFormToDevice(values);

        if (validate()) {

            if (editMode === true) {
                alert("Edited machine successfully!")
            } else {

                request(devices + `/CreateDevice?groupId=${values.group}`, 'POST', deviceData)
                    .then(r => {
                        console.log(r.data);
                        showSwalToast(`Uspješno kreirana mašina ${deviceData.Name}`, 'success');
                        setValues(initialValues);
                        push(RouteLink.Devices);
                    })

            }
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField label="Name" name="name" value={values.name} onChange={handleInputChange}
                       {...(errors.name && { error: true, helperText: errors.name })} />

            <TextField label="Location" name="location" value={values.location} onChange={handleInputChange}
                       {...(errors.location && { error: true, helperText: errors.location })} />

            <TextField label="Latitude" type='number' name="latitude" value={values.latitude}
                       onChange={handleInputChange}
                       {...(errors.latitude && { error: true, helperText: errors.latitude })}/>

            <TextField label="Longitude" type='number' name="longitude" value={values.longitude}
                       onChange={handleInputChange}
                       {...(errors.longitude && { error: true, helperText: errors.longitude })}/>

            <TextField label="Installation code" name="installationCode" value={values.installationCode}
                       onChange={handleInputChange}
                       {...(errors.installationCode && { error: true, helperText: errors.installationCode })}/>

            <TextField
                select
                name="group"
                value={values.group}
                label="Group"
                onChange={handleInputChange}
                {...(errors.group && { error: true, helperText: errors.group })}
            >
                {groupOptions.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                        {group.name}
                    </MenuItem>
                ))}
            </TextField>

            <Button type="submit" variant="contained">
                {editMode === true ? "Edit Machine" : "Create Machine"}
            </Button>
        </form>
    );
}

export default connect(state => {

    const groupsTree = state.groups.groups;

    const flatten = (data) => {

        return data.reduce((acc, group) => {
            acc.push(group);
            if (group?.subGroups?.length) {
                acc.push(...flatten(group.subGroups))
            }
            return acc;
        }, [])
    }

    const allGroups = groupsTree.subGroups ? flatten(groupsTree.subGroups) : [];

    const groupOptions = allGroups.filter(g => g.subGroups.length === 0).map(g => ({
        id: g.groupId,
        name: g.name
    }))

    return {
        selectedDevice: state.devices.selectedDevice,
        groupOptions
    }
}, { fetchAllGroups, push })(ManageDeviceForm);