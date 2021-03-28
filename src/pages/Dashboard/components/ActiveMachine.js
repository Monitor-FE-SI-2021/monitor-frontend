import React, { useState } from "react";

import Avatar from "./MachineAvatar.js";
//import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
//import "react-tabs/style/react-tabs.css";

import SS from "../../../assets/icons/screenshot-icon.png"; // Tell webpack this JS file uses this image
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

        <div className="card-actions">
          <button
            onClick={() => {
              fun(data);
            }}
          >
            Disconnect
          </button>
        </div>
        <br></br>
        <br />

        {/* <div id="card-buttons">
                  <img
                    id="term"
                    src={SS}
                    alt="Terminal"
                    onClick={() =>
                      window.open("/remotecontrol/" + props.name + "/terminal", "_blank")
                    }
                  />

                  <img
                    id="ss"
                    src={SS}
                    alt="Screenshot"
                    onClick={() =>
                      window.open(
                        "/remotecontrol/" + props.name + "/screenshot",
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
                        "/remotecontrol/" + props.name + "/filemanager",
                        "_blank"
                      )
                    }
                  />
                </div> */}
      </div>
    </>
  );
};

export default ActiveMachine;
