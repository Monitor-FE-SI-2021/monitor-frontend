import { connect } from "react-redux";
import React, { useState } from "react";
import "./RemoteControl.css";
import Tabs from "../../components/Tabs/Tabs";
// import "react-dropdown/style.css";
import { Route, useParams } from "react-router-dom";
import request, { devices } from "../../service";

const RemoteControl = (props, { user }) => {
  const [machines, setMachines] = React.useState();

  let { name, tab } = useParams();

  const groupId = user?.userGroups[0]?.groupId || 2;

  if (machines == undefined) {
    request("https://si-grupa5.herokuapp.com/api/agent/online")
      .then((res) => {
        console.log("testee" + JSON.stringify(res));
        setMachines(res?.data);
      })
      .catch((error) => {
        console.log("Vazan error");
        console.log(error);
      });

    return <div className="page dashboard"></div>;
  }

  // const switchMachine = (machine) => {
  //   props.history.push(
  //     "/remotecontrol/" +
  //       machine +
  //       "/" +
  //       (tab == undefined ? "screenshot" : tab)
  //   );
  // };

  //const machineList = [];
  let machine =
    name == "0" || name == undefined
      ? machines.find((value) => value.status !== "Disconnected")
      : machines.find(
          (value) => value.name == name && value.status !== "Disconnected"
        );

  if (machine == undefined) return <div className="page dashboard"></div>;

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
