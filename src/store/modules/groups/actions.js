import { SET_GROUPS, SET_GROUPS_ASYNC, SEARCH_GROUPS_ACTION, SELECT_GROUP } from "./types";
import request, { groups } from "../../../service";

export const fetchAllGroupsForAdmin = () => {

    return dispatch => {

        dispatch({ type: SET_GROUPS_ASYNC, async: false });

        return request(groups + '/GetAllGroups').then(response => response.data)
            .then(r => {

                let groupTree = r.data;

                if (Array.isArray(r.data)) {        // If we got more root groups (Imtec, Genelec), transform array to object
                    groupTree = {
                        name: 'root',
                        parentGroupId: null,
                        subGroups: r.data
                    }
                }

                dispatch({
                    type: SET_GROUPS,
                    groups: groupTree,
                })

            }).finally(() => {
                dispatch({ type: SET_GROUPS_ASYNC, async: false });
            })
    }
}

export const fetchAllGroups = () => {

    return (dispatch, getState) => {

        dispatch({ type: SET_GROUPS_ASYNC, async: false });

        return request(groups + '/MyAssignedGroups').then(response => response.data)
            .then(r => {

                dispatch({
                    type: SET_GROUPS,
                    groups: r.data,
                })

                if (getState().groups.searchText) {      // Search groups again if fetching
                    dispatch({
                        type: SEARCH_GROUPS_ACTION,
                        searchText: getState().groups.searchText
                    })
                }
            }).finally(() => {
                dispatch({ type: SET_GROUPS_ASYNC, async: false });
            })
    }
}

export const setGroupsAsync = (async) => {

    return dispatch => {
        return dispatch({
            type: SET_GROUPS_ASYNC,
            async
        })
    }
}

export const searchGroupsAction = (searchText) => {
    return dispatch => {
        return dispatch({
            type: SEARCH_GROUPS_ACTION,
            searchText
        })
    }
}

export const selectGroup = (group) => {
    return dispatch => {
        return dispatch({
            type: SELECT_GROUP,
            group
        })
    }
}


