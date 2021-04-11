import React from "react";
import Prompt from "./components/Prompt";
import "./LogsOverview.scss";
import { connect } from "react-redux";
//merge
import DropDownList from "./components/DropDownList";
import ConsoleLogs from "./components/ConsoleLogs";
import { STORAGE_KEY } from "../../utils/consts";
const config = require("./config");

const LogsOverview = (props) => {

  const token = localStorage.getItem(STORAGE_KEY);

  console.log(JSON.stringify(props.machine, null, 4));
  console.log(JSON.stringify(props.user, null, 4));

  console.log("TOKEN: "+token);

  return (
    <div className="page">
        <div>
          <h5>Device ID: {props.machine.deviceId}</h5>
        </div>
        <DropDownList deviceId={props.machine.deviceId}/>
    </div>
  );
};

export default connect(
  (state) => ({
      user: state.login.user,
  }),
  {}
)(LogsOverview);
