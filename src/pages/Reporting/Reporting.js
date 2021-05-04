import { connect } from "react-redux";
import React, { useState, useEffect } from 'react';
import QueryBuilder from 'react-querybuilder';
import { formatQuery } from 'react-querybuilder';
import { setReportToStore } from "../../store/modules/report/report";

import request from "../../service";

import { fields, frequencies, devices, queryFields, days, months, times } from './constants';
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



const Reports = ({ user, push, report, setReportToStore }) => {
    const [selectedGroup, setSelectedGroup] = useState({ group: null, parent: null });
    const [groupStack, setGroupStack] = useState([]);
    const [groups, setGroups] = useState([]);
    const [queryValue, setQueryValue] = useState("");
    const [title, setTitle] = useState(report?.name ? report.name: "");
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [frequencyInfo, setFrequencyInfo] = useState(null);
    const [sendEmailValue, setSendEmailValue] = useState(report?.sendEmail ? report.sendEmail : false);
    const [values, setValues] = useState(null);
    const [loadedGroupId, setLoadedGroupId] = useState(null);
    const [foundPathToGroup, setFoundPathToGroup] = useState(false);
    const [loadedGroup, setLoadedGroup] = useState(report ? true : false);
    const [checkBoxes, setCheckBoxes] = useState([false,false,false,false,false,false,false,false,false]);
    const [loadedQuery, setLoadedQuery] = useState("");
    const [reportId, setReportId] = useState("");

    const initValues = (data) => {
        setReportId(data.reportId);
        const newDate = new Date(data?.nextDate);
        const newTime = `00:00:00`;
        const findTime = times.find(e => e.value === newTime);
        const obj = {
            frequency: {
                label: data?.frequency,
                value: data?.frequency
            },
            day: {
                label: days[newDate.getDay()].label,
                value: days[newDate.getDay()].value
            },
            month: {
                label: months[newDate.getMonth()].label,
                value: months[newDate.getMonth()].value,
            },
            dayInMonth: newDate.getDate(),
            time: {
                label: findTime?.label,
                value: findTime?.value
            }
        }
        setValues(obj);
    }

    let arrToSubGroups = {};
    const arrPathToGroup = [];

    const initGroup = () => {
        if(loadedGroupId){
            let subGroups = [];
            groupStack.forEach(levelOnePass => {
                subGroups = levelOnePass?.group?.subGroups;
            })
            addSubGroupsRecursivly(subGroups);
        }
    }
    const addSubGroupsRecursivly = (subGroups) => {
        subGroups.forEach(el => {
            arrToSubGroups[`${el.groupId}`] = el.parentGroupId;
            if(el.subGroups) addSubGroupsRecursivly(el.subGroups);
        })
    }
    const findMeAGroup = () => {
        if(arrToSubGroups[loadedGroupId]){
            let index = loadedGroupId;
            while(arrToSubGroups[index]){
                arrPathToGroup.push(index);
                index = arrToSubGroups[index];
            }
        }
        changeGroupForce();
    }

    const setData = async () => {
        const res = await request("https://si-2021.167.99.244.168.nip.io/api/group/MyAssignedGroups");
        setGroups(res.data.data.subGroups);
        setSelectedGroup({depth: 0, group: {groupId : -1, subGroups : res.data.data.subGroups}, parent: null });
        setGroupStack([{depth: 0, group: {groupId : -1, subGroups : res.data.data.subGroups}, parent: null }]);
        if (!(report === null)) {
            initValues(report);
            const parsedReportQuery = JSON.parse(report? report.query : "{}");
            const numberOfGroup = parsedReportQuery?.group;
            setLoadedGroupId(numberOfGroup);
            setSelectedColumns(parsedReportQuery?.select);
            const arr = [];
            fields.forEach(el => {
                const found = parsedReportQuery?.select.find(elem => elem === el.name);
                if(found) {
                    arr.push(true);
                } else {
                    arr.push(false);
                }
            })
            setCheckBoxes(arr);
            setLoadedQuery(JSON.stringify(parsedReportQuery))
            setReportToStore(null);
        } 
    };

    useEffect(() => {
        setData();
    }, []);

    useEffect(() => {
        initGroup();
        setTimeout(()=>{
            if(!foundPathToGroup) findMeAGroup();
        }, 1000);
    }, [groupStack, loadedGroupId]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeGroup = (event, index=-1) => {
        setSelectedGroup({depth : selectedGroup.depth + 1, group: event.target.value, parent: selectedGroup });
        setGroups(event.target.value.subGroups);
        setGroupStack([...groupStack, {depth: selectedGroup.depth + 1, group: event.target.value, parent: selectedGroup }]);
    };

    const changeGroupForce = () => {
        const foundGroup = selectedGroup.group?.subGroups.find(el => el.groupId === arrPathToGroup[arrPathToGroup.length-1])
        if(foundGroup){
            arrPathToGroup.pop();
            setSelectedGroup({depth : selectedGroup.depth + 1, group: foundGroup, parent: selectedGroup });
            setGroups(foundGroup.subGroups);
            setGroupStack([...groupStack, {depth: selectedGroup.depth + 1, group: foundGroup, parent: selectedGroup }]);
            setTimeout(() => {
                if(arrPathToGroup.length > 0)changeGroupForce();
                else {
                    setFoundPathToGroup(true);
                    setLoadedGroup(true);
                }
            }, 200);
        }
    }

    const changeQuery = query => {
        setQueryValue(query);
    };

    const checkQuery = () => {
        if ((!queryValue.rules || queryValue.rules.length <= 0) || title.length < 1 || frequencyInfo === null || selectedGroup?.group?.groupId <= -1 || selectedColumns.length < 1) return true;
        return false;
    };

    const calculateDate = () => {
        let date = null;
        let dateCurrent = new Date();
        
        const freq = frequencyInfo?.frequency?.value;
        switch(freq){
            case "Daily":
                const dailyHours = frequencyInfo.time.value.split(':');
                dateCurrent.setHours(parseInt(dailyHours[0]), dailyHours[1], dailyHours[2]);
                break;
            case "Weekly":
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
                dateCurrent.setHours(parseInt(weeklyHours[0]), weeklyHours[1], weeklyHours[2]);
                break;
            case "Monthly":
                dateCurrent.setDate(frequencyInfo?.dayInMonth);
                if(dateCurrent< new Date()) dateCurrent.setMonth(dateCurrent.getMonth() + 1);
                const monthlyHours = frequencyInfo.time.value.split(':');
                dateCurrent.setHours(parseInt(monthlyHours[0]) + 2, monthlyHours[1], monthlyHours[2]);
                break;
            case "Yearly": 
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

        const selectClause = selectedColumns
        const fromClause = "DEVICES d";
        const whereClause = JSON.parse(formatQuery(queryValue, 'json_without_ids').replaceAll('"operator":', '"operator_str":'));
        const groupClause = selectedGroup.group.groupId;

        const finalQuery = {select: selectClause, where: whereClause, group: groupClause, freq: frequencyInfo.frequency.value};

        const body = {
            name: title,
            userId: user.userId,
            query: JSON.stringify(finalQuery),
            nextDate: calculateDate(),
            frequency: frequencyInfo.frequency.value,
            sendEmail: sendEmailValue,
        };
        
        const response = await request("https://si-2021.167.99.244.168.nip.io/api/report/CreateReport", "POST", body);
        if (response.status === 200) {
            window.alert("Report created successfully!");
            push(RouteLink.ReportList);
        }
    };

    const groupBacktrack = e => {
        if (selectedGroup.parent == null) return;
        var newGroups = selectedGroup.parent.group.subGroups;
        setSelectedGroup(selectedGroup.parent);
        setGroups(newGroups);
        var newStack = groupStack.slice(0,-1);
        Promise.all([setGroupStack(groupStack.slice(0,-2))]).then(()=>setGroupStack(newStack));

    }

    const changeSelectedColumns = (event, index) => {
        const temp = [...checkBoxes];
        temp[index] = event.target.checked;
        setCheckBoxes(temp);
        if (event.target.checked) {
            setSelectedColumns([...selectedColumns, event.target.value]);
        }
        else {
            setSelectedColumns(selectedColumns.filter(col => col !== event.target.value));
        }
    };

    const handleSendEmailValue = (value) => {
        setSendEmailValue(value);
    };
    
    const resetState = (value) => {
        if (value === 'group') setLoadedGroup(false); 
        else setData();
    }

    
    return (
        <div className="reportingWrapper">
            <h1> Create Report </h1>

            <div className="reportingInput">
                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="frequencyLabel"> Report title:  </InputLabel>
                    <TextField labelId="frequencyLabel" value={title} className="select" onChange={changeTitle} autoFocus />
                </div>

                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper" id="frequencyLabel"> Do you want to be send an email with this report? </InputLabel>
                    <input id="emailCheckbox" type="checkbox" checked={sendEmailValue} onChange={() => handleSendEmailValue(!sendEmailValue)}></input>
                </div>

                <ReportTiming editData={values ? values : false} setTimeInfo={(info) => setFrequencyInfo(info)} />
                {!loadedGroup && <div className="groupInputWrapper">

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
                                            <Select name={'myselectinput'} className="select" labelId={"groupLabel"+ group_it.groupId} onChange={(e) => changeGroup(e, group_it.group.groupId)}>
                                                {group_it.group.subGroups.map(el => <MenuItem key={el.groupId} value={el}> {el.name} </MenuItem>)}
                                            </Select>
                                        </div>
                                    );
                                }else{
                                    return (
                                        <div className="inputWrapper">
                                            <InputLabel className="inputLabelWrapper" id={"groupLabel"+ group_it.groupId}> Choose a {group_it.parent == null ? "group" : "subgroup"} </InputLabel>
                                            <Select name={'myselectinput'} className="select" labelId={"groupLabel"+ group_it.groupId} onChange={(e) => changeGroup(e, group_it.group.groupId)} disabled="disabled">
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
                </div>}
                {!loadedGroup && <div className="queryBuilderWrapper">
                    <h3 className="queryBuilderTitle"> What do you want in your report? </h3>
                    <QueryBuilder
                        title="reportBuilder"
                        fields={fields}
                        onQueryChange={changeQuery}
                        showNotToggle={true}
                        enableMountQueryChange={false}
                    />
                </div>}
                
                <div>
                    <h3 className="queryBuilderTitle"> Which columns do you want in your report? </h3>

                    {fields.map((inputField, index) => (
                        <div key={index}>
                            <Checkbox
                                checked={checkBoxes[index]}
                                value={inputField.name}
                                onChange={(e) => changeSelectedColumns(e, index)}
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
        report: state.report.report
    };
}, {push, setReportToStore})(Reports);