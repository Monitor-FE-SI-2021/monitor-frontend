import React from 'react';
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

export default function AddDeviceForm() {
    const classes = useStyles();

    const [selectedGroup, setSelectedGroup] = useState('')

    const onClick = () => {
        console.log('Click')
    }

    const changeSelectedGroup = (value) => {
        setSelectedGroup(value)
    }

    return (
        <form className={classes.root}>
            <TextField label="Naziv" />
            <TextField label="Adresa" />
            <TextField label="Geografska širina" type='number'/>
            <TextField label="Geografska visina" type='number'/>
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