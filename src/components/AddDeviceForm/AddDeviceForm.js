import React from 'react';
import { connect } from "react-redux";
import {makeStyles, TextField, MenuItem, Button, FormHelperText} from '@material-ui/core';
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
        temp.gSirina = values.gSirina.length==6?"":"Latitude should consist of exactly 6 numbers!"
        temp.gDuzina = values.gDuzina.length==6?"":"Longitude should consist of exactly 6 numbers!"
        temp.grupa = selectedGroup ? "" : "This field is required!"
        setErrors({
            ...temp
        })

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
        //console.log(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
            alert("radi")
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField label="Naziv" name="naziv" value={values.naziv} onChange={handleInputChange} 
                {...(errors.naziv && {error:true, helperText: errors.naziv})} />
            <TextField label="Lokacija" name="lokacija" value={values.lokacija} onChange={handleInputChange}
                {...(errors.lokacija && {error:true, helperText: errors.lokacija})} />
            <TextField label="Geografska širina" type='number' name="gSirina" value={values.gSirina} onChange={handleInputChange} 
                {...(errors.gSirina && {error:true, helperText: errors.gSirina})}/>
            <TextField label="Geografska visina" type='number' name="gDuzina" value={values.gDuzina} onChange={handleInputChange} 
                {...(errors.gDuzina && {error:true, helperText: errors.gDuzina})}/>
            <TextField
                select
                value={selectedGroup}
                label="Odaberite grupu"
                onChange={(e) => (changeSelectedGroup(e.target.value))}
                {...errors.grupa && {error:true}}
            >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.name}>
                    {group.name}
                  </MenuItem>
                ))}

                
            </TextField>
            {errors.grupa && <FormHelperText>{errors.grupa}</FormHelperText>} 
            <Button type = "submit" onClick={onClick} variant="contained">Dodaj mašinu</Button>
        </form>
    );
}

export default connect(state => ({}), {})(AddDeviceForm);