import React, { useState } from "react";
import NewWindow from "react-new-window";

import Avatar from "./MachineAvatar.js";
import Terminal from "../../../components/Terminal/Terminal";
import RemoteControl from "../../RemoteControl/RemoteControl";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import request, { devices } from "../../../service";
import "react-tabs/style/react-tabs.css";

const ActiveMachine = ({ data, img, fun, setCharts }) => {
  //averageCPUUsage, averageGPUUsage, averageHDDUsage, averageRamUsage
  function getStatistics() {
    request(devices + "/GetDeviceLogs?deviceId=" + data.deviceId)
      .then((res) => res.data.data)
      .then((res) => {
        console.log(res);
        setCharts(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div
        className="card"
        id={data.deviceId}
        onClick={() => getStatistics()}
        onDoubleClick={() =>
          window.open("/remotecontrol/" + data.name + "/terminal", "_blank")
        }
      >
        <div className="img-info">
          <div className="card-img">
            <Avatar img={img} />
          </div>

          <div className="card-info">
            <h3>{data.name}</h3>
            <h3>{data.location}</h3>
            <p>{new Date(data.lastTimeOnline).toGMTString()}</p>
          </div>
        </div>
        <div className="card-actions">
          <button
            onClick={() => {
              fun(data);
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </>
  );
};

export default ActiveMachine;
