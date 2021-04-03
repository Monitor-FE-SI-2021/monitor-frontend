import React, {useState} from "react";
import Avatar from "./MachineAvatar.js";

const ActiveMachine = ({data, img, fun, getStatistics}) => {

    return (
        <>
            <div
                className="card"
                id={data.deviceId}
                onClick={() => getStatistics(data)}
                onDoubleClick={() =>
                    window.open("/remotecontrol/" + data.name + "/terminal", "_blank")
                }
            >
                <div className="img-info">
                    <div className="card-img">
                        <Avatar img={img}/>
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
