import React, {useState, useEffect, Component} from 'react';
import firebase from 'firebase/app';
import Prompt from "./Prompt";
import request, { authEndpoint, forgotPassword, resetPassword, users, userSecurityQuestions, answerCheck } from "../../../service";

const endpoint = 'https://si-2021.167.99.244.168.nip.io/api';
const getLogs = `${endpoint}/user/GetAllUsers`;

async function retrieveLogsFromDatabase(deviceId) {
    var logs = [];
    //console.log("device id: "+deviceId)
  
    var url = `${endpoint}/user-command-logs/CommandLogsForDevice?deviceId=${deviceId}`
  
    return request(url)
            .then(r => {
                if (r.status === 200) {
                    r.data.data.forEach((log) => {
                      logs.push({user_id: log.userId, command: log.command, response: log.response.split(/\r?\n/), date_time: log.time})
                    });
                    return logs;
                }
            });

}

var style = {
    whiteSpace: 'pre-wrap'
};

class HistoryLogs extends React.Component {
    state = {}

componentDidMount() { 
    this.renderLogs();
}

renderLogs = async() => {
    try {
        var res = await retrieveLogsFromDatabase(this.props.deviceId)
        // console.log("data "+ JSON.stringify(res, null, 4));
        // this will re render the view with new data
        this.setState({
            Logs: res.map((log) => (
                <div key={Math.random()}>
                    <Prompt path={this.props.path}/>
                    <span>{log.command}</span>
                    <br/>
                    {/* <p style={style}>{log.response}</p> */}
                    <span>{log.response.map((line) => (
                        <p style={style} key={Math.random()}>{line}</p>
                    ))}</span>
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