import DeviceTable from "../DeviceTable/DeviceTable";
import { useEffect } from "react"
import {fetchAllDevices} from "../../store/modules/devices/actions";
import { connect } from "react-redux";

const AllDevices = ({ allDevices, devicesSearchText }) => {

    useEffect(() => {
        fetchAllDevices()
    }, [fetchAllDevices])

    return (
        <div>
            <button onClick={console.log(devicesSearchText)}>OK</button>
            <button onClick={console.log(allDevices)}>OK</button>
        </div>
    )
}

export default connect((state) => ({
    devicesSearchText: state.devices.searchText,
    allDevices: state.devices.allDevices
}),{ fetchAllDevices })(AllDevices)