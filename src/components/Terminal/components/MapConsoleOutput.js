import React from "react";
import Prompt from "./Prompt";
import request, { wsEndpoint } from "../../../service";
import updateNewLog from "./UpdateLogInFirebase";

const MapConsoleOutput = ({ consoleOutput, updateConsoleOutput, token }) => {

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

                const command = itemString[1]

                fetch(wsEndpoint + '/command', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token,
                    },
                    body: JSON.stringify({
                        "name": "DESKTOP-SCC",
                        "keepAlive": 5,
                        "location": "Sarajevo - SCC",
                        command: command
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        token = res.token;
                        const clone = [...consoleOutput]
                        clone[clone.length - 1] = res.message;
                        updateConsoleOutput(clone)
                        updateNewLog(clone)
                    }).catch(function (e) {
                    console.log(e)
                    const clone = [...consoleOutput]
                    updateNewLog("Poziv nije uspio", "DESKTOP-SCC")
                    clone[clone.length - 1] = "Poziv nije uspio";
                    updateConsoleOutput(clone)
                })
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
                        </div>)
                } else {
                    return (
                        <div key={index}>
                            <Prompt/>
                            <span>{item}</span>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default MapConsoleOutput;