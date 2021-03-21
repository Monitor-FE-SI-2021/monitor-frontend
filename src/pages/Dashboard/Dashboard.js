import { connect } from "react-redux";
import { fetchAllDevices } from "../../store/modules/devices/actions";
import { useEffect } from "react";

const Dashboard = ({ fetchAllDevices }) => {

    useEffect(() => {
        fetchAllDevices();
    }, [fetchAllDevices]);

    return (
        <div className='page dashboard'>
            <h1>Dashboard</h1>
        </div>
    )

};

export default connect(state => ({}), { fetchAllDevices })(Dashboard);