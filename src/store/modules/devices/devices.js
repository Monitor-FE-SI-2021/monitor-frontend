import { SET_DEVICES, SET_DEVICES_ASYNC, SET_DEVICES_ASYNC_FOR_GROUP, SET_DEVICES_FOR_GROUP } from "./types";
import { cloneDeep } from "lodash";

const initialState = {
    async: false,
    allDevices: [],     //  Ako zatreba slucajno...\
    deviceTables: {},   // Mapa gdje je ključ groupId a vrijednost tabela uredjaja te grupe uz dodatne informacije (paginacija, filteri i slicno)
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
    [SET_DEVICES_FOR_GROUP]: (state, action) => {

        const { groupId, devices } = action;

        const newDeviceTables = cloneDeep(state.deviceTables);

        if (!newDeviceTables[groupId]) {
            newDeviceTables[groupId] = {};
        }

        newDeviceTables[groupId].devices = devices;

        return {
            ...state,
            deviceTables: newDeviceTables
        }
    },
    [SET_DEVICES_ASYNC_FOR_GROUP]: (state, action) => {
        const { groupId, async } = action;

        const newDeviceTables = cloneDeep(state.deviceTables);

        if (!newDeviceTables[groupId]) {
            newDeviceTables[groupId] = {};
        }

        newDeviceTables[groupId].async = async;

        return {
            ...state,
            deviceTables: newDeviceTables
        }
    }
}

export default function devices(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}