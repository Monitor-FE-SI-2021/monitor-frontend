import axios from "axios";
import { STORAGE_KEY } from "../utils/consts";
import { history } from "../store/store";

export const endpoint = 'http://si-2021.167.99.244.168.nip.io/api';
export const wsEndpoint = 'http://si-grupa5.herokuapp.com/api';
export const authEndpoint = 'https://si-2021.167.99.244.168.nip.io:3333';
export const devices = `${endpoint}/device`
export const groups = `${endpoint}/group`
export const users = `${endpoint}/user`

const request = async (
    url,
    typeOfReq = "GET",
    bodyReq = {}
) => {

    let response = null;
    let config = {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem(STORAGE_KEY),
            Accept: "application/json",
            // "Content-Type": 'application/json'
        }
    };

    typeOfReq = typeOfReq.toUpperCase();

    if (typeOfReq === "GET") {
        try {
            response = await axios
                .get(url, config)
                .catch(e => {
                    if (e.message.includes('401')) {
                        removeAllData();
                    }
                    return response;
                });
            return response;
        } catch (error) {
            console.log("GET Error: ", error);
        }
    }

    if (typeOfReq === "POST") {
        try {
            response = await axios
                .post(url, bodyReq, config)
                .catch(e => {
                    console.log("Request error: ", e)
                    if (e.message.includes('401')) {
                        removeAllData();
                    }
                    return response;
                });
            return response;
        } catch (error) {
            console.log("POST Error: ", error);
        }
    }

    if (typeOfReq === "PUT") {
        try {
            response = await axios
                .put(url, bodyReq, config)
                .catch(e => {
                    console.log("Request error: ", e)
                    if (e.message.includes('401')) {
                        removeAllData();
                    }
                    return response;
                });
            return response;
        } catch (error) {
            console.log("PUT Error: ", error);
        }
    }

    if (typeOfReq === "DELETE") {
        try {
            if (bodyReq) {
                response = await axios
                    .delete(url, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: window.localStorage.getItem("authorization")
                        },
                        data: bodyReq
                    })
                    .catch(e => {
                        console.log("Request error: ", e)
                        if (e.message.includes('401')) {
                            removeAllData();
                        }
                        return response;
                    });
                return response;
            } else {
                response = await axios
                    .delete(url, config)
                    .catch(e => {
                        console.log("Request error: ", e)
                        if (e.message.includes('401')) {
                            removeAllData();
                        }
                    });
                return response;
            }
        } catch (error) {
            console.log("DELETE Error: ", error);
        }
    }

    if (typeOfReq === "PATCH") {
        try {
            response = await axios
                .patch(url, bodyReq, config)
                .catch(e => {
                    console.log("Request error: ", e)
                    if (e.message.includes('401')) {
                        removeAllData();
                    }
                });
            return response;
        } catch (error) {
            console.log("PATCH Error: ", error);
        }
    }
};

const removeAllData = () => {
    window.localStorage.clear();
    history.push('/login');
}

export default request;
