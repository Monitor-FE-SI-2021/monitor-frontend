import axios from "axios";
import { STORAGE_KEY } from "../utils/consts";
import { history } from "../store/store";
import { merge } from "lodash";

export const endpoint = 'http://si-2021.167.99.244.168.nip.io/api';
export const wsEndpoint = 'http://si-grupa5.herokuapp.com/api';
export const authEndpoint = 'http://167.99.244.168:3333';
export const devices = `${endpoint}/device`
export const groups = `${endpoint}/group`
export const users = `${endpoint}/user`

const request = async (
    url = '',
    method = 'get',
    data = {},
    aditionalHeaders = {}
) => {

    let defaultConfig = {
        headers: {
            Accept: "application/json",
            // "Content-Type": 'application/json'
        }
    };

    const token = window.localStorage.getItem(STORAGE_KEY);

    if (token) {
        defaultConfig.headers.Authorization = "Bearer " + token;
    }

    const params = {
        url,
        method,
        data,
        headers: aditionalHeaders
    }

    const fullConfig = merge(defaultConfig, params);

    return new Promise((resolve, reject) => {
        return axios.request(fullConfig)
            .then(r => {
                console.log(r);
                resolve(r);
            })
            .catch(ex => {
                if (ex.status === 401) {
                    removeAllData();
                }
                reject(ex);
            })
    });
};

const removeAllData = () => {
    window.localStorage.clear();
    history.push('/login');
}

export default request;
