import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import { FormControl, MenuItem, Select, Popover } from "@material-ui/core";
import request from "../../service";

import './ReportList.scss';
import { frequenciesFilter } from './constants';

const ReportList = ({ user, push }) => {
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
            for (let re of res.data.data)
                for (let r of re.reportInstances)
                    reports.push(r);
            console.log(res.data.data);
            setReports(reports);

        }
        else if (frequencies !== null) {
            setSelectedName("");
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports?' + `Frequency=${frequencies}`);
            setReports([]);
            for (let repo of res.data.data)
                for (let r of repo.reportInstances)
                    reports.push(r);

            setReports(reports);
        }
        else {
            setSelectedFrequency("noFilter");
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReportInstances?' + `Name=${selectedName}`);
            setReports([]);
            for (let repo of res.data.data)
                reports.push(repo);

            setReports(reports);
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

    const handleReset = () => {
        setSelectedName("");
        setSelectedFrequency("noFilter");
        setData(null);
    };
    ;
    const handleResetFreq = () => {
        setSelectedFrequency("noFilter");
    };

    const closeFilter = (e) => {
        if (e.key === "Escape") handleClose();
    }

    console.log("OVO SUUUU REPORTIIIII", reports)

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
                                    onChange={e => setSelectedName(e.target.value)}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            handleResetFreq();
                                            filterName();
                                        }
                                    }} />
                            </MenuItem>
                        </Popover>
                    </FormControl>
                : null}
            </div>
            {reports.map(item => (
                <div className="reportTable" key={item.id}>
                    <h3>{item.report.name}</h3>
                    <ReportTable report={item.report} /> 
                </div>
            ))}
        </div>
    )
};
export default connect(state => {
    return {
        user: state.login.user,
    };
}, { push })(ReportList);
