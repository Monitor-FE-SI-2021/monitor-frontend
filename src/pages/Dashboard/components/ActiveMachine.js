import React, { useState } from "react";

import Avatar from "./MachineAvatar.js";
import Terminal from "../../../components/Terminal/Terminal";
import RemoteControl from "../../RemoteControl/RemoteControl";

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
