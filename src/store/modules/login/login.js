import request, { authEndpoint, forgotPassword, resetPassword, users } from "../../../service";
import { STORAGE_KEY } from "../../../utils/consts";
import { history } from "../../store";
import { showSwalToast } from "../../../utils/utils";

// Types
export const SET_USER = 'SET_USER';
export const SET_LOGIN_ASYNC = 'SET_LOGIN_ASYNC';
export const SET_USER_ASYNC = 'SET_USER_ASYNC';
export const SET_RESET_PASSWORD_ASYNC = 'SET_RESET_PASSWORD_ASYNC';
export const SET_FORGOT_PASSWORD_ASYNC = 'SET_FORGOT_PASSWORD_ASYNC';


const initialState = {
    loginAsync: false,
    userAsync: false,
    user: null,
    resetAsync: false,
    forgotPasswordAsync: false,
}

const ACTION_HANDLERS = {
    [SET_USER_ASYNC]: (state, action) => {
        return {
            ...state,
            userAsync: action.async,
        }
    },
    [SET_LOGIN_ASYNC]: (state, action) => {
        return {
            ...state,
            loginAsync: action.async,
        }
    },
    [SET_USER]: (state, action) => {
        return {
            ...state,
            user: action.user,
        }
    },
    [SET_RESET_PASSWORD_ASYNC]: (state, action) => {
        return {
            ...state,
            resetAsync: action.async,
        }
    },
    [SET_FORGOT_PASSWORD_ASYNC]: (state, action) => {
        return {
            ...state,
            forgotPasswordAsync: action.async,
        }
    },
}

export const doLogin = ({ email, password }) => {
    return dispatch => {

        dispatch({
            type: SET_LOGIN_ASYNC,
            async: true
        });

        return request(authEndpoint + '/login', "POST", {
            email,
            password
        }).then(res => {
            if (res && res.status === 200) {
                localStorage.setItem(STORAGE_KEY, res.data.accessToken);

                dispatch(getMe()).then(() => {
                    history.push('/')
                });

                return res;
            }
        }).finally(() => {
            return dispatch({
                type: SET_LOGIN_ASYNC,
                async: false
            })
        })
    }
}

export const getMe = () => {

    return dispatch => {

        dispatch({
            type: SET_LOGIN_ASYNC,
            async: true
        });

        return request(users + '/MeExtendedInfo')
            .then(r => {
                if (r.status === 200) {
                    dispatch({
                        type: SET_USER,
                        user: r.data.data,
                    })
                }
            }).finally(() => {
                return dispatch({
                    type: SET_LOGIN_ASYNC,
                    async: false
                })
            })
    }
}

export const requestResetPassword = ({ password, token }) => {
    return dispatch => {

        dispatch({
            type: SET_RESET_PASSWORD_ASYNC,
            async: true
        });

        return request(resetPassword + "/" + token, "PUT", { password }).then(res => {
            if (res.status === 200) {
                return res;
            } else {
                throw res;
            }
        }).finally(() => {
            return dispatch({
                type: SET_RESET_PASSWORD_ASYNC,
                async: false
            })
        })
    }
}

export const requestForgotPassword = ({ email }) => {
    return dispatch => {

        console.log(email);

        dispatch({
            type: SET_FORGOT_PASSWORD_ASYNC,
            async: true
        });

        return request(forgotPassword, "PUT", {
            email
        }).then(res => {
            if (res.status === 200) {
                showSwalToast("We sent a reset link to " + email + ".", 'success');
                return res;
            } else {
                throw res;
            }
        }).finally(() => {
            return dispatch({
                type: SET_FORGOT_PASSWORD_ASYNC,
                async: false
            })
        })
    }
}

export default function login(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}