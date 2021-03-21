import React from "react";
import Prompt from "./Prompt";

const MapConsoleOutput =  ({ consoleOutput, updateConsoleOutput, token }) => {

  const scrollRef = React.useRef();

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

if(consoleOutput.length>1){

  let item = consoleOutput[consoleOutput.length-1].toString();

  const isCommandValid = item.includes("Valid Command!");
            if(isCommandValid ){
              const itemString = item.toString().split("!");

              const command =  itemString[1]
            
                 fetch('http://109.237.36.76:25565/api/command', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization" : "Bearer "+ token,
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
                  clone[clone.length-1] = res.message;
                  updateConsoleOutput(clone)
                })
            }
        }
        
  return (
    <div className="console-output" ref={scrollRef}>
      {consoleOutput.map((item,index,{length}) =>  {

        if(item=="Invalid Command"){
        return(
        <div key={index}>
          <span>{item}</span>
        </div>)}

        else{
          return(
            <div key={index}>
              <Prompt />
              <span>{item}</span>
            </div>
            )
        }
      })}
    </div>
  );
};

export default MapConsoleOutput;