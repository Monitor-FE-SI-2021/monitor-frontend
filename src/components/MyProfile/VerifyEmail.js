import request, { authEndpoint } from "../../service";
import { showSwalToast } from "../../utils/utils";
import { history } from "../../store/store";

export const getUserDetails = () => {
    //kad se deploya ide ruta (authEndpoint + '/getUserDetails')
    return request(authEndpoint + "/getUserDetails").then(res => {
        if (res && res.status === 200) {
            return res;
        }
    }).catch(error => {
        console.log(error)
    })
}
export const checkIfEmailVerified = ({ email }) => {

    const data = {
        email: email
    };
    //kad se deploya ide ruta (authEndpoint + '/checkIfEmailVerified')
    return request(authEndpoint + "/checkIfEmailVerified", "POST",
        data
    ).then(res => {

        if (res && res.status === 200) {
            if (res.data.verified === true) {
                return {
                    status: 200,
                    message: "Email already verified!"
                }
            } else {
                return res;
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
    //kad se deploya ide ruta (authEndpoint + '/sendVerificationEmail')
    return request(authEndpoint + "/sendVerificationEmail", "PUT",
        data
    ).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    }).catch(
        err => {
            console.log('c');
        }
    );


}

export const checkIfEmailExists = ({ email }) => {
    const data = {
        email: email.email
    };
    //kad se deploya ide ruta (authEndpoint + '/checkIfEmailExists')
    return request(authEndpoint + "/checkIfEmailExists", "POST",
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
    //kad se deploya ide ruta (authEndpoint + '/sendVerificationEmail')
    return request(authEndpoint + "/sendVerificationEmail", "PUT",
        data
    ).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    });


}

export const verifyEmail = ({ token }) => {
    //kad se deploya ide ruta (authEndpoint + '/verifyEmail')
    return request(authEndpoint + "/verifyEmail" + "/" + token, "PUT").then(res => {
        if (res && res.status === 200) {
            showSwalToast('Email successfully verified!', 'success');
            setTimeout(() => {
                history.push('/my-profile')
            }, 2000)
            return res;
        }
    });

}

export const regexEmail = ({ email }) => {
    console.log(email);
    var pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    return pattern.test(email);
}

