import { SET_DEVICES } from "./types";
import request, { endpoint } from "../../../service";

const devices = [
    {
        name: ''
    }
];

export const fetchAllDevices = () => {

    // const devices = await request('GET', endpoint + '/devices');

    return dispatch => {
        return dispatch({
            type: SET_DEVICES,
            devices
        })
    }
}
