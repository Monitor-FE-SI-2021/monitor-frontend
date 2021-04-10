import React from "react";
import Prompt from "./components/Prompt";
import UseOnEnter from "./components/UseOnEnter";
import MapConsoleOutput from "./components/MapConsoleOutput";
import "./terminal.scss";
import { connect } from "react-redux";
import { STORAGE_KEY } from "../../utils/consts";
//merge
// import firebase from "firebase/app";
// import "firebase/firestore";
import HistoryLogs from "./components/SavedLogs";
const config = require("./config");
// firebase.initializeApp({
//   apiKey: config.apiKey,
//   authDomain: config.authDomain,
//   projectId: config.projectId,
//   storageBucket: config.storageBucket,
//   messagingSenderId: config.messagingSenderId,
//   appId: config.appId,
// });
var counterOfSavedLogs = 0;

const Terminal = (props) => {
  //console.log("IP ", props);
  const inputText = React.useRef();

  const [put, setPut] = React.useState(props.machine.path);

  const [
    consoleOutput,
    savedLogs,
    counter,
    onEnter,
    updateConsoleOutput,
    token,
  ] = UseOnEnter();

  counterOfSavedLogs = counter;

  React.useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY);
    console.log("TOKEN: "+token);
    console.log("setting device_id to local storage "+props.machine.deviceId);
    console.log("setting user to local storage "+props.user)
    window.localStorage.setItem("device_id", props.machine.deviceId);
    window.localStorage.setItem("userId", props.user.userId);
    inputText.current.value = "";
    inputText.current.focus();
  });

  const logsHistory = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
    switch (e.keyCode) {
      case 38:
        if (counterOfSavedLogs !== 0) {
          counterOfSavedLogs = counterOfSavedLogs - 1;
          inputText.current.value = savedLogs[counterOfSavedLogs];
        }
        break;
      case 40:
        if (counterOfSavedLogs === savedLogs.length - 1) {
          counterOfSavedLogs = counterOfSavedLogs + 1;
          inputText.current.value = "";
        }
        if (counterOfSavedLogs !== savedLogs.length) {
          counterOfSavedLogs = counterOfSavedLogs + 1;
          inputText.current.value = savedLogs[counterOfSavedLogs];
        }
        break;
    }
  };

  return (
    <div className="page">
      <div className={"terminal"}>
        <HistoryLogs
          path={props.machine.path}
          name={props.machine.name}
          deviceId={props.machine.deviceId}
        />
        <MapConsoleOutput
          name={props.machine.name}
          location={props.machine.location}
          ip={props.machine.ip}
          id={props.machine.deviceUid}
          //path={props.machine.path}
          path={put}
          setPut={setPut}
          consoleOutput={consoleOutput}
          updateConsoleOutput={updateConsoleOutput}
          token={token}
          user={props.user}
        />
        <div className="input-prompt">
          <Prompt path={put} />
          {/* <Prompt path={put} /> */}
          <input
            className="input-console"
            type="text"
            ref={inputText}
            onKeyPress={({ target: { value }, key }) =>
              onEnter(value, key, props.machine.name, props.machine.path)
            }
            onKeyDown={logsHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
      user: state.login.user,
  }),
  {}
)(Terminal);
