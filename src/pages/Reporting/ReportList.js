import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

import request from "../../service";

import './ReportList.scss';

const ReportList = ({push}) => {
    const [report, setReports] = useState([]);
    const reports = [];

    const setData = async () => {
        const res = await request("https://si-2021.167.99.244.168.nip.io/api/report/AllReportsForUser");

        for (let rep of res.data.data) 
                reports.push(rep);
    
        setReports(reports);
    };

    useEffect(() => {
        setData();
    }, []);

    return (
        <div className="reportingWrapper">
             <div  className="header">
                <h1> Report List</h1>
                <button className="createReport" onClick={() => push(RouteLink.Reporting)}>New report</button>
            </div>
            <div className="reportTable">
                <ReportTable reports={reports} />
            </div>
        </div>
    )
};
export default connect(state => ({}), {push})(ReportList);
