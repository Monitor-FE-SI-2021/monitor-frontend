import { connect } from "react-redux";

const Dashboard = () => (
    <div className='page dashboard'>
        <h1>Dashboard</h1>
    </div>
);

export default connect(state => ({}), {})(Dashboard);