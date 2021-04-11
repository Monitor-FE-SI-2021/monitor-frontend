import DeviceTable from "../DeviceTable/DeviceTable";
import { useCallback, useEffect } from "react"
import { connect } from "react-redux";
import './all_devices.scss';
import { fetchAllDevicesForUser } from "../../store/modules/devices/actions";
import { debounce } from "lodash/function";
import { ALL_DEVICES_TABLE_KEY } from "../../store/modules/devices/devices";

const AllDevices = ({ deviceTable, devicesSearchText, fetchAllDevicesForUser }) => {

    const fetchData = () => fetchAllDevicesForUser({
        page: deviceTable.page,
        perPage: deviceTable.perPage,
        status: deviceTable.status,
        sortField: deviceTable.sortField,
        sortOrder: deviceTable.sortOrder
    });

    const fetchDataDebounced = useCallback(
        debounce(fetchData, 400),
        []
    );

    useEffect(() => {
        fetchData();
    }, [deviceTable.page, deviceTable.perPage, deviceTable.status, deviceTable.sortField, deviceTable.sortOrder]);


    // search useEffect so i can debounce it
    useEffect(() => {
        fetchDataDebounced();
    }, [devicesSearchText])

    return (
        <div className='all-devices'>
            <DeviceTable devices={deviceTable?.devices ?? []}
                         showGroup={true}/>
        </div>
    )
}

export default connect((state) => {

    const deviceTable = state.devices.deviceTables?.[ALL_DEVICES_TABLE_KEY] || {};

    return {
        deviceTable,
        devicesSearchText: state.devices.searchText
    }
}, {fetchAllDevicesForUser})(AllDevices)