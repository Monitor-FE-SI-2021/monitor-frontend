// import firebase from 'firebase/app';
import request, { authEndpoint, forgotPassword, resetPassword, users, userSecurityQuestions, answerCheck } from "../../../service";

// export default function addNewLog(log, comp_name) {
//     firebase.firestore()
//         .collection("saved_logs")
//         .doc(comp_name)
//         .collection("commands")
//         .add({
//                 command_type: log.command_type,
//                 args: log.args,
//                 response: log.response,
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp()
//             })
//         .catch((error) => {
//             console.log("Error adding documents: ", error);
//         });
// }

// {
//     "UserId" : 3,
//     "DeviceId" : 15,
//     "Command" : "cd /dev/dev",
//     "Response" : "dev/dev",
//     "Time" : "2021-04-05 20:20:15.123456"
// }
// window.localStorage.setItem("command_type", args[0].toString())
//         window.localStorage.setItem("args", "")
//         window.localStorage.setItem("Poziv nije uspio", clone);

export default function addNewLog() {
    const timestamp = Date.now();
    const time = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    const endPoint = "https://si-2021.167.99.244.168.nip.io/api/user-comand-logs?"
    let niz = window.localStorage.getItem("response").replace(/,/g, '\n').split('\n\n')
    //console.log("RESPONSE ", niz[niz.length-1]);
    return request(endPoint, "POST", {
        UserId: window.localStorage.getItem("userId"),
        DeviceId: window.localStorage.getItem("device_id"),
        Command: window.localStorage.getItem("command_type") +" "+ window.localStorage.getItem("args"),
        Response: niz[niz.length-1],//window.localStorage.getItem("response").replace(",","\n"),
        Time: time.replace(/\//g, "-").replace(',', "").replace('PM', "").replace('AM', "")
    }).then(res => {
        console.log("response saved!")
    })
    // console.log("sending", JSON.stringify({
    //     UserId: window.localStorage.getItem("userId"),
    //     DeviceId: window.localStorage.getItem("device_id"),
    //     Command: window.localStorage.getItem("command_type") +" "+ window.localStorage.getItem("args"),
    //     Response: window.localStorage.getItem("response").replace(",","\n"),
    //     Time: time.replace(/\//g, "-").replace(',', "").replace('PM', "").replace('AM', "")
    // }, null, 4))
}
