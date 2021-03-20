import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            display: 'flex',
            flexWrap: 'wrap',
            width: '50%',
            margin: theme.spacing(1),
        }
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

    return (
        <form className={classes.root}>
            <TextField label="Naziv" />
            <TextField label="Lokacija" />
            <TextField label="Geografske koordinate" />
            <TextField select label="Odaberite grupu">
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.name}>
                    {group.name}
                  </MenuItem>
            ))}</TextField>
        </form>
    );
}