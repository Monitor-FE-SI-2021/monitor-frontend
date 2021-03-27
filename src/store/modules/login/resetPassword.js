import request, { resetPassword } from "../../../service";

export const SET_RESET_ASYNC = 'SET_RESET_ASYNC';

const initialState = {
    resetAsync: false
}

const ACTION_HANDLERS = {
    [SET_RESET_ASYNC]: (state, action) => {
        return {
            ...state,
            resetAsync: action.async,
        }
    }
}

export const requestResetPassword = ({ password, token }) => {
    return dispatch => {

        dispatch({
            type: SET_RESET_ASYNC,
            async: true
        });

        return request(resetPassword + "/" + token, "PUT", {password}).then(res => {
            if (res.status === 200) {
                return res;
            } else {
                throw res;
            }
        }).finally(() => {
            return dispatch({
                type: SET_RESET_ASYNC,
                async: false
            })
        })
    }
}
export default function reset(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}

