import { SET_GROUPS, SET_GROUPS_ASYNC, SEARCH_GROUPS_ACTION, SELECT_GROUP } from "./types";
import { flattenGroup } from "../../../components/ManageDeviceForm/ManageDeviceForm";

const initialState = {
    async: false,
    groups: {},
    searchedGroups: [],         // This is a list of all groups, no hierarchy here
    searchText: '',
    selectedGroup: null,
}

function filterGroupTree(root, searchText) {

    const allGroups = root?.subGroups ? flattenGroup(root.subGroups) : [];

    return allGroups.filter(g => g?.name?.toLowerCase().includes(searchText.toLowerCase()));
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

    [SEARCH_GROUPS_ACTION]: (state, action) => {

        const { searchText } = action;

        const searchedGroups = filterGroupTree(state.groups, searchText) || {};

        return {
            ...state,
            async: false,
            searchText,
            searchedGroups
        }
    },
    [SELECT_GROUP]: (state, action) => {
        return {
            ...state,
            selectedGroup: action.group
        }
    },
}


export default function groups(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
