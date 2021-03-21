import React from "react";
import Prompt from "./Prompt";
import UseOnEnter from "./UseOnEnter";
import MapConsoleOutput from "./MapConsoleOutput";
//import './index.css'

var counterOfSavedLogs = 0;

const Console = () => {
  
  const inputText = React.useRef();

  const [consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token] = UseOnEnter();

  counterOfSavedLogs = counter;
  
  React.useEffect(() => {
    inputText.current.value = "";
    inputText.current.focus();
  });

const logsHistory= (e)=>{
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
    switch (e.keyCode) {
                case 38:
                    if(counterOfSavedLogs!==0){
                    counterOfSavedLogs = counterOfSavedLogs-1;
                    inputText.current.value=savedLogs[counterOfSavedLogs];
                    }
                    break;
                case 40:
                  if(counterOfSavedLogs === savedLogs.length-1){
                    counterOfSavedLogs=counterOfSavedLogs+1
                    inputText.current.value="";
                  }
                  if(counterOfSavedLogs !== savedLogs.length){
                    counterOfSavedLogs = counterOfSavedLogs + 1;
                    inputText.current.value=savedLogs[counterOfSavedLogs];
                  }
                    break;
    }
}

  return (
    <section className="console">
      <MapConsoleOutput consoleOutput={consoleOutput} updateConsoleOutput={updateConsoleOutput} token={token}/>
      <div className="input-prompt">
        <Prompt />
        <input
            className="input-console"
          type="text"
          ref={inputText}
          onKeyPress={({ target: { value }, key }) => onEnter(value, key)}
          onKeyDown={logsHistory}
        />
      </div>
    </section>
  );
};

export default Console;
