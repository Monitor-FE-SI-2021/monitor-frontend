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
        const itemString = item.toString().split("!");

        let args = itemString[1].toString().split(" ");

        const command = args[0];

        let argumenti = [];
        if (args.length > 1) {
          argumenti.push(args[1]);
        }

        console.log(
          name +
            " " +
            location +
            " " +
            ip +
            " " +
            command +
            " " +
            argumenti +
            " " +
            config.email
        );
        fetch(wsEndpoint + "/command", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: name,
            location: location,
            ip: ip,
            command: command,
            parameters: argumenti,
            user: config.email,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            token = res.token;
            const clone = [...consoleOutput];
            clone[clone.length - 1] = res.message;
            if (clone != "" || clone != null) updateConsoleOutput(clone);
            else updateConsoleOutput("Server Response error");
            updateNewLog(clone, name);
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
              <span>{item}</span>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <Prompt path={path} />
              <span>{item || "Server Response error"}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MapConsoleOutput;
