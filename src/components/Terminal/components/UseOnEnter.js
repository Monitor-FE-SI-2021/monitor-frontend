import React from "react";
import addNewLog from "./SaveLogToFirebase";

var token;

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
  '?' : 0
};

const UseOnEnter = () => {

    

  const [consoleOutput, updateConsoleOutput] = React.useState([]);
  const [savedLogs, setSavedLogs] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const onEnter = async (value, key) => {
    
    if (key === "Enter") {
      //console.log("Proba")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'whoso@whoso.com', password:  'sifra123'})
  };

  try {
      var response = await fetch('http://167.99.244.168:3333/login', requestOptions);
     //console.log(response.status)
      
      //console.log(x);
      if(response.status == 200)
      {
          var x = await response.json();
          //console.log(JSON.stringify(x.accessToken));
          token = x.accessToken
      }
      else{
        //console.log("Error");
      }
  }catch(e){
    
  }
  
    
      const newInput = value;

      if(value==="")
      return updateConsoleOutput(consoleOutput => consoleOutput.concat(""))
        
      setSavedLogs(savedLogs => savedLogs.concat(newInput))
        
      updateConsoleOutput(consoleOutput => consoleOutput.concat(newInput))
        
      let args = value.split(" ");

      const argument = String(commands[args[0]]);

      const newConsoleLine = String(commands[args[0]]) || "Invalid Command";
      
      if(newConsoleLine==="Invalid Command" || args.length-1!==parseInt(argument)){
      return updateConsoleOutput(consoleOutput =>
        consoleOutput.concat("Invalid Command"), setCounter(brojac=>brojac+1)
      )}

      if(args.length>1){
        addNewLog({
          command_type: args[0].toString(),
          args: args[1].toString(),
          response: ""
        }, "DESKTOP-SCC")
        return updateConsoleOutput(consoleOutput => consoleOutput.concat("Valid Command!" + args[0].toString() + " " + args[1].toString() + "!")),setCounter(counter=>counter+1); 
      }
      else {
        addNewLog({
          command_type: args[0].toString(),
          args: "",
          response: ""
        }, "DESKTOP-SCC")
        return updateConsoleOutput(consoleOutput => consoleOutput.concat("Valid Command!" + args[0].toString() + "!")),setCounter(counter=>counter+1); 
      }
    }
  };

  return [consoleOutput, savedLogs, counter, onEnter, updateConsoleOutput, token];
};

export default UseOnEnter;