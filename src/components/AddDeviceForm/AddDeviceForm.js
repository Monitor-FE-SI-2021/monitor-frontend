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

const AddDeviceForm = () => {
    const classes = useStyles();
    const [selectedGroup, setSelectedGroup] = useState('')

    const onClick = () => {
        console.log('Click')
    }

    const changeSelectedGroup = (value) => {
        setSelectedGroup(value)
    }

    const initialValues = {
        name: "",
        location: "",
        latitude: "",
        longitude: ""
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
        temp.group = selectedGroup ? "" : "This field is required!"
        setErrors(temp)

        return Object.values(temp).every(x => x=="")
    }

    const [values, setValues] = useState(initialValues)
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
        if(validate())
            alert("Validno")
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField label="Naziv" name="name" value={values.name} onChange={handleInputChange}
                       {...(errors.name && {error:true, helperText: errors.name})} />

            <TextField label="Lokacija" name="location" value={values.location} onChange={handleInputChange}
                       {...(errors.location && {error:true, helperText: errors.location})} />

            <TextField label="Geografska širina" type='number' name="latitude" value={values.latitude} onChange={handleInputChange}
                       {...(errors.latitude && {error:true, helperText: errors.latitude})}/>

            <TextField label="Geografska visina" type='number' name="longitude" value={values.longitude} onChange={handleInputChange}
                       {...(errors.longitude && {error:true, helperText: errors.longitude})}/>

            <TextField
                select
                value={selectedGroup}
                label="Odaberite grupu"
                onChange={(e) => (changeSelectedGroup(e.target.value))}
                {...errors.group && {error:true}}
            >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.name}>
                    {group.name}
                  </MenuItem>
                ))}

                
            </TextField>
            {errors.group && <FormHelperText className="groupError" style={{color:"red"}}>{errors.group}</FormHelperText>}

            <Button type = "submit" onClick={onClick} variant="contained">Dodaj mašinu</Button>
        </form>
    );
}

export default connect(state => ({}), {})(AddDeviceForm);