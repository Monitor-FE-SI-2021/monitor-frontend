import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { FormControl, MenuItem, Select, Popover } from "@material-ui/core";
import request from "../../service";
import { setReportToStore } from "../../store/modules/report/report";
import { frequenciesFilter } from './constants';
import Switch from '@material-ui/core/Switch';

import './ReportList.scss';
import CustomTable from "../../components/CustomTable/CustomTable";

const ReportList = ({ user, push, report, setReportToStore }) => {
    const [reports, setReports] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState("noFilter");
    const [selectedName, setSelectedName] = useState("");

    const filterName = (event) => {
        handleClose();
        if (selectedName === "") {
            setFilter([]);
        } else {
            setFilter([selectedName]);
        }
    };

    const filterFrequency = (event) => {
        handleClose();
        setSelectedFrequency(event.target.value);
        if (event.target.value === "noFilter") {
            setFilter([]);
        } else {
            setFilter([event.target.value]);
        }
    };

    const emptyReports = () => {
        let size = reports.length;
        for (let i = 0; i < size; i++)
            reports.pop();
    };

    const setData = async (frequencies) => {
        emptyReports();

        if (frequencies === null && selectedName === "") {
            setReports([]);
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports');
            setReports(res?.data?.data);

        }
        else if (frequencies !== null) {
            setSelectedName("");
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports?' + `Frequency=${frequencies}`);
            let newArray = [];
            res.data.data.forEach(item => {
                if (item.reportInstances.length > 0) newArray.push(item);
            })
            setReports(newArray);
        }
        else {
            setSelectedFrequency("noFilter");
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReportInstances?' + `Name=${selectedName}`);
            setReports(res?.data?.data);
        }
    };

    useEffect(() => {
        setReports([]);
        let freq = null;

        if (selectedFrequency !== "noFilter")
            freq = selectedFrequency;

        setData(freq);
    }, [filter]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleReset = async () => {
        const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports');
        setReports(res?.data?.data);
        setSelectedName("");
        setSelectedFrequency("noFilter");
    };
    ;
    const handleResetFreq = () => {
        setSelectedFrequency("noFilter");
    };

    const closeFilter = (e) => {
        if (e.key === "Escape") handleClose();
    }

    const putToStore = (value) => {
        setReportToStore(value);
        push(RouteLink.EditReport);
    }

    const changeSendEmail = async (item) => {
        const res = await request(`https://si-2021.167.99.244.168.nip.io/api/report/ChangeSendingEmail/${item.reportId}`, "PUT");
        setReports(res?.data?.data);
    }

    const stopReport = async (reportId) => {
        const res = await request(`https://si-2021.167.99.244.168.nip.io/api/report/StopReport/${reportId}`, "PATCH");
        setData();
    }

    return (
        <div className="reportingWrapper page">
            <div className="header">
                <h1> Report List</h1>
                <button className="createReport" onClick={() => push(RouteLink.Reporting)}>New report</button>
            </div>
            <div className="buttons">
                <button className="searchReport" onClick={handleReset}>Reset filters</button>
                <button className="searchReport" onClick={handleOpen}>Filter</button>
                {open ?
                    <FormControl className="filter" style={{ float: 'right' }}>
                        <Popover
                            onKeyDown={closeFilter}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={open}>
                            <MenuItem disabled>
                                <em>Frequency</em>
                            </MenuItem>
                            <MenuItem value={selectedFrequency} >
                                {frequenciesFilter.length > 0 &&
                                    <Select className="select" labelId="frequencyLabel" value={selectedFrequency} onChange={filterFrequency}>
                                        {frequenciesFilter.map(el => <MenuItem key={el.name} value={el.name}> {el.label} </MenuItem>)}
                                    </Select>
                                }
                            </MenuItem>
                            <MenuItem value={selectedName}>
                                <input
                                    type="text"
                                    className="MuiInputBase-input MuiInput-input"
                                    placeholder="Name"
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            setSelectedName(event.target.value);
                                            handleResetFreq();
                                            filterName();
                                        }
                                    }} />
                            </MenuItem>
                        </Popover>
                    </FormControl>
                : null}
            </div>
            {selectedName === '' && reports.map(item => (
                <div className="reportTable" key={item.reportId}>
                    <div className="reportHeader">
                        <h3>{item.name}</h3>
                        <div>
                            Send email: 
                            <Switch color="primary" checked={item.sendEmail} onChange={() => changeSendEmail(item)} />
                            <button className="editButton" onClick={() => putToStore(item)}>Edit</button>
                            <button className="deleteButton" onClick={() => stopReport(item.reportId)}>Delete</button>
                        </div>
                    </div>
                    <ReportTable report={item} filter={false} />
                </div>
            ))}
            {selectedName !== '' &&
                <ReportTable report={reports} filter={true} />
            }
        </div>
    )
};
export default connect(state => {
    return {
        user: state.login.user,
        report: state.report.report
    };
}, { push, setReportToStore })(ReportList);
