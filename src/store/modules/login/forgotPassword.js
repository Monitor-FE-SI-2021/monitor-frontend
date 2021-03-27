import request, { forgotPassword } from "../../../service";

export const SET_REQUEST_ASYNC = 'SET_REQUEST_ASYNC';

const initialState = {
    requestAsync: false
}

const ACTION_HANDLERS = {
    [SET_REQUEST_ASYNC]: (state, action) => {
        return {
            ...state,
            requestAsync: action.async,
        }
    }
}

export const requestReset = ({ email }) => {
    return dispatch => {

        dispatch({
            type: SET_REQUEST_ASYNC,
            async: true
        });

        return request(forgotPassword, "PUT", {
            email
        }).then(res => {
            if (res.status === 200) {
                alert("We sent a reset link to " + email + ".");
                return res;
            } else {
                throw res;
            }
        }).finally(() => {
            return dispatch({
                type: SET_REQUEST_ASYNC,
                async: false
            })
        })
    }
}
export default function requestResetLink(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}

