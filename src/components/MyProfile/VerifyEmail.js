import request, { authEndpoint, users } from "../../../service";
import { STORAGE_KEY } from "../../../utils/consts"


const neki = "https://localhost:3333/getUserDetails";
const token = window.localStorage.getItem(STORAGE_KEY);
export const getUserDetails = () => {
    return request(neki).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    })
}
export const verifyEmail = ({ email }) => {

    return request(authEndpoint + '/checkIfEmailVerified', "POST", {
        email
    }).then(res => {
        if (res && res.status === 200) {
            if (res.data.verified === "true") {
                return {
                    status: 200,
                    message: "Email already verified!"
                }
            }
        }
    });

}

export const sendVerificationEmail = ({ email }) => {
    return request(authEndpoint + '/sendVerificationEmail', "PUT", {
        email
    }).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    });


}

export const checkIfEmailExists = ({ email }) => {
    return request(authEndpoint + '/checkIfEmailExists', "POST", {
        email
    }).then(res => {
        if (res && res.status === 200) {
            if (res.data.exists === "true") {
                return {
                    status: 200,
                    message: "Email is already in use!"
                }
            }
        }
    });
}
export const changeEmailForUser = ({ email }) => {

    return request(authEndpoint + '/sendVerificationEmail/' + token, "PUT", {
        email
    }).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    });


}
