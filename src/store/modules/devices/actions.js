import {
    SELECT_DEVICE,
    SET_DEVICES,
    SET_DEVICES_ASYNC,
    SET_DEVICES_ASYNC_FOR_GROUP,
    SET_DEVICES_FOR_GROUP,
    UPDATE_DEVICES_TABLE_FOR_GROUP
} from "./types";
import request, { devices } from "../../../service";

export function fetchAllDevices() {

    return dispatch => {
        dispatch({ type: SET_DEVICES_ASYNC, async: true });
        return request(devices + '/AllDevices').then(response => response.data)
            .then(r => {

                const devices = r.data;

                return dispatch({
                    type: SET_DEVICES,
                    devices: devices
                })
            }).finally(() => {
                dispatch({ type: SET_DEVICES_ASYNC, async: false });
            })
    }
}

export function fetchDevicesForGroup({ groupId, page = 1, perPage = 10 }) {

    const query = `page=${page}&per_page=${perPage}&name=&status=active&groupId=${groupId}&sort_by=name_desc`

    return (dispatch, getState) => {

        const deviceTable = getState().devices.deviceTables?.[groupId];

        if (deviceTable?.async) {
            return;
        }

        dispatch({ type: SET_DEVICES_ASYNC_FOR_GROUP, groupId: groupId, async: true });

        return request(devices + `/AllDevicesForGroup?${query}`).then(response => response.data)
            .then(r => {

                const { devices, deviceCount } = r.data;

                return dispatch({
                    type: UPDATE_DEVICES_TABLE_FOR_GROUP,
                    groupId: groupId,
                    data: {
                        devices: devices,
                        totalCount: deviceCount,
                        page,
                        perPage,
                    }
                })
            }).finally(() => {
                dispatch({ type: SET_DEVICES_ASYNC_FOR_GROUP, groupId: groupId, async: false });
            })
    }
}

export function updateDevicesTableForGroup({ groupId, data }) {
    return dispatch => {
        dispatch({
            type: UPDATE_DEVICES_TABLE_FOR_GROUP,
            groupId,
            data
        })
    }
}

export function selectDevice(device) {
    return dispatch => {
        dispatch({
            type: SELECT_DEVICE,
            device
        })
    }
}
