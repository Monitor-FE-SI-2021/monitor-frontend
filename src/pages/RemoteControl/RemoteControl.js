import { connect } from "react-redux";
import React, { useState } from "react";
import "./RemoteControl.css";
import Tabs from "../../components/Tabs/Tabs";
// import "react-dropdown/style.css";
import { Route, useParams } from "react-router-dom";

const RemoteControl = (props) => {
  const machines = ["DESKTOP-SCC", "DESKTOP-SCC3", "DESKTOP-SCC5"];

  let { name, tab } = useParams();

  const switchMachine = (machine) => {
    props.history.push(
      "/remotecontrol/" +
        machine +
        "/" +
        (tab == undefined ? "screenshot" : tab)
    );
  };

  return (
    <div className="page dashboard">
      <h1>IWM Remote Access/Control</h1>
      <div>
        <select
          onChange={(event) => switchMachine(event.target.value)}
          value={name}
        >
          <option value="DESKTOP-SCC">DESKTOP-SCC</option>
          <option value="DESKTOP-SCC2">DESKTOP-SCC2</option>
        </select>
        <Route component={Tabs}></Route>
      </div>
    </div>
  );
};

export default connect((state) => ({}), {})(RemoteControl);
