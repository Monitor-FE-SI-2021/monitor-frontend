import {
    SET_USERS,
    SET_USERS_ASYNC,
    SELECT_USER,
    SET_USERS_PAGE,
    SET_USERS_PER_PAGE,
    SET_USERS_TOTAL_COUNT,
    SET_USERS_SORT,
    SET_USERS_SEARCH_TEXT
} from "./types"

const initialState = {
    async: false,
    page: 1,
    perPage: 10,
    totalCount: 1,
    sortField: 'name',
    sortOrder: 'desc',
    searchText: '',
    users: [],
    selectedUser: null,
}

const ACTION_HANDLERS = {
    [SET_USERS]: (state, action) => {
        return {
            ...state,
            async: false,
            users: action.users,
            totalCount: action.totalCount
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
    },
    [SET_USERS_PAGE]: (state, { page }) => {
        return {
            ...state,
            page
        }
    },
    [SET_USERS_PER_PAGE]: (state, { perPage }) => {
        return {
            ...state,
            perPage,
            page: 1,        // Set page to 1 when changing perPage
        }
    },
    [SET_USERS_TOTAL_COUNT]: (state, { totalCount }) => {
        return {
            ...state,
            totalCount
        }
    },
    [SET_USERS_SORT]: (state, { sortField, sortOrder }) => {
        return {
            ...state,
            sortField,
            sortOrder
        }
    },
    [SET_USERS_SEARCH_TEXT]: (state, { searchText }) => {
        return {
            ...state,
            searchText
        }
    }
}

export default function users(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}