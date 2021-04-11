import request, { authEndpoint } from "../../service";

export const sendVerificationSMS = ({ phone }) => {

    const data = {
        phone: phone
    };
    //kad se deploya ide ruta (authEndpoint + '/newPhoneNumber')
    return request("http://localhost:3333/newPhoneNumber", "PUT",
        data
    ).then(res => {
        if (res && res.status === 200) {
            return res;
        }
    }).catch(
        err => {

        }
    );


}
export const regexPhoneNumber = ({ phone }) => {

    var pattern = new RegExp(/(\+387(67|66|65|64|63|62|61|60))[0-9]{3}[0-9]{3,4}/g);
    return pattern.test(phone);
}


