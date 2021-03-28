import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

import request from "../../service";

import './ReportList.scss';

const ReportList = ({push}) => {
    const [report, setReports] = useState([]);
    const reports = []
    
    //za probu podaci
    // let nesto = [
    //     {
    //       "reportId": 0,
    //       "name": "Weakly report",
    //       "query": "string",
    //       "frequency": "7",
    //       "startDate": "2021-03-27T13:32:06.672809+00:00",
    //       "userId": 0
    //     },
    //   ];

    const setData = async () => {
        const res = await request("https://si-2021.167.99.244.168.nip.io/api/report/AllReportsForUser");
        setReports(res.data.data);
        //nije radilo sa setReports() pa sam morala ovako 
        //vrati podatke ali ne dodijeli iz nekog razloga 
        console.log(res.data.data);
        for (let rep of res.data.data) 
                reports.push(rep);
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
