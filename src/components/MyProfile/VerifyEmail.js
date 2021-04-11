import { STORAGE_KEY } from "../../utils/consts";
import request, { authEndpoint } from "../../service";
import { showSwalToast } from "../../utils/utils";
import { history } from "../../store/store";

const neki = "http://localhost:3333/getUserDetails";

export const getUserDetails = () => {
    //kad se deploya ide ruta (authEndpoint + '/getUserDetails')
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
        email: email
    };
    //kad se deploya ide ruta (authEndpoint + '/checkIfEmailVerified')
    return request("http://localhost:3333/checkIfEmailVerified", "POST",
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
    return request("http://localhost:3333/sendVerificationEmail", "PUT",
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
    //kad se deploya ide ruta (authEndpoint + '/sendVerificationEmail')
    return request("http://localhost:3333/sendVerificationEmail", "PUT",
        data
    ).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    });


}

export const verifyEmail = ({ token }) => {
    //kad se deploya ide ruta (authEndpoint + '/verifyEmail')
    return request("http://localhost:3333/verifyEmail" + "/" + token, "PUT").then(res => {
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

