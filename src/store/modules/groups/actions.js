import { SET_GROUPS, SET_GROUPS_ASYNC } from "./types";
import request, { endpoint } from "../../../service";

const groups = [
    {
        groupId: 1,
        name: "Grupa 1",
        parentGroup: null,
    },
    {
        groupId: 2,
        name: "Grupa 2",
        parentGroup: 1,
    },
    {
        groupId: 3,
        name: "Grupa 3",
        parentGroup: null,
    },
    {
        groupId: 4,
        name: "Grupa 4",
        parentGroup: 2
    },
    {
        groupId: 5,
        name: "Grupa 5",
        parentGroup: 3
    }
];

export const fetchAllGroups = () => {

    // const groups = await request('GET', endpoint + '/groups');

    return dispatch => {
        return dispatch({
            type: SET_GROUPS,
            groups
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
