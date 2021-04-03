import {
    SELECT_DEVICE,
    SET_DEVICES,
    SET_DEVICES_ASYNC,
    SET_DEVICES_ASYNC_FOR_GROUP,
    UPDATE_DEVICES_TABLE_FOR_GROUP,
    SET_ACTIVE_DEVICES, SEARCH_DEVICES_ACTION
} from "./types";
import request, { devices } from "../../../service";
import { DEVICE_STATUS } from "./devices";

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

export function fetchDevicesForGroup({
                                         groupId,
                                         page = 1,
                                         perPage = 10,
                                         status = DEVICE_STATUS.ACTIVE,
                                         sortField = 'name',
                                         sortOrder = 'desc'
                                     }) {
    return (dispatch, getState) => {

        const deviceTable = getState().devices.deviceTables?.[groupId];

        if (deviceTable?.async) {
            return;
        }

        const { searchText } = getState().devices;

        const queryData = {
            page: page,
            per_page: perPage,
            name: searchText ?? '',
            status,
            groupId,
            sort_by: `${sortField}_${sortOrder}`
        }

        const searchParams = new URLSearchParams(queryData);

        dispatch({ type: SET_DEVICES_ASYNC_FOR_GROUP, groupId: groupId, async: true });

        return request(devices + `/AllDevicesForGroup?${searchParams}`).then(response => response.data)
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
                        status,
                        sortField,
                        sortOrder
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

export function setActiveGlobal(devices) {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_DEVICES,
            devices
        })
    }
}

export function searchDevicesAction(searchText) {
    return dispatch => {
        dispatch({
            type: SEARCH_DEVICES_ACTION,
            searchText
        })
    }
}