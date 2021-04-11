import React from "react";
import addNewLog from "./SaveLogToFirebase";

var token;

const config = require('../config');
const commands = {
  cd: 1,
  clear: 0,
  echo: 1,
  erase: 1,
  kill: 1,
  ls: 0,
  move: 1,
  rd: 1,
  set: 1,
  '?' : 0,
  mkdir: 1,
  ipconfig: 0,
  driverquery: 0,
  systeminfo: 0,
  tasklist: 0,
  dir: 0,
  ping: 1
};

const UseOnEnter = () => {

    

  const [consoleOutput, updateConsoleOutput] = React.useState([]);
  const [savedLogs, setSavedLogs] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const onEnter = async (value, key, name, path) => {
    
    if (key === "Enter") {
      //console.log("Proba")
  
    
      let newInput = value;
      
      if(value==="")
      return updateConsoleOutput(consoleOutput => consoleOutput.concat(""))
      
      setSavedLogs(savedLogs => savedLogs.concat(newInput))
      let newInput2 = newInput.replace(/ +/g, ' ').trim();
      newInput=path.concat("> ").concat(value)
      updateConsoleOutput(consoleOutput => consoleOutput.concat(newInput))
      
      console.log(newInput2)
      let args = newInput2.split(" ");

      const argument = String(commands[args[0]]);

      const newConsoleLine = String(commands[args[0]]) || "Invalid Command";
      //newInput2 = "\""+newInput2 + "\""
      console.log("Input ", newConsoleLine)
      
      if(newConsoleLine==="Invalid Command"){
      return updateConsoleOutput(consoleOutput =>
        consoleOutput.concat("Invalid Command"), setCounter(brojac=>brojac+1)
      )}
        //console.log("Name ", name)
      if(args.length>1){
        // addNewLog({
        //   command_type: args[0].toString(),
        //   args: args[1].toString(),
        //   response: ""
        // }, name)
        window.localStorage.setItem("command_type", args[0].toString())
        window.localStorage.setItem("args", args[1].toString())
        return updateConsoleOutput(consoleOutput => consoleOutput.concat("Valid Command!" + args[0].toString() + " " + args[1].toString() + "!")),setCounter(counter=>counter+1); 
      }
      else {
        // addNewLog({
        //   command_type: args[0].toString(),
        //   args: "",
        //   response: ""
        // }, name)
        window.localStorage.setItem("command_type", args[0].toString())
        window.localStorage.setItem("args", "")
        return updateConsoleOutput(consoleOutput => consoleOutput.concat("Valid Command!" + args[0].toString() + "!")),setCounter(counter=>counter+1); 
      }
    }
  };

  return [consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token];
};

export default UseOnEnter;