import './HourPicker.scss';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const HourPicker = ({ timeSet }) => {
  const [time, setTime] = useState("12:00 am");

  const handleChange = (e) => {
    setTime(e.target.value);
    timeSet(e.target.value);
  };

  return (
    <FormControl>
      <InputLabel shrink className="demo-simple-select-placeholder-label-label">
        Time
      </InputLabel>
      <Select 
        className="select selectHour"
        onChange={handleChange}
        value={time}
      >
        <MenuItem value="12:00 am">12:00 am</MenuItem>
        <MenuItem value="1:00 am">1:00 am</MenuItem>
        <MenuItem value="2:00 am">2:00 am</MenuItem>
        <MenuItem value="3:00 am">3:00 am</MenuItem>
        <MenuItem value="4:00 am">4:00 am</MenuItem>
        <MenuItem value="5:00 am">5:00 am</MenuItem>
        <MenuItem value="6:00 am">6:00 am</MenuItem>
        <MenuItem value="7:00 am">7:00 am</MenuItem>
        <MenuItem value="8:00 am">8:00 am</MenuItem>
        <MenuItem value="9:00 am">9:00 am</MenuItem>
        <MenuItem value="10:00 am">10:00 am</MenuItem>
        <MenuItem value="11:00 am">11:00 am</MenuItem>
        <MenuItem value="12:00 pm">12:00 pm</MenuItem>
        <MenuItem value="1:00 pm">1:00 pm</MenuItem>
        <MenuItem value="2:00 pm">2:00 pm</MenuItem>
        <MenuItem value="3:00 pm">3:00 pm</MenuItem>
        <MenuItem value="4:00 pm">4:00 pm</MenuItem>
        <MenuItem value="5:00 pm">5:00 pm</MenuItem>
        <MenuItem value="6:00 pm">6:00 pm</MenuItem>
        <MenuItem value="7:00 pm">7:00 pm</MenuItem>
        <MenuItem value="8:00 pm">8:00 pm</MenuItem>
        <MenuItem value="9:00 pm">9:00 pm</MenuItem>
        <MenuItem value="10:00 pm">10:00 pm</MenuItem>
        <MenuItem value="11:00 pm">11:00 pm</MenuItem>
      </Select>
    </FormControl>
  );
}

export default HourPicker;