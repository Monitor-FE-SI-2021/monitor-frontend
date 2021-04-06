import firebase from 'firebase/app';

export default function updateNewLog(response, comp_name) {
    firebase.firestore()
        .collection("saved_logs")
        .doc(comp_name)
        .collection("commands")
        .orderBy("createdAt", "desc")
        .limit(1).get().then((querySnapshot) => {
           var array = querySnapshot._delegate._snapshot.docs
           .keyedMap.root.key.path.segments
           var id = array[array.length-1]
           //console.log("update new "+ JSON.stringify(id, null, 4))

           firebase.firestore()
            .collection("saved_logs")
            .doc(comp_name)
            .collection("commands")
            .doc(id)
            .update({response: response});
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}