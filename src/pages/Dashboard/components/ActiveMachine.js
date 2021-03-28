import React, { useState } from "react";

import Avatar from "./MachineAvatar.js";
//import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
//import "react-tabs/style/react-tabs.css";

import Term from "../../../assets/icons/terminal.png"; // Tell webpack this JS file uses this image
import SS from "../../../assets/icons/screenshot-icon.png"; // Tell webpack this JS file uses this image
import Disconnect from "../../../assets/icons/disconnect.png"; // Tell webpack this JS file uses this image
import FM from "../../../assets/icons/file-icon.png"; // Tell webpack this JS file uses this image

const ActiveMachine = ({ data, img, fun, set }) => {
  return (
    <>
      <div
        className="card"
        id={data.deviceId}
        onDoubleClick={() =>
          window.open("/remotecontrol/" + data.name + "/terminal", "_blank")
        }
      >
        <div className="card-img">
          <Avatar img={img} />
        </div>

        <div className="card-info">
          <h3>{data.name}</h3>
          <h3>{data.location}</h3>
          <p>{new Date(data.lastTimeOnline).toGMTString()}</p>
        </div>

        <div className="card-buttons">
          <img
            id="disconnect"
            src={Disconnect}
            alt="Disconnect"
            className="icon"
            onClick={() => fun(data)}
          />
          <br></br>
          <br />

          {/* <img
            id="term"
            src={Term}
            className="icon"
            alt="Terminal"
            onClick={() =>
              window.open("/remotecontrol/" + data.name + "/terminal", "_blank")
            }
          />

          <img
            id="ss"
            src={SS}
            alt="Screenshot"
            onClick={() =>
              window.open(
                "/remotecontrol/" + data.name + "/screenshot",
                "_blank"
              )
            }
          />

          <img
            id="fm"
            src={FM}
            alt="File Manager"
            onClick={() =>
              window.open(
                "/remotecontrol/" + data.name + "/filemanager",
                "_blank"
              )
            }
          /> */}
        </div>
      </div>
    </>
  );
};

export default ActiveMachine;
