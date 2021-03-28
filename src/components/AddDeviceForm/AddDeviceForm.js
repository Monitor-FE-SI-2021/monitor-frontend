import React from 'react';
import { connect } from "react-redux";
import {makeStyles, TextField, MenuItem, Button, FormHelperText} from '@material-ui/core';
import {useState} from 'react';

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

const groups = [
    {
        id: 1,
        name: 'Grupa 1',
    },
    {
        id: 2,
        name: 'Grupa 2',
    },
    {
        id: 3,
        name: 'Grupa 3',
    },
]

// fieldValues is a prop for passing the field values for when the form is opened in edit mode
// the required form of the object is
// {name: "value", location: "value", latitude: "value", longitude: "value", installationCode: "value", group: "value"}
const AddDeviceForm = ({fieldValues}) => {
    const classes = useStyles();

    // initial values for when the form isn't opened in edit mode
    const initialValues = {
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        installationCode: "",
        group: ""
    }

    const validate = () => {
        let temp = {}
        let letterNumber = /^[0-9a-zA-Z]+$/

        if(values.name == "")
            temp.name = "This field is required"
        else if(!values.name.match(letterNumber) && !values.name.includes(" "))
            temp.name = "This field can only contain the following characters: A-Z, a-z, 0-9"
        else
            temp.name=""
        
        if(values.location =="")
            temp.location = "This field is required"
        else if(!values.location.match(letterNumber) && !values.location.includes(" "))
            temp.location = "This field can only contain the following characters: A-Z, a-z, 0-9"
        else
            temp.location = ""

        temp.latitude = values.latitude.length==6 ? "" : "Latitude should consist of exactly 6 numbers!"
        temp.longitude = values.longitude.length==6 ? "" : "Longitude should consist of exactly 6 numbers!"
        temp.group = values.group ? "" : "This field is required!"
        temp.installationCode = values.installationCode ? "" : "This field is required!"
        setErrors(temp)

        return Object.values(temp).every(x => x=="")
    }

    // if the form is opened in edit mode we shall obtain the passed values
    const getInitialValues = () => {
        if (fieldValues !== undefined)
            return fieldValues
        return initialValues
    }

    const [values, setValues] = useState(getInitialValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate()) {
            if (fieldValues === undefined) {
                alert("Created machine successfully!")
                setValues(initialValues)
            }
            else {
                alert("Edited machine successfully!")
            }
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField label="Name" name="name" value={values.name} onChange={handleInputChange}
                       {...(errors.name && {error:true, helperText: errors.name})} />

            <TextField label="Location" name="location" value={values.location} onChange={handleInputChange}
                       {...(errors.location && {error:true, helperText: errors.location})} />

            <TextField label="Latitude" type='number' name="latitude" value={values.latitude} onChange={handleInputChange}
                       {...(errors.latitude && {error:true, helperText: errors.latitude})}/>

            <TextField label="Longitude" type='number' name="longitude" value={values.longitude} onChange={handleInputChange}
                       {...(errors.longitude && {error:true, helperText: errors.longitude})}/>

            <TextField label="Installation code" name="installationCode" value={values.installationCode} onChange={handleInputChange}
                       {...(errors.installationCode && {error:true, helperText: errors.installationCode})}/>

            <TextField
                select
                name="group"
                value={values.group}
                label="Group"
                onChange={handleInputChange}
                {...(errors.group && {error:true, helperText: errors.group})}
            >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.name}>
                    {group.name}
                  </MenuItem>
                ))}
            </TextField>

            <Button type = "submit" variant="contained">
                {fieldValues !== undefined ? "Edit Machine" : "Create Machine"}
            </Button>
        </form>
    );
}

export default connect(state => ({}), {})(AddDeviceForm);