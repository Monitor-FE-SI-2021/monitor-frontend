import React from "react";
import Prompt from "./components/Prompt";
import UseOnEnter from "./components/UseOnEnter";
import MapConsoleOutput from "./components/MapConsoleOutput";
import './terminal.scss'

var counterOfSavedLogs = 0;

const Terminal = () => {

    const inputText = React.useRef();

    const [consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token] = UseOnEnter();

    counterOfSavedLogs = counter;

    React.useEffect(() => {
        inputText.current.value = "";
        inputText.current.focus();
    });

    const logsHistory = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
        switch (e.keyCode) {
            case 38:
                if (counterOfSavedLogs !== 0) {
                    counterOfSavedLogs = counterOfSavedLogs - 1;
                    inputText.current.value = savedLogs[counterOfSavedLogs];
                }
                break;
            case 40:
                if (counterOfSavedLogs === savedLogs.length - 1) {
                    counterOfSavedLogs = counterOfSavedLogs + 1
                    inputText.current.value = "";
                }
                if (counterOfSavedLogs !== savedLogs.length) {
                    counterOfSavedLogs = counterOfSavedLogs + 1;
                    inputText.current.value = savedLogs[counterOfSavedLogs];
                }
                break;
        }
    }

    return (
        <div className="page">
            <div className={'terminal'}>
                <MapConsoleOutput consoleOutput={consoleOutput} updateConsoleOutput={updateConsoleOutput} token={token}/>
                <div className="input-prompt">
                    <Prompt/>
                    <input
                        className="input-console"
                        type="text"
                        ref={inputText}
                        onKeyPress={({ target: { value }, key }) => onEnter(value, key)}
                        onKeyDown={logsHistory}
                    />
                </div>
            </div>

        </div>
    );
};

export default Terminal;
