import React from "react";
import Prompt from "./Prompt";
import request, { wsEndpoint } from "../../../service";
import addNewLog from "./SaveLogToFirebase";
import config from "../config";
//push
const MapConsoleOutput = ({
  consoleOutput,
  updateConsoleOutput,
  token,
  path,
  name,
  location,
  ip,
  id,
  setPut,
  user,
  setTabCommands,
  restartCommands,
  setRestartCommands
}) => {
  const scrollRef = React.useRef();
//merge
  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }); 

  React.useEffect(()=>{
    if (consoleOutput.length > 1) {
      //console.log( consoleOutput[consoleOutput.length-1])
      if (consoleOutput[consoleOutput.length - 1]) {
      
        let item = consoleOutput[consoleOutput.length - 1].toString();
        const isCommandValid = item.includes("Valid Command!");
        //console.log("RESTART2 ", restartCommands);
        if ((isCommandValid && restartCommands.length==0) || restartCommands.length==3) {
          let command = item.toString().split("!")[1];
          console.log("Item string ", command);
          //console.log("Path ", path)
          
          if(restartCommands.length==3){
            //console.log("STIGO BGM")
            command = restartCommands.join().replace(/,/g, ' ');
            setRestartCommands([])
            //setRestartCommands(restartCommands.pop());
            // setRestartCommands(restartCommands.pop());
            // setRestartCommands(restartCommands.pop());
            
            //console.log("Komanda ", command);
            
          }
          console.log("Komanda: ", command)
           request(wsEndpoint + "/agent/command", "POST", {
            deviceUid: id,
            command: command,
            path: path,
            user: user.email,
            })
          .then((res) => {
            setPut(res.data.path)
            //console.log("path u request", res.data.path);
            const clone = [...consoleOutput];
            let modified = res.data.message.replace(/\\n/g, "\n");
            modified = modified.replace(/\\r/g, "\r");
            console.log(modified);
            clone[clone.length - 1] = modified;
            
            if (clone != "" || clone != null) updateConsoleOutput(clone);
            //else updateConsoleOutput("Server Response error");
            if(!clone.includes("Valid Command!")){
              window.localStorage.setItem("response", clone);
              addNewLog();
            }
            //setPut(res.path)
          })
          .catch(function (e) {
            console.log(e);
            console.log("A JA NECU DA SE KRIJEM")
            const clone = [...consoleOutput];
            // updateNewLog("Poziv nije uspio", name);
            if(!clone.includes("Valid Command!")){
              window.localStorage.setItem("response", "Poziv nije uspio");
              addNewLog();
            }
            clone[clone.length - 1] = "Poziv nije uspio";
            updateConsoleOutput(clone);
          });
        }
      }
    }
  }, [consoleOutput])

  

  return (
    <div className="console-output" ref={scrollRef}>
      {consoleOutput.map((item, index, { length }) => {
        if (item == "Invalid Command") {
          return (
            <div key={index}>
              <span style={{whiteSpace: 'pre-line'}}>{item}</span>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <span style={{whiteSpace: 'pre-line'}}> 
                {item} 
              </span>
              
            </div>
          );
        }
      })}
    </div>
  );
};

export default MapConsoleOutput;
