import DeviceTable from "../DeviceTable/DeviceTable";
import { useEffect } from "react"
import {fetchAllDevices} from "../../store/modules/devices/actions";
import { connect } from "react-redux";

const AllDevices = ({ allDevices }) => {

    useEffect(() => {
        fetchAllDevices()
    }, [fetchAllDevices])

    return (
        <div>
            <DeviceTable devices={allDevices} />
        </div>

    )
}

export default connect(state => {
    const allDevices = state.devices
    return allDevices
},{ fetchAllDevices })(AllDevices)