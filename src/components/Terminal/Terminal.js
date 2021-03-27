import React from "react";
import Prompt from "./components/Prompt";
import UseOnEnter from "./components/UseOnEnter";
import MapConsoleOutput from "./components/MapConsoleOutput";
import './terminal.scss'
//merge
import firebase from 'firebase/app'
import 'firebase/firestore'
import HistoryLogs from "./components/SavedLogs"

firebase.initializeApp({
    apiKey: "AIzaSyB71JM4NoSKQX57Hn8ObOCGA8tOjtHJG_Q",
    authDomain: "monitor-6194b.firebaseapp.com",
    projectId: "monitor-6194b",
    storageBucket: "monitor-6194b.appspot.com",
    messagingSenderId: "706187243221",
    appId: "1:706187243221:web:e563e287d01a93afcf3c5c"
})
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
                <HistoryLogs/>
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
