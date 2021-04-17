import { SET_USERS, SET_USERS_ASYNC, SELECT_USER } from "./types"

const initialState = {
    async: false,
    users: []
}

const ACTION_HANDLERS = {
    [SET_USERS]: (state,action) =>{
        return {
            ...state,
            async: false,
            users: action.users
        }
    },
    [SET_USERS_ASYNC]: (state, action) => {
        return {
            ...state,
            async: action.async
        }
    },
    [SELECT_USER]: (state, action) => {
        return {
            ...state,
            selectedUser: action.user
        }
    }
}

export default function users(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}