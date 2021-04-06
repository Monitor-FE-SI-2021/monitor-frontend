import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import {  FormControl, MenuItem, Select , Popover  } from "@material-ui/core";
import request from "../../service";

import './ReportList.scss';
import { frequenciesFilter } from './constants';

const ReportList = ({push}) => {
    const [reports, setReports] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState([]);
    const [selectedFrequency, setSelectedFrequency] = useState("noFilter");
    const [selectedName, setSelectedName] = useState("");
    
    //za probu
    let rep= [
        {
          "reportId": 0,
          "name": "string",
          "userId": 0,
          "nextDate": "2021-04-03T12:53:19.367Z",
          "frequency": "string",
          "query": "string",
          "sendEmail": true,
          "deleted": true,
          "reportInstances": [
            {
              "id": 0,
              "reportId": 0,
              "name": "string",
              "uriLink": "string"
            },
            {
                "id": 1,
                "reportId": 0,
                "name": "string0",
                "uriLink": "string"
              }
          ]
        },
        {
            "reportId": 1,
            "name": "string",
            "userId": 0,
            "nextDate": "2021-04-03T12:53:19.367Z",
            "frequency": "string",
            "query": "string",
            "sendEmail": true,
            "deleted": true,
            "reportInstances": [
              {
                "id": 2,
                "reportId": 0,
                "name": "string1",
                "uriLink": "string"
              }
            ]
          }
      ];

      const filterName = (event) => {
        handleClose();
        if(selectedName  === "") {
            setFilter([]);
        } else {
            setFilter([selectedName]);
        }     
    };

    const filterFrequency =  (event) => {
        handleClose();
        setSelectedFrequency(event.target.value);
        if(event.target.value  === "noFilter") {
            setFilter([]);
        } else {
            setFilter([event.target.value]);
        }     
    };

    const emptyReports = () =>{
        let size = reports.length;
        for(let i = 0; i < size ; i++)
            reports.pop();
    };
    const setData = async (frequencies) => {
        emptyReports();

        if(frequencies === null && selectedName===""){
            setReports([]);
            const res = await request("https://si-2021.167.99.244.168.nip.io/api/report/AllReportsForUser");
            for (let re of res.data.data) 
                for (let r of re.reportInstances)
                    reports.push(r);
            
            //za probu
            // for (let re of rep) 
            //     for (let r of re.reportInstances)
            //         reports.push(r);

            setReports(reports);
            
        }
        else if(frequencies !== null){
            setSelectedName("");
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports?' + `Frequency=${frequencies}`);
            setReports([]);
            for (let repo of res.data.data) 
                for (let r of repo.reportInstances)
                    reports.push(r);
            
            setReports(reports);
        }
        else{
            setSelectedFrequency("noFilter");
            const res = await request('https://si-2021.167.99.244.168.nip.io/api/report/GetReports?' + `Name=${selectedName}`);
            setReports([]);
            for (let repo of res.data.data) 
                for (let r of repo.reportInstances)
                    reports.push(r);

            setReports(reports);
        }
    };
   
    useEffect(() => {
        setReports([]);
        let freq = null;
        
        if(selectedFrequency !== "noFilter")
            freq = selectedFrequency;

        setData(freq);
    }, [filter]);

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleReset= () => {
        setSelectedName("");
        setSelectedFrequency("noFilter");
        setData(null);
    };
    ;
    const handleResetFreq= () => {
        setSelectedFrequency("noFilter");
    };

    return (
        <div className="reportingWrapper page">
             <div  className="header">
                <h1> Report List</h1>
                <button className="createReport" onClick={() => push(RouteLink.Reporting)}>New report</button>
                
            </div>
            <div className="buttons">
            <button className="searchReport" onClick={handleOpen}>Filter</button>
            <button className="searchReport" onClick={handleReset}>Reset filters</button>
            {open ?
                <FormControl className="filter"style={{ float: 'right' }}>
                    <Popover
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
                              }}/>
                        </MenuItem>
                    </Popover>
                </FormControl>
                : null}
            </div>
            <div className="reportTable">
                <ReportTable reports={ reports} />     
            </div>
        </div>
    )
};
export default connect(state => ({}), {push})(ReportList);
