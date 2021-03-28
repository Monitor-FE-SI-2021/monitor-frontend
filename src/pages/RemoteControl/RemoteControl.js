import { connect } from "react-redux";
import React, { useState } from "react";
import "./RemoteControl.css";
import Tabs from "../../components/Tabs/Tabs";
// import "react-dropdown/style.css";
import { Route, useParams } from "react-router-dom";
import request, { devices } from "../../service";

const RemoteControl = (props, { user }) => {
  const [machines, setMachines] = React.useState([]);

  let { currentMachineName, tab } = useParams();

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
    currentMachineName == "0" || currentMachineName == undefined
      ? machines[0]
      : machines.find((value) => value.name == currentMachineName);

  for (const [index, value] of machines.entries()) {
    machineList.push(<option value={value.name}>{value.name}</option>);
  }

  return (
    <div className="page dashboard">
      <h1>IWM Remote Access/Control</h1>
      <div>
        {/* <select
          onChange={(event) => switchMachine(event.target.value)}
          value={currentMachineName}
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
