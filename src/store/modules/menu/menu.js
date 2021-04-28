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
    secutityQuestions: '/securityQuestions',
    MyProfile: '/my-profile',
    FileManagerView: '/file-manager',
    SecurityQuestions: '/securityQuestions',
    Tasks: '/tasks',
    EditReport: '/view-report',
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
            link: RouteLink.MyProfile,
            name: 'My Profile',
            icon: ""
        },
        {
            link: RouteLink.FileManagerView,
            name: 'File Manager',
            icon: ""
        },
        {
            link: RouteLink.Tasks,
            name: "Users",
            icon: "",
        },
        {
            link: RouteLink.EditReport,
            name: "Edit Report",
            icon: "",
        },
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
