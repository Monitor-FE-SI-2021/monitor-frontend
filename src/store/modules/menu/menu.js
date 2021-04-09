export const SET_MENU_EXPANDED = 'SET_MENU_EXPANDED';

export const RouteLink = {
    Dashboard: '/',
    Login: "/login",
    Devices: "/devices",
    Reporting: "/reporting",
    ReportList: "/report-list",
    AddDevice: '/manage-device',
    ManageDevice: '/manage-device',
    ManageGroup: '/manage-group',
    EmailVerification: '/verify-email',
    Terminal: '/terminal',
    RemoteControl: '/remotecontrol',
    TwoFactorAuthentication: '/security',
    secutityQuestions : '/securityQuestions',
    MyProfile:'/my-profile'
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
            link: RouteLink.ReportList,
            name: "Reporting",
            icon: "",
        },
        {
            link: RouteLink.TwoFactorAuthentication,
            name: 'Two Factor Authentication',
            icon: ""
        },
         {
             link: RouteLink.secutityQuestions,
             name: 'Security Questions',
             icon: ""
         },
        {
            link: RouteLink.MyProfile,
            name: 'My profile',
            icon: ""
        }
    ],
};

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
