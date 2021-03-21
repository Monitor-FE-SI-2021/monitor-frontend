import axios from "axios";

export const login = 'http://167.99.244.168:3333/login';
export const endpoint = 'https://si-2021.167.99.244.168.nip.io/api';
export const wsEndpoint = 'https://si-grupa5.herokuapp.com/api';
export const devices = `${endpoint}/device`
export const groups = `${endpoint}/group`

const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvc29iYTVAZW1haWwuY29tIiwicm9sZUlkIjoxLCJncm91cElkIjoyLCJpYXQiOjE2MTYzNTYzNzksImV4cCI6MTYxNjM1ODE3OX0.E5F4y0dk80L7id32RzfBsRQK3xp6fIs98wQUpD-8EPg';

const request = async (
    url,
    typeOfReq = "GET",
    bodyReq = {}
) => {

    window.localStorage.setItem('authorization', testToken);

    let response = null;
    let config = {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("authorization")
        }
    };

    typeOfReq = typeOfReq.toUpperCase();

    if (typeOfReq === "GET") {
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
}

export default request;
