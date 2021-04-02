import React, {useState} from "react";

import Avatar from "./MachineAvatar.js";
import request, {devices} from "../../../service";

const ActiveMachine = ({data, img, fun, setCharts}) => {
    //averageCPUUsage, averageGPUUsage, averageHDDUsage, averageRamUsage
    function getStatistics() {
        request(devices + "/GetDeviceLogs?deviceId=" + data.deviceId)
            .then((res) => res.data.data)
            .then((res) => {
                console.log(res);
                setCharts(res, data);
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
