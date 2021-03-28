import {
    SELECT_DEVICE,
    SET_DEVICES,
    SET_DEVICES_ASYNC,
    SET_DEVICES_ASYNC_FOR_GROUP,
    SET_DEVICES_FOR_GROUP
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

export function fetchDevicesForGroup(groupId) {

    const query = `page=1&per_page=10&name=&status=active&groupId=${groupId}&sort_by=name_desc`

    return (dispatch, getState) => {

        const deviceTable = getState().devices.deviceTables?.[groupId];

        if (deviceTable?.async) {
            return;
        }

        dispatch({ type: SET_DEVICES_ASYNC_FOR_GROUP, groupId: groupId, async: true });

        return request(devices + `/AllDevicesForGroup?${query}`).then(response => response.data)
            .then(r => {

                const devices = r.data;

                return dispatch({
                    type: SET_DEVICES_FOR_GROUP,
                    groupId: groupId,
                    devices: devices
                })
            }).finally(() => {
                dispatch({ type: SET_DEVICES_ASYNC_FOR_GROUP, groupId: groupId, async: false });
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
