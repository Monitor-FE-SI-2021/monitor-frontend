export const SET_MENU_EXPANDED = 'SET_MENU_EXPANDED';

export const RouteLink = {
    Dashboard: '/',
    Login: "/login",
    Devices: "/devices",
    Reporting: "/reporting",
    Test: '/test',
    AddDevice: '/manage-device',
    Terminal: '/terminal'
}

const initialState = {
    isMenuExpanded: true,
    items: [
        {
            link: RouteLink.Dashboard,
            name: "Dashboard",
            icon: "",
        },
        {
            link: RouteLink.Devices,
            name: "Mašine",
            icon: "",
        },
        {
            link: RouteLink.Reporting,
            name: "Reporting",
            icon: "",
        },
        {
            link: RouteLink.Test,
            name: "Test ruta",
            icon: "",
        },
    ],
}

const ACTION_HANDLERS = {
    [SET_MENU_EXPANDED]: (state, action) => {
        return {
            ...state,
            isMenuExpanded: action.toggle,
        }
    }
}

export const setMenuExpanded = (toggle) => {
    return dispatch => {
        dispatch({
            type: SET_MENU_EXPANDED,
            toggle
        })
    }
}

export default function menu(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}