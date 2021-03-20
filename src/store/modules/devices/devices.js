import { SET_DEVICES } from "./types";

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
    }
}


export default function devices(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}