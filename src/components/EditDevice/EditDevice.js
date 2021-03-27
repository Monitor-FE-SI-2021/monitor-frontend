import React from 'react';
import Warper from "./Warper.js";
import Popup from 'reactjs-popup';
import { Edit } from "@material-ui/icons";
import './EditDevice.scss'
import {makeStyles, TextField, MenuItem, Button, FormHelperText} from '@material-ui/core';

const contentStyle = {
    maxWidth: 'fit-content'
};
/*
const EditDevice = () => (
    <Popup trigger={<Edit onClick={() => {}}/>} >
        <div>Popup content here !!</div>
    </Popup>
);*/

export default function EditDevice({data}) {

    const handleInputChange = e => {
    }

    const onClick = () => {
    }

    return (
        <Popup
            trigger={<Edit onClick={() => {}}/>}
            modal
            contentStyle={contentStyle}
        >
            {close => (
                <div className="modal">
                    <a className="close" onClick={close}>
                        &times;
                    </a>
                    <div className="header"> Ažuriranje mašine </div>
                    <div className="content">
                        <form className="forma">
                            <TextField label="Naziv" name="naziv" defaultValue={data.name} onChange={handleInputChange} />
                            <br></br>
                            <TextField label="Lokacija" name="lokacija" defaultValue={data.location} onChange={handleInputChange} />
                            <br></br>
                            <br></br>
                            <Button type = "submit" onClick={onClick} className="button1" variant="contained">Ažuriraj</Button>
                            <Button className="button2" onClick={() => {close();}} variant="contained">Odustani</Button>
                        </form> 
                    </div>
                </div>
            )}
        </Popup>
    )
}
