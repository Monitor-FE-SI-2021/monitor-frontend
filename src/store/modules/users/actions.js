import request, { users } from '../../../service';
import {
    SET_USERS,
    SET_USERS_ASYNC,
    SELECT_USER,
    SET_USERS_PAGE,
    SET_USERS_PER_PAGE,
    SET_USERS_SORT,
    SET_USERS_SEARCH_TEXT
} from './types'

export function fetchAllUsers() {

    return (dispatch, getState) => {

        const { page, perPage, sortField, sortOrder, async, searchText} = getState().users;

        if (async) {
            return;
        }

        const queryData = {
            enable_pagination: 'true',
            page: page || 1,
            per_page: perPage || 10,
            name: searchText ?? '',
            last_name: searchText ?? '',
            email: searchText ?? '',
            sort_by: `${sortField}_${sortOrder}`
        }

        const searchParams = new URLSearchParams(queryData);

        dispatch({ type: SET_USERS_ASYNC, async: true });
        return request(`${users}/GetAllUsers?${searchParams}`).then(response => response.data)
            .then(r => {
                const { users, userCount } = r.data;

                return dispatch({
                    type: SET_USERS,
                    users,
                    totalCount: userCount
                })
            }).finally(() => {
                dispatch({ type: SET_USERS_ASYNC, async: false });
            })
    }
}

export function selectUser(user) {
    return dispatch => {
        dispatch({
            type: SELECT_USER,
            user
        })
    }
}

export function setUsersPage(page) {
    return dispatch => {
        dispatch({
            type: SET_USERS_PAGE,
            page
        })
    }
}

export function setUsersPerPage(perPage) {
    return dispatch => {
        dispatch({
            type: SET_USERS_PER_PAGE,
            perPage
        })
    }
}

export function setUsersSort({ sortField, sortOrder }) {
    return dispatch => {
        dispatch({
            type: SET_USERS_SORT,
            sortField,
            sortOrder
        })
    }
}

export function searchUsers(searchText) {
    return dispatch => {
        dispatch({
            type: SET_USERS_SEARCH_TEXT,
            searchText
        })
    }
}