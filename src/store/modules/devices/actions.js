import { SET_DEVICES, SET_DEVICES_ASYNC } from "./types";
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

    return dispatch => {
        dispatch({ type: SET_DEVICES_ASYNC, async: true });
        return request(devices + `/AllDevicesForGroup?groupId=${groupId}`).then(response => response.data)
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
