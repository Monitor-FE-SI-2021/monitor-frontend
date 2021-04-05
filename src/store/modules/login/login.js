import request, { authEndpoint, forgotPassword, resetPassword, users, userSecurityQuestions, answerCheck } from "../../../service";
import { STORAGE_KEY } from "../../../utils/consts";
import { history } from "../../store";
import { showSwalToast } from "../../../utils/utils";

// Types
export const SET_USER = 'SET_USER';
export const SET_LOGIN_ASYNC = 'SET_LOGIN_ASYNC';
export const SET_USER_ASYNC = 'SET_USER_ASYNC';
export const SET_RESET_PASSWORD_ASYNC = 'SET_RESET_PASSWORD_ASYNC';
export const SET_FORGOT_PASSWORD_ASYNC = 'SET_FORGOT_PASSWORD_ASYNC';
export const SET_USER_SECURITY_QUESTIONS_ASYNC = 'SET_USER_SECURITY_QUESTIONS_ASYNC';
export const SET_USER_SECURITY_QUESTIONS = 'SET_USER_SECURITY_QUESTIONS';
export const SET_ANSWERS_ASYNC = 'SET_ANSWERS_ASYNC';
export const SET_ANSWERS= 'SET_ANSWERS';


const initialState = {
    loginAsync: false,
    userAsync: false,
    user: null,
    resetAsync: false,
    forgotPasswordAsync: false,
    userQuestionsAsync: false,
    userAnswersAsync: false,
    userQuestions: [],
    token: null,
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
    [SET_USER_SECURITY_QUESTIONS_ASYNC]: (state, action) => {
        return {
            ...state,
            userQuestionsAsync: action.async,
        }
    },
    [SET_USER_SECURITY_QUESTIONS]: (state, action) => {
        return {
            ...state,
            userQuestions: action.userQuestions,
        }
    },
    [SET_ANSWERS_ASYNC]: (state, action) => {
        return {
            ...state,
            userAnswersAsync: action.async,
        }
    },
    [SET_ANSWERS]: (state, action) => {
        return {
            ...state,
            token: action.token,
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
            } else if (res && res.status === 202) {
                
                let kod = prompt('Unesi Two Factor Authentication kod');
                localStorage.setItem(STORAGE_KEY, res.data.accessToken);

                return request(authEndpoint + '/QRcode/verify', "POST",
                    {
                        "token": kod
                    }).then(re => {
                    if (re && re.status === 200) {
                        localStorage.setItem(STORAGE_KEY, re.data.accessToken);
                        dispatch(getMe()).then(() => {
                            history.push('/')
                        });
                        return re;
                    }
                });
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
    
export function fetchAllUsersQuestions({ email }) {

    return dispatch => {
        dispatch({ type: SET_USER_SECURITY_QUESTIONS_ASYNC, async: true });

        return request(userSecurityQuestions, "POST", {email}).then(response => response.data)
            .then(r => {
                return dispatch({
                    type: SET_USER_SECURITY_QUESTIONS,
                    userQuestions: r
                })
            }).finally(() => {
                dispatch({ type: SET_USER_SECURITY_QUESTIONS_ASYNC, async: false });
            })
    }
}

export function checkAnswers({ email, answers }) {

    return dispatch => {
        dispatch({ type: SET_ANSWERS_ASYNC, async: true });

        return request(answerCheck, "POST", {email, answers}).then(response => response.data)
            .then(r => {
                if(r.correctAnswers == false) showSwalToast("Answers are not correct!");
                else showSwalToast("Verified", 'success');
                return dispatch({
                    type: SET_ANSWERS,
                    token: r.token
                })
            }).finally(() => {
                dispatch({ type: SET_ANSWERS_ASYNC, async: false });
            })
    }
}

export default function login(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}