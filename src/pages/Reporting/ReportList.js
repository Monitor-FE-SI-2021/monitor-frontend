import { connect } from "react-redux";
import ReportTable from '../../components/ReportTable/ReportTable';
import React, { useState, useEffect } from 'react';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";

import request from "../../service";

const ReportList = ({push}) => {
    const [groups, setGroups] = useState([]);
    

    const setData = async () => {
        const res = await request("https://si-2021.167.99.244.168.nip.io/api/report/AllReportsForUser");
        setGroups(res.data.data);
    };

    useEffect(() => {
        setData();
    }, []);

    return (
        <div className="reportingWrapper">
            <h1> Report List</h1>
            <button className="createReport" onClick={() => push(RouteLink.Reporting)}>Reporting</button>
            <div className="reportTable">
                <ReportTable reports={groups} />
            </div>
        </div>
    )
};
export default connect(state => ({}), {push})(ReportList);
