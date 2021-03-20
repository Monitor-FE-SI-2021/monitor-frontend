import { connect } from "react-redux";
import AddDeviceForm from "../../components/AddDeviceForm/AddDeviceForm";

const AddDevice = () => (
    <div className='page devices'>
        <AddDeviceForm />
    </div>
);

export default connect(state => ({}), {})(AddDevice);