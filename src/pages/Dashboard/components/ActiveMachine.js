import React from "react";
import Avatar from "./MachineAvatar.js";
import SS from "../../../assets/icons/screenshot-icon.png"; // Tell webpack this JS file uses this image
import FM from "../../../assets/icons/file-icon.png"; // Tell webpack this JS file uses this image

function ActiveMachine(props) {
  return (
    <div className="card">
      <div className="card-img">
        <Avatar img={props.img} />
      </div>
      <div className="card-info">
        <h3>{props.name}</h3>
        <p>{props.info}</p>
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
  );
}

export default ActiveMachine;
