import axios from "axios";

export const login = 'http://167.99.244.168:3333/login';
export const endpoint = 'https://si-2021.167.99.244.168.nip.io/api';
export const wsEndpoint = 'http://109.237.36.76:25565/api';
export const devices = `${endpoint}/device`
export const groups = `${endpoint}/group`

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvc29iYTVAZW1haWwuY29tIiwicm9sZUlkIjoxLCJncm91cElkIjoyLCJpYXQiOjE2MTYzNTQ1NTcsImV4cCI6MTYxNjM1NjM1N30.9cIQxEKbBho1u7ID9U0dV6ZdyR48Q2F1_CPoreIy0xM';

const request = async (
    url,
    typeOfReq = "GET",
    bodyReq = {}
) => {

    localStorage.setItem('token', testToken);

    let response = null;
    let config = {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
    };

    typeOfReq = typeOfReq.toLowerCase();

    if (typeOfReq === "get") {
        try {
            response = await axios
                .get(url, config)
                .catch(e => {
                    console.log("Request error: ", e)
                    if (e.message.includes('401')) {
                        removeAllData();
                    } else if (e.message.includes('403')) {
                        removeAllData();
                    }
                    throw e;
                });
            return response;
        } catch (error) {
            console.log("GET Error: ", error);
        }
    }

    if (typeOfReq === "post") {
        try {
            response = await axios
                .post(url, bodyReq, config)
                .catch(e => {
                    console.log("Request error: ", e)
                    if (e.message.includes('401')) {
                        removeAllData();
                    }
                });
            return response;
        } catch (error) {
            console.log("POST Error: ", error);
        }
    }

    if (typeOfReq === "put") {
        try {
            response = await axios
                .put(url, bodyReq, config)
                .catch(e => {
                    console.log("Request error: ", e)
                    if (e.message.includes('401')) {
                        removeAllData();
                    }
                });
            return response;
        } catch (error) {
            console.log("PUT Error: ", error);
        }
    }

    if (typeOfReq === "delete") {
        try {
            if (bodyReq) {
                response = await axios
                    .delete(url, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${window.localStorage.getItem("token")}`
                        },
                        data: bodyReq
                    })
                    .catch(e => {
                        console.log("Request error: ", e)
                        if (e.message.includes('401')) {
                            removeAllData();
                        }
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

    if (typeOfReq === "patch") {
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
}

export default request;
