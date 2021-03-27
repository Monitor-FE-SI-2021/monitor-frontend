import firebase from 'firebase/app';

export default function addNewLog(log, comp_name) {
    firebase.firestore()
        .collection("saved_logs")
        .doc(comp_name)
        .collection("commands")
        .add({
                command_type: log.command_type,
                args: log.args,
                response: log.response,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
}
