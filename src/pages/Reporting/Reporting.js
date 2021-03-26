import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import QueryBuilder from 'react-querybuilder';
import { formatQuery } from 'react-querybuilder';

import request from "../../service";

import { fields, frequencies, devices } from './constants';

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import './Reporting.scss';

const Reports = () => {
    const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0].name);
    const [selectedDateTime, setSelectedDateTime] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [groups, setGroups] = useState([]);
    const [queryValue, setQueryValue] = useState("");
    const [title, setTitle] = useState("");

    const setData = async () => {
        const res = await request("https://si-2021.167.99.244.168.nip.io/api/group/MyAssignedGroups");
        setGroups(res.data.data);
        setSelectedGroup(res.data.data[0]?.name)
    };

    useEffect(() => {
        setData();
    }, []);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };
    
    const changeFrequency = (event) => {
        setSelectedFrequency(event.target.value);
    };

    const changeDateTime = (event) => {
        setSelectedDateTime(event.target.value);
    };

    const changeGroup = (event) => {
        setSelectedGroup(event.target.value);
    };

    const changeQuery = query => {
        setQueryValue(query);
    };

    const checkQuery = () => {
        if(queryValue?.rules?.length <= 0) return true;
        return false;
    }

    const submitReportForm = e => {
        e.preventDefault();
        console.log("Final query: ", selectedFrequency, selectedDateTime, selectedGroup, queryValue);
        //console.log(formatQuery(queryValue, 'sql'));
        //console.log(formatQuery(queryValue, 'parametrised')); 
        
    };

    return (
        <div className="reportingWrapper">
            <h1> Reporting </h1>

            <div className="reportingInput">
                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="frequencyLabel"> Report title:  </InputLabel>
                        <TextField labelId="frequencyLabel" value={title} className="select" onChange={changeTitle} autoFocus/>
                </div>

                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="frequencyLabel"> How often do you want a report to be sent to you? </InputLabel>
                    {frequencies.length > 0 && 
                        <Select className="select" labelId="frequencyLabel" value={selectedFrequency} onChange={changeFrequency}>
                            {frequencies.map(el => <MenuItem key={el.name} value={el.name}> {el.label} </MenuItem>)}
                        </Select>
                    }
                </div>

                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper"> At what time do you want an email to be sent? </InputLabel>
                    <TextField
                        id="date"
                        type={selectedFrequency === "day" ? "time" : "datetime-local"}
                        className="dateTimePicker"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={changeDateTime}
                    />
                </div>

                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="groupLabel"> Choose a group: </InputLabel>
                    <Select className="select" labelId="groupLabel" value={selectedGroup} onChange={changeGroup}>
                        {groups.map(el => <MenuItem key={el.groupId} value={el.name}> {el.name} </MenuItem>)}
                    </Select>
                </div>
                
                <div className="queryBuilderWrapper">
                    <h3 className="queryBuilderTitle"> What do you want in your report? </h3>
                    <QueryBuilder 
                        title="reportBuilder"
                        fields={fields}
                        onQueryChange={changeQuery}
                        showNotToggle={true}
                        //combinators={devices}
                    />
                </div>

                <Button onClick={submitReportForm} variant="contained" color="default" disabled={checkQuery()}> Submit </Button>
            </div>
        </div>
    )
};

export default connect(state => ({}), {})(Reports);