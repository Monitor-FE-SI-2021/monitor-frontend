import { SET_DEVICES } from "./types";
import request, { endpoint } from "../../../service";

let devicesData = [
    {
        deviceId: 1,
        name: "Uredjaj 1",
        location: 'Sarajevo',
        locationLongitude: 44.13,
        locationLatitude: 18.2,
        status: true,
        lastTimeOnline: Date.now(),
        groupId: 1
    },
    {
        deviceId: 2,
        name: "Uredjaj 2",
        location: 'Sarajevo',
        locationLongitude: 44.13,
        locationLatitude: 18.2,
        status: true,
        lastTimeOnline: Date.now(),
        groupId: 2
    },
    {
        deviceId: 3,
        name: "Uredjaj 3",
        location: 'Sarajevo',
        locationLongitude: 44.13,
        locationLatitude: 18.2,
        status: true,
        lastTimeOnline: Date.now(),
        groupId: 4
    },
    {
        deviceId: 4,
        name: "Uredjaj 4",
        location: 'Mostar',
        locationLongitude: 44.13,
        locationLatitude: 18.2,
        status: true,
        lastTimeOnline: Date.now(),
        groupId: 3
    },
]

export const fetchAllDevices = () => {

    // const groups = await request('GET', endpoint + '/groups');

    return dispatch => {
        return dispatch({
            type: SET_DEVICES,
            devices: devicesData
        })
    }
}
