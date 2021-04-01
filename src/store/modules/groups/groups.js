import { SET_GROUPS, SET_GROUPS_ASYNC } from "./types";

const initialState = {
    async: false,
    groups: {}
}

const ACTION_HANDLERS = {
    [SET_GROUPS]: (state, action) => {
        return {
            ...state,
            async: false,
            groups: action.groups
        }
    },
    [SET_GROUPS_ASYNC]: (state, action) => {
        return {
            ...state,
            async: action.async
        }
    }
}


export default function groups(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
