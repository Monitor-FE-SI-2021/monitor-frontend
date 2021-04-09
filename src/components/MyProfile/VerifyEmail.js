import { STORAGE_KEY } from "../../utils/consts";
import request, { authEndpoint } from "../../service";
import { showSwalToast } from "../../utils/utils";
const neki = "http://localhost:3333/getUserDetails";

export const getUserDetails = () => {
    return request(neki).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    }).catch(error => {
        console.log(error)
    })
}
export const checkIfEmailVerified = ({ email }) => {

    const data = {
        email: email.email
    };

    return request("http://localhost:3333/checkIfEmailVerified", "POST",
        data
    ).then(res => {

        if (res && res.status === 200) {
            if (res.data.verified === "true") {
                return {
                    status: 200,
                    message: "Email already verified!"
                }
            }
        }
    }).catch(error => {
        console.log(error)
    })

}

export const sendVerificationEmail = ({ email }) => {

    const data = {
        email: email.email
    };
    return request("http://localhost:3333/sendVerificationEmail", "PUT",
        data
    ).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    });


}

export const checkIfEmailExists = ({ email }) => {
    const data = {
        email: email.email
    };

    return request("http://localhost:3333/checkIfEmailExists", "POST",
        data
    ).then(res => {
        console.log(res)
        if (res && res.status === 200) {
            return res.data.exists
        }
    });
}
export const changeEmailForUser = ({ email }) => {

    const data = {
        email: email.email
    };

    return request("http://localhost:3333/sendVerificationEmail", "PUT",
        data
    ).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    });


}

export const verifyEmail = ({ token }) => {
    return request("http://localhost:3333/verifyEmail"  + "/" + token, "PUT").then(res => {
        showSwalToast(res);
        if (res && res.status === 200) {
            return res;
        }
    });


}
export const regexEmail = ({ email }) => {
    console.log(email);
    var pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return pattern.test(email);
}

