import { SET_DEVICES, SET_DEVICES_ASYNC } from "./types";

const initialState = {
    async: false,
    devices: []
}

const ACTION_HANDLERS = {
    [SET_DEVICES]: (state, action) => {
        return {
            ...state,
            async: false,
            devices: action.devices
        }
    },
    [SET_DEVICES_ASYNC]: (state, action) => {
        return {
            ...state,
            async: action.async
        }
    }
}

export default function devices(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}