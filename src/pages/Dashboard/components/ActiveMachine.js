import React from 'react';
import Avatar from "./MachineAvatar.js";

function ActiveMachine(props) {
    return (
        <div className="card">
            <div className="card-img">
            <Avatar img={props.img} />
            </div>
            <div className="card-info">
            <h3>{props.name}</h3>
            <p>{props.location}</p>
            <p>{props.info}</p>
            </div>
        </div>
    );
}

export default ActiveMachine;