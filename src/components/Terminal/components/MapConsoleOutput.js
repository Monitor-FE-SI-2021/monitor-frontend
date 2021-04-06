import React from "react";
import Prompt from "./Prompt";
import request, { wsEndpoint } from "../../../service";
import updateNewLog from "./UpdateLogInFirebase";
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
  user
}) => {
  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }); 

  if (consoleOutput.length > 1) {
    //console.log( consoleOutput[consoleOutput.length-1])
    if (consoleOutput[consoleOutput.length - 1]) {
      let item = consoleOutput[consoleOutput.length - 1].toString();

      const isCommandValid = item.includes("Valid Command!");
      if (isCommandValid) {
        const command = item.toString().split("!")[1];
        console.log("Item string ", command);
        console.log("Path ", path)

        fetch(wsEndpoint + "/agent/command", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            deviceUid: id,
            command: command,
            path: path,
            user: user.email,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            token = res.token;
            const clone = [...consoleOutput];
            let modified = res.message.replace(/\\n/g, "\n");
            modified = modified.replace(/\\r/g, "\r");
            console.log(modified);
            clone[clone.length - 1] = modified;
            setPut(res.path);
            if (clone != "" || clone != null) updateConsoleOutput(clone);
            //else updateConsoleOutput("Server Response error");
            updateNewLog(clone, name);
            //setPut(res.path)
          })
          .catch(function (e) {
            console.log(e);
            const clone = [...consoleOutput];
            updateNewLog("Poziv nije uspio", name);
            clone[clone.length - 1] = "Poziv nije uspio";
            updateConsoleOutput(clone);
          });
      }
    }
  }

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
