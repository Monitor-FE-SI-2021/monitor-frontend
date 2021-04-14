import request, { users } from '../../../service';
import {
    SET_USERS,
    SET_USERS_ASYNC
} from './types'

export function fetchAllUsers() {

    return dispatch => {
        dispatch({ type: SET_USERS_ASYNC, async: true });
        return request(users + '/All').then(response => response.data)
            .then(r => {
                console.log(r.data,'allusersdata')
                const users = r.data;

                return dispatch({
                    type: SET_USERS,
                    users: users
                })
            }).finally(() => {
                dispatch({ type: SET_USERS_ASYNC, async: false });
            })
    }
}