import React, {useState, useEffect, Component} from 'react';
import firebase from 'firebase/app';
import Prompt from "./Prompt";

async function retrieveDataFromFirebase(comp_name) {
    var savedLogs = [];

    console.log("-----firebase-----")
    var db = firebase.firestore();
    var collectionRef = db.collection("saved_logs")
                            .doc(comp_name)
                            .collection("commands")
                            .orderBy("createdAt")
                            .limit(100);

    return collectionRef //.where("capital", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var response = doc.data()
                    console.log(doc.id, " => ", " args:"+response.args+
                    " command_type "+response.command_type+" response "+response.response+" "+response.createdAt);
                    savedLogs.push(logsConverter.fromFirestore(doc));
                });
                return savedLogs;
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
}

class Log {
    constructor (command_type, args, response) {
        this.command_type = command_type;
        this.args = args;
        this.response = response;
    }
    toString() {
        return this.command_type + ' ' + this.args + ' \n' + this.response;
    }
}

// Firestore data converter
var logsConverter = {
    toFirestore: function(log) {
        return {
            command_type: log.command_type,
            args: log.args,
            response: log.response,
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Log(data.command_type, data.args, data.response);
    }
};

class HistoryLogs extends React.Component {
    state = {}

componentDidMount() { 
    this.renderLogs();
}

renderLogs = async() => {
    try {
        var res = await retrieveDataFromFirebase("DESKTOP-SCC")
        console.log("data "+ JSON.stringify(res, null, 4));
        // this will re render the view with new data
        this.setState({
            Logs: res.map((log) => (
                <div key={Math.random()}>
                    <Prompt/>
                    <span>{log.command_type} {log.args}</span>
                    <br/>
                    <span>{log.response}</span>
                </div>
            ))
        });
    } catch (err) {
        console.log(err);
    }
}

        
render() {    
    return (
      <div className="console-output" key={Math.random()}>
          {this.state.Logs || 'Retrieving commands from the last session...'}
      </div>
    );
  }
}

export default HistoryLogs;