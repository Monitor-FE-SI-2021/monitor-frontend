import {
    SET_DEVICES,
    SET_DEVICES_ASYNC,
    SET_DEVICES_ASYNC_FOR_GROUP,
    SET_DEVICES_FOR_GROUP,
    SELECT_DEVICE,
    UPDATE_DEVICES_TABLE_FOR_GROUP
} from "./types";
import { cloneDeep, merge } from "lodash";

const defaultDeviceTableInfo = {
    devices: [],
    async: false,
    page: 1,
    perPage: 10,
    totalCount: 10,
}

const initialState = {
    async: false,
    allDevices: [],     //  Ako zatreba slucajno...\
    deviceTables: {},   // Mapa gdje je ključ groupId a vrijednost tabela uredjaja te grupe uz dodatne informacije (paginacija, filteri i slicno)
    selectedDevice: null,
}

const getUpdatedDeviceTables = (currentTables, groupId, data) => {

    const newDeviceTables = cloneDeep(currentTables);

    if (!newDeviceTables[groupId]) {
        newDeviceTables[groupId] = cloneDeep(defaultDeviceTableInfo);
    }

    // If changing perPage, ignore page param and set it to 1
    if (data.perPage && data.perPage !== newDeviceTables[groupId].perPage) {
        data.page = 1;
    }

    newDeviceTables[groupId] = Object.assign(newDeviceTables[groupId], data);

    return newDeviceTables;
}

const ACTION_HANDLERS = {
    [SET_DEVICES]: (state, action) => {
        return {
            ...state,
            async: false,
            allDevices: action.devices
        }
    },
    [SET_DEVICES_ASYNC]: (state, action) => {
        return {
            ...state,
            async: action.async
        }
    },
    [SELECT_DEVICE]: (state, action) => {
        return {
            ...state,
            selectedDevice: action.device
        }
    },
    [UPDATE_DEVICES_TABLE_FOR_GROUP]: (state, action) => {            // Genericka akcija za updateovanje jedne tabele uredjaja ( per group )
        const { groupId, data } = action;

        console.log(data);

        const updatedDeviceTables = getUpdatedDeviceTables(state.deviceTables, groupId, data);

        console.log(updatedDeviceTables);

        return {
            ...state,
            deviceTables: updatedDeviceTables
        }
    },
    [SET_DEVICES_ASYNC_FOR_GROUP]: (state, action) => {
        const { groupId, async } = action;

        const updatedDeviceTables = getUpdatedDeviceTables(state.deviceTables, groupId, { async });

        return {
            ...state,
            deviceTables: updatedDeviceTables
        }
    },

}

export default function devices(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}