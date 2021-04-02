import { SET_GROUPS, SET_GROUPS_ASYNC, SET_SEARCHED_GROUPS, SET_INPUT_EMPTY } from "./types";
import request, { groups } from "../../../service";

export const fetchAllGroups = () => {

    return dispatch => {

        dispatch({ type: SET_GROUPS_ASYNC, async: false });

        return request(groups + '/MyAssignedGroups').then(response => response.data)
            .then(r => {

                return dispatch({
                    type: SET_GROUPS,
                    groups: r.data,
                })
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

export const searchGroups = () =>{
    return dispatch =>{
        return dispatch({
            type : SET_SEARCHED_GROUPS,
        })
    }
}

export const searchGroupInput = () =>{
    return dispatch =>{
        return dispatch({
            type : SET_INPUT_EMPTY,
        })
    }
}


