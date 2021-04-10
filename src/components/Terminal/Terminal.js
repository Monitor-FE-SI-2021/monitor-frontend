import React from "react";
import Prompt from "./components/Prompt";
import UseOnEnter from "./components/UseOnEnter";
import MapConsoleOutput from "./components/MapConsoleOutput";
import "./terminal.scss";
import { connect } from "react-redux";
import request, { wsEndpoint } from "../../service";
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
var counterOfTabCommands = -1;


const Terminal = (props) => {
  //console.log("IP ", props);
  const inputText = React.useRef();

  const [put, setPut] = React.useState(props.machine.path);
  const [tabCommands, setTabCommands] = React.useState([]);

    React.useEffect(()=>{
      request(wsEndpoint + "/agent/command", "POST", {
      deviceUid: props.machine.deviceUid,
      command: "ls",
      path: put,
      user: props.user.email,
      })
    .then((res) => {
      let modified = res.data.message.replace(/\\n/g, "\n");
      modified = modified.replace(/\\r/g, "\r");
      let novaLista = modified.split("\n");
      let pomocnaLista = [];
      if(modified!==" "){
      novaLista.splice(0,7);
      novaLista = novaLista.map((item, index) => {
        item = item.replace(/ +/g, ' ').trim(); //pretvara vise razmaka u jedan
        // item = item.replace("AM", "")
        // item = item.replace("PM", "")
        let ima = false;
        if(item.match(/\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))/)){
          ima = true;
          console.log("USO")
        }
        item = item.split(" "); //splita po razmacima
        
        if(item[0].includes("d")){
          if(ima)
            item.splice(0,4);
          else
            item.splice(0,3); //   
          pomocnaLista.push(item.toString().replace(/[, ]+/g, " ").trim());
        }
      })

   /*   novaLista[5] = novaLista[5].replace(/ +/g, ' ').trim(); //pretvara vise razmaka u jedan
      novaLista[5] = novaLista[5].split(" "); //splita po razmacima
      novaLista[5].splice(0,3); // 
      console.log(novaLista[5].toString().replace(/[, ]+/g, " ").trim());*/

      //pomocnaLista.splice(pomocnaLista.length-3,pomocnaLista.length-1);
      console.log("Pomocna lista: \n" + pomocnaLista);

      setTabCommands(pomocnaLista)  
    }
    })
    .catch(function (e) {
      console.log(e)
    })
    }, [put])

  const [
    consoleOutput,
    savedLogs,
    counter,
    onEnter,
    updateConsoleOutput,
    token,
  ] = UseOnEnter();

  counterOfSavedLogs = counter;
  //pravljenje novog brancha
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

  React.useEffect(() => {
    inputText.current.focus();
  }, [inputText]);

  const logsHistory = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") e.preventDefault();
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
      case 9:
        if(inputText.current.value.includes("cd ") && tabCommands.length > 0){
          counterOfTabCommands++;
          if(counterOfTabCommands === tabCommands.length) counterOfTabCommands=0;
          inputText.current.value = "cd " + tabCommands[counterOfTabCommands];
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
          path={put}
          setPut={setPut}
          consoleOutput={consoleOutput}
          updateConsoleOutput={updateConsoleOutput}
          token={token}
          user={props.user}
          setTabCommands = {setTabCommands}
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
