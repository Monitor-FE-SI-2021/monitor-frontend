import { SET_GROUPS, SET_GROUPS_ASYNC, SET_SEARCHED_GROUPS, SET_INPUT_EMPTY } from "./types";

const initialState = {
    async: false,
    groups: {},
    searchedGroups : {},
    inputEmpty : ''
}

const ACTION_HANDLERS = {
    [SET_GROUPS]: (state, action) => {
        return {
            ...state,
            async: false,
            groups: action.groups,
        }
    },
    [SET_GROUPS_ASYNC]: (state, action) => {
        return {
            ...state,
            async: action.async
        }
    },
    [SET_SEARCHED_GROUPS] : (state,action) => {
        return {
            ...state,
            async: false,
            searchedGroups:action.groups
        }
    },

    [SET_INPUT_EMPTY] : (state,action) =>{
        return{
            ...state,
            async: false,
            inputEmpty : action.inputEmpty
        }
    }
}


export default function groups(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}