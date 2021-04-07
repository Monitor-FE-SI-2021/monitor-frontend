import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import HourPicker from './HourPicker.js';
import { options, days, months, times } from './constants/index';

import './ReportTiming.scss'
import { Input } from '@material-ui/core';

const ReportTiming = ({ setTimeInfo }) => {
    const [frequency, setFrequency] = useState(options[0]);
    const [day, setDay] = useState(days[0]);
    const [month, setMonth] = useState(months[0]);
    const [dayInMonth, setDayInMonth] = useState(1);
    const [time, setTime] = useState(times[0]);

    const refTime = React.createRef();

    useEffect(() => {
        setTimeInfo({
            frequency,
            day,
            month,
            dayInMonth,
            time,
        });
    }, []);

    const createDays = (d) => {
        let daysForRender = [];
        for (let i = 1; i <= d; i++) {
            daysForRender.push(<MenuItem key={i} value={i}> {i} </MenuItem>);
        }
        return daysForRender;
    }

    const handleFrequency = e => {
        setFrequency(e.target.value);
        setTimeInfo({
            frequency: e.target.value,
            day,
            month,
            dayInMonth,
            time,
        });
    };

    const handleTime = (e) => {
        setTime(e.target.value);
        setTimeInfo({
            frequency,
            day,
            month,
            dayInMonth,
            time: e.target.value,
        });
    };

    const handleDay = (e) => {
        var up_lim = month.days;        
        var x = e.target.value;
        x = x > up_lim ? up_lim : x < 1 ? 1 : x;
        e.target.value = x;

        setDay(e.target.value);
        setTimeInfo({
            frequency,
            day: e.target.value,
            month,
            dayInMonth,
            time,
        });
    };

    const handleMonth = async (e) => {
        setMonth(e.target.value);
        setTimeInfo({
            frequency,
            day,
            month: e.target.value,
            dayInMonth,
            time,
        });
    };

    const handleDayInMonth = async (e) => {
        var x = e.target.value;
        x = x > 31 ? 31 : x < 1 ? 1 : x;
        e.target.value = x;

        setDayInMonth(e.target.value);
        await setTimeInfo({
            frequency,
            day,
            month,
            dayInMonth: e.target.value,
            time,
        });
        setFrequency(frequency);
    };

    return (
        <div className="timingWrapper">
            <div className="timeInputWrapper">
                <InputLabel className="timeLabelWrapper"> How often do you want your report? </InputLabel>
                <Select value={frequency} onChange={handleFrequency}>
                    {options.map(item => <MenuItem key={item.value} value={item}> {item.label} </MenuItem>)}
                </Select>
            </div>
            <div className="timeInputWrapper">
                <InputLabel className="timeLabelWrapper"> Time: </InputLabel>
                <Input onChange={handleTime} type="time" defaultValue="12:00"></Input>
            </div>
            {
                frequency.value === 'weekly' ?
                <div className="timeInputWrapper">
                    <InputLabel className="timeLabelWrapper"> Day of the week: </InputLabel>
                    <Input type="number" inputProps={{min:1, max:31}} onChange={handleDayInMonth} defaultValue="1"></Input>
                </div> :
                null
            }
            {
                frequency.value === 'monthly' ?
                <div className="timeInputWrapper">
                    <InputLabel className="timeLabelWrapper"> Day: </InputLabel>
                    <Input type="number" inputProps={{min:1, max:31}} onChange={handleDayInMonth} defaultValue="1"></Input>
                </div> :
                null
            }
            {
                frequency.value === 'yearly' ?
                <div>
                    <div className="timeInputWrapper">
                        <InputLabel className="timeLabelWrapper"> Month: </InputLabel>
                        <Select value={month} onChange={handleMonth}>
                            {months.map(item => <MenuItem key={item.value} value={item}> {item.label} </MenuItem>)}
                        </Select>
                    </div>
                    <div className="timeInputWrapper">
                        <InputLabel className="timeLabelWrapper"> Day: </InputLabel>
                        <Input type="number" inputProps={{min:1, max:31}} onChange={handleDay} defaultValue="1" id="inputTime" ref={refTime}></Input>
                    </div>
                </div> :
                null
            }
        </div>
    );
}

export default ReportTiming;
