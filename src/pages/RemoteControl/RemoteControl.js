import { connect } from "react-redux";
import React, { useState } from "react";
import "./RemoteControl.css";
import Tabs from "../../components/Tabs/Tabs";
// import "react-dropdown/style.css";
import { Route, useParams } from "react-router-dom";
import request, { devices } from "../../service";

let activeMachines = [
  {
    name: "Desktop PC 1",
    location: "Sarajevo - BBI",
    ip: "255.255.255.0",
    path: "C:/user/programfiles",
  },
  {
    name: "Desktop PC 2",
    location: "Sarajevo - BBI",
    ip: "255.255.255.0",
    path: "C:/user/programfiles",
  },
  {
    name: "Desktop",
    location: "Mostar - Mepas Mall",
    ip: "255.255.255.0",
    path: "C:/user/programfiles",
  },
];

const RemoteControl = (props, { user }) => {
  const [machines, setMachines] = React.useState([]);

  let { name, tab } = useParams();

  const groupId = user?.userGroups[0]?.groupId || 2;

  React.useEffect(() => {
    request(devices + "/AllDevicesForGroup?groupId=" + groupId)
      .then((res) => {
        setMachines(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const switchMachine = (machine) => {
    props.history.push(
      "/remotecontrol/" +
        machine +
        "/" +
        (tab == undefined ? "screenshot" : tab)
    );
  };

  const machineList = [];
  let machine =
    name == "0" || name == undefined
      ? activeMachines[0]
      : activeMachines.find((value) => value.name == name);

  // for (const [index, value] of machines.entries()) {
  //   machineList.push(<option value={value.name}>{value.name}</option>);
  // }
  return (
    <div className="page dashboard">
      <h1>IWM Remote Access/Control</h1>
      <br></br>
      <h2>{name}</h2>
      <br></br>
      <div>
        {/* <select
          onChange={(event) => switchMachine(event.target.value)}
          value={name}
        >
          {machineList}
        </select> */}
        <Tabs history={props.history} machine={machine}></Tabs>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.login.user,
  }),
  {}
)(RemoteControl);
