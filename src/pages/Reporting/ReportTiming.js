import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import HourPicker from './HourPicker.js';
import { options, days, months, times } from './constants/index';

import './ReportTiming.scss'

const ReportTiming = ({ setTimeInfo }) => {
    const [frequency, setFrequency] = useState(options[0]);
    const [day, setDay] = useState(days[0]);
    const [month, setMonth] = useState(months[0]);
    const [dayInMonth, setDayInMonth] = useState(1);
    const [time, setTime] = useState(times[0]);

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
        setDay(e.target.value);
        setTimeInfo({
            frequency,
            day: e.target.value,
            month,
            dayInMonth,
            time,
        });
    };

    const handleMonth = (e) => {
        setMonth(e.target.value);
        setTimeInfo({
            frequency,
            day,
            month: e.target.value,
            dayInMonth,
            time,
        });
    };

    const handleDayInMonth = (e) => {
        setDayInMonth(e.target.value);
        setTimeInfo({
            frequency,
            day,
            month,
            dayInMonth: e.target.value,
            time,
        });
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
                <Select value={time} onChange={handleTime}>
                    {times.map(item => <MenuItem key={item.value} value={item}> {item.label} </MenuItem>)}
                </Select>
            </div>
            {
                frequency.value === 'Weekly' ?
                <div className="timeInputWrapper">
                    <InputLabel className="timeLabelWrapper"> Day of the week: </InputLabel>
                    <Select value={day} onChange={handleDay}>
                        {days.map(item => <MenuItem key={item.value} value={item}> {item.label} </MenuItem>)}
                    </Select>
                </div> :
                null
            }
            {
                frequency.value === 'Monthly' ?
                <div className="timeInputWrapper">
                    <InputLabel className="timeLabelWrapper"> Day: </InputLabel>
                    <Select value={dayInMonth} onChange={handleDayInMonth}>
                        {createDays(31)}
                    </Select>
                </div> :
                null
            }
            {
                frequency.value === 'Yearly' ?
                <div>
                    <div className="timeInputWrapper">
                        <InputLabel className="timeLabelWrapper"> Month: </InputLabel>
                        <Select value={month} onChange={handleMonth}>
                            {months.map(item => <MenuItem key={item.value} value={item}> {item.label} </MenuItem>)}
                        </Select>
                    </div>
                    <div className="timeInputWrapper">
                        <InputLabel className="timeLabelWrapper"> Day: </InputLabel>
                        <Select value={dayInMonth} onChange={handleDayInMonth}>
                            {createDays(month.days)}
                        </Select>
                    </div>
                </div> :
                null
            }
        </div>
    );
}

export default ReportTiming;
