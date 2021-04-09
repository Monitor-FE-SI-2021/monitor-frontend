import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import QueryBuilder from 'react-querybuilder';
import { formatQuery } from 'react-querybuilder';

import request from "../../service";

import { fields, frequencies, devices, queryFields } from './constants';
import ReportTiming from './ReportTiming';

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

import './Reporting.scss';



const Reports = ({ user, push }) => {
    const [selectedGroup, setSelectedGroup] = useState({ group: null, parent: null });
    const [groupStack, setGroupStack] = useState([]);
    const [groups, setGroups] = useState([]);
    const [queryValue, setQueryValue] = useState("");
    const [title, setTitle] = useState("");
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [frequencyInfo, setFrequencyInfo] = useState(null);
    const [sendEmailValue, setSendEmailValue] = useState(false);



    const setData = async () => {
        const res = await request("https://si-2021.167.99.244.168.nip.io/api/group/MyAssignedGroups");
        console.log("ovo je res", res, user);
        setGroups(res.data.data.subGroups);
        setSelectedGroup({depth: 0, group: {groupId : -1, subGroups : res.data.data.subGroups}, parent: null });
        setGroupStack([{depth: 0, group: {groupId : -1, subGroups : res.data.data.subGroups}, parent: null }]);
        console.log(res.data.data.subGroups);
    };

    useEffect(() => {
        setData();
    }, []);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeGroup = (event, index=-1) => {
        setSelectedGroup({depth : selectedGroup.depth + 1, group: event.target.value, parent: selectedGroup });
        setGroups(event.target.value.subGroups);
        setGroupStack([...groupStack, {depth: selectedGroup.depth + 1, group: event.target.value, parent: selectedGroup }]);
        console.log(index);
    };

    const changeQuery = query => {
        setQueryValue(query);
    };

    const checkQuery = () => {
        if (queryValue?.rules?.length <= 0 || title.length < 1 || frequencyInfo === null) return true;
        return false;
    };

    const calculateDate = () => {
        let date = null;
        let dateCurrent = new Date();
        
        const freq = frequencyInfo?.frequency?.value;
        switch(freq){
            case "daily":
                const dailyHours = frequencyInfo.time.value.split(':');
                dateCurrent.setHours(parseInt(dailyHours[0]) + 2, dailyHours[1], dailyHours[2]);
                break;
            case "weekly":
                console.log(frequencyInfo, 'testbest weekly');
                const daysMap = {
                    "Mon": 1,
                    "Tue": 2,
                    "Wed": 3,
                    "Thu": 4,
                    "Fri": 5,
                    "Sat": 6,
                    "Sun": 0
                }
                dateCurrent.setDate(dateCurrent.getDate() + (daysMap[frequencyInfo?.day?.value] + 7 - dateCurrent.getDay()) % 7 );
                const weeklyHours = frequencyInfo.time.value.split(':');
                dateCurrent.setHours(parseInt(weeklyHours[0]) + 2, weeklyHours[1], weeklyHours[2]);
                break;
            case "monthly":
                dateCurrent.setDate(frequencyInfo?.dayInMonth);
                if(dateCurrent< new Date()) dateCurrent.setMonth(dateCurrent.getMonth() + 1);
                const monthlyHours = frequencyInfo.time.value.split(':');
                dateCurrent.setHours(parseInt(monthlyHours[0]) + 2, monthlyHours[1], monthlyHours[2]);
                break;
            case "yearly": 
                const monthsMap = {
                    "january": 0,
                    "february": 1,
                    "march": 2,
                    "april": 3,
                    "may": 4,
                    "june": 5,
                    "july": 6,
                    "august": 7,
                    "september": 8,
                    "october": 9,
                    "november": 10,
                    "december": 11,
                }
                dateCurrent.setMonth(monthsMap[frequencyInfo?.month?.value]);
                dateCurrent.setDate(frequencyInfo?.dayInMonth);
                if(dateCurrent < new Date()) dateCurrent.setFullYear(dateCurrent.getFullYear() + 1);
                const yearlyHours = frequencyInfo.time.value.split(':');
                dateCurrent.setHours(parseInt(yearlyHours[0]) + 2, yearlyHours[1], yearlyHours[2]);
                break;
            default:
                break;
        }
        return dateCurrent.toISOString();
    };

    const submitReportForm = async (e) => {
        e.preventDefault();

        const selectClause = selectedColumns.join(', ');
        const fromClause = "DEVICES d";
        const whereClause = "( " + formatQuery(queryValue, 'sql') + " ) and d.groupId = " + (selectedGroup.group.groupId == -1 ? "d.groupId" : selectedGroup.group.groupId);

        const finalQuery = "SELECT " + selectClause + " FROM " + fromClause + " WHERE " + whereClause;
        console.log(finalQuery);

        const body = {
            name: title,
            userId: user.userId,
            query: finalQuery,
            nextDate: calculateDate(),
            frequency: frequencyInfo.frequency.value,
            sendEmail: sendEmailValue,
        };

        const response = await request("https://si-2021.167.99.244.168.nip.io/api/report/CreateReport", "POST", body);
        if (response.status === 200) {
            window.alert("Uspjesno kreiran report!");
            push(RouteLink.ReportList);
        }
    };

    const groupBacktrack = e => {
        if (selectedGroup.parent == null) return;
        var newGroups = selectedGroup.parent.group.subGroups;
        console.log(selectedGroup);
        setSelectedGroup(selectedGroup.parent);
        setGroups(newGroups);
        var newStack = groupStack.slice(0,-1);
        Promise.all([setGroupStack(groupStack.slice(0,-2))]).then(()=>setGroupStack(newStack));
        console.log(groupStack);

    }

    const changeSelectedColumns = (event) => {
        if (event.target.checked) {
            setSelectedColumns([...selectedColumns, event.target.value]);
        }
        else {
            setSelectedColumns(selectedColumns.filter(col => col !== event.target.value));
        }
    };

    const handleSendEmailValue = (event) => {
        setSendEmailValue(event.target.value);
    };

    return (
        <div className="reportingWrapper">
            <h1> Reporting </h1>

            <div className="reportingInput">
                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="frequencyLabel"> Report title:  </InputLabel>
                    <TextField labelId="frequencyLabel" value={title} className="select" onChange={changeTitle} autoFocus />
                </div>

                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="frequencyLabel"> Do you want to be send an email with this report? </InputLabel>
                    <input id="emailCheckbox" type="checkbox" value={sendEmailValue} onChange={handleSendEmailValue}></input>
                </div>

                <ReportTiming setTimeInfo={(info) => setFrequencyInfo(info)} />

                <div className="groupInputWrapper">

                    {groupStack.map(group_it => (
                        
                        <div> 
                            {(() => {
                                
                                if(group_it.group.subGroups.length == 0){
                                    return (<div className="inputWrapper">
                                        <InputLabel className="inputLabelWrapper" id={"groupLabel"+ group_it.groupId}> No more subgroups </InputLabel>
                                    </div>);
                                }else if(group_it.depth == groupStack.length-1){
                                    return (
                                        <div className="inputWrapper">
                                            <InputLabel className="inputLabelWrapper" id={"groupLabel"+ group_it.groupId}> Choose a {group_it.parent == null ? "group" : "subgroup"} </InputLabel>
                                            <Select className="select" labelId={"groupLabel"+ group_it.groupId} onChange={(e) => changeGroup(e, group_it.group.groupId)}>
                                                {group_it.group.subGroups.map(el => <MenuItem key={el.groupId} value={el}> {el.name} </MenuItem>)}
                                            </Select>
                                        </div>
                                    );
                                }else{
                                    return (
                                        <div className="inputWrapper">
                                            <InputLabel className="inputLabelWrapper" id={"groupLabel"+ group_it.groupId}> Choose a {group_it.parent == null ? "group" : "subgroup"} </InputLabel>
                                            <Select className="select" labelId={"groupLabel"+ group_it.groupId} onChange={(e) => changeGroup(e, group_it.group.groupId)} disabled="disabled">
                                                {group_it.group.subGroups.map(el => <MenuItem key={el.groupId} value={el}> {el.name} </MenuItem>)}
                                            </Select>
                                        </div>
                                    )
                                }
                            }
                            
                            )()}
                            
                        </div>
                    ))}

                    <div className="inputWrapper">
                        <InputLabel className="inputLabelWrapper">{selectedGroup.parent == null ? "No group is selected" : "You selected the group: " + selectedGroup.group.name}</InputLabel>
                        <div className="select">
                            <Button onClick={groupBacktrack}>Undo</Button> 
                        </div>
                    </div>
                </div>

                <div className="queryBuilderWrapper">
                    <h3 className="queryBuilderTitle"> What do you want in your report? </h3>
                    <QueryBuilder
                        title="reportBuilder"
                        fields={queryFields}
                        onQueryChange={changeQuery}
                        showNotToggle={true}
                    />
                </div>
                
                <div>
                    <h3 className="queryBuilderTitle"> Which columns do you want in your report? </h3>

                    {queryFields.map((inputField, index) => (
                        <div key={index}>
                            <Checkbox
                                value={inputField.name}
                                onChange={changeSelectedColumns}
                            />
                            <InputLabel className="selectCol">
                                {inputField.label}
                            </InputLabel>
                        </div>
                    ))}
                </div>

                <Button onClick={submitReportForm} variant="contained" color="default" disabled={checkQuery()}> Submit </Button>
            </div>
        </div>
    )
};

export default connect(state => {
    return {
        user: state.login.user,
    };
}, {push})(Reports);