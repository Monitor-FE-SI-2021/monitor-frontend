import React from 'react';
import { connect } from "react-redux";
import {makeStyles, TextField, MenuItem, Button} from '@material-ui/core';
import {useState} from 'react'

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
        naziv: "",
        lokacija: "",
        gSirina: "",
        gDuzina: ""
    }

    const validate = () => {
        let temp = {}
        temp.naziv = values.naziv?"":"This field is required!"
        temp.lokacija = values.lokacija?"":"This field is required!"
        temp.gSirina = values.gSirina?"":"This field is required!"
        temp.gDuzina = values.naziv?"":"This field is required!"
    }

    const [values, setValues] = useState(initialValues)

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
        //console.log(values)
    }

    return (
        <form className={classes.root}>
            <TextField label="Naziv" name="naziv" value={values.naziv} onChange={handleInputChange} error helperText="greska"/>
            <TextField label="Lokacija" name="lokacija" value={values.lokacija} onChange={handleInputChange} />
            <TextField label="Geografska širina" type='number' name="gSirina" value={values.gSirina} onChange={handleInputChange} />
            <TextField label="Geografska visina" type='number' name="gDuzina" value={values.gDuzina} onChange={handleInputChange} />
            <TextField
                select
                value={selectedGroup}
                label="Odaberite grupu"
                onChange={(e) => (changeSelectedGroup(e.target.value))}
            >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.name}>
                    {group.name}
                  </MenuItem>
                ))}

                
            </TextField>
            <Button onClick={onClick} variant="contained">Dodaj mašinu</Button>
        </form>
    );
}

export default connect(state => ({}), {})(AddDeviceForm);