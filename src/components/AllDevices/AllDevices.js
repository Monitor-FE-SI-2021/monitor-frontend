import DeviceTable from "../DeviceTable/DeviceTable";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import request, {devices} from "../../service";

const AllDevices = ({ devicesSearchText }) => {

    const [searchedDevices, setSearchedDevices] = useState([{}])

    useEffect(() => {
        request(devices + `/AllDevices?name=${devicesSearchText}&location=${devicesSearchText}`)
            .then(response => response.data)
            .then(r => {
                setSearchedDevices(r.data)
            })
    }, [devicesSearchText])

    return (
        <div>
            <DeviceTable devices={searchedDevices} />
        </div>
    )
}

export default connect((state) => ({
    devicesSearchText: state.devices.searchText
}),{})(AllDevices)