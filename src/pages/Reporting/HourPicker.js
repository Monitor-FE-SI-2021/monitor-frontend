import React, {useState} from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './HourPicker.scss';

function HourPicker (){
        return <Select className="select selectHour" placeholder="Select Time">
        <MenuItem value="0">12:00 am</MenuItem>
        <MenuItem value="1">1:00 am</MenuItem>
        <MenuItem value="2">2:00 am</MenuItem>
        <MenuItem value="3">3:00 am</MenuItem>
        <MenuItem value="4">4:00 am</MenuItem>
        <MenuItem value="5">5:00 am</MenuItem>
        <MenuItem value="6">6:00 am</MenuItem>
        <MenuItem value="7">7:00 am</MenuItem>
        <MenuItem value="8">8:00 am</MenuItem>
        <MenuItem value="9">9:00 am</MenuItem>
        <MenuItem value="10">10:00 am</MenuItem>
        <MenuItem value="11">11:00 am</MenuItem>
        <MenuItem value="12">12:00 pm</MenuItem>
        <MenuItem value="13">1:00 pm</MenuItem>
        <MenuItem value="14">2:00 pm</MenuItem>
        <MenuItem value="15">3:00 pm</MenuItem>
        <MenuItem value="16">4:00 pm</MenuItem>
        <MenuItem value="17">5:00 pm</MenuItem>
        <MenuItem value="18">6:00 pm</MenuItem>
        <MenuItem value="19">7:00 pm</MenuItem>
        <MenuItem value="20">8:00 pm</MenuItem>
        <MenuItem value="21">9:00 pm</MenuItem>
        <MenuItem value="22">10:00 pm</MenuItem>
        <MenuItem value="23">11:00 pm</MenuItem>
      </Select>
     
    
}

export default HourPicker;