import React, { useRef, useState } from "react";
import debounce from 'lodash/debounce';

import NewWindow from '../../../components/NewWindow/NewWindow';
import RemoteAccess from '../../RemoteAccess/RemoteAccess.js';
import Avatar from "./MachineAvatar.js";
import { showSwalToast } from "../../../utils/utils";


import './ActiveMachine.scss';

const ActiveMachine = ({data, img, onDisconnect, getStatistics, sDate, eDate, user, getConfiguration}) => {
    const [remoteAccessOpen, setRemoteAccessOpen] = useState(false);
    const [configurationOpen, setConfigurationOpen] = useState(false)
    const popup = useRef();

    const handleOnClick = debounce(
        () => getStatistics(data, sDate, eDate),
        300
    );
    
    return (
        <>
            <div
                className="card"
                id={data.deviceId}
                onClick={handleOnClick}
                
                onDoubleClick={() => {
                    if (user.email !== data.user) {
                        showSwalToast("Device already in use.")
                        return
                    }
                    remoteAccessOpen ? popup.current.focus() : setRemoteAccessOpen(true)
                }}
            >
                <div className="img-info">
                    <div className="card-img">
                        <Avatar img={img}/>
                    </div>

                    <div className="card-info">
                        <h3>{data.name}</h3>
                        <h3>{data.location}</h3>
                        <p>{new Date(data.lastTimeOnline).toLocaleString()}</p>
                    </div>
                </div>
                <div className="card-actions">
                    <button id="configuration"
                        onClick={() => {
                            configurationOpen ? popup.current.focus() : setConfigurationOpen(true)
                            getConfiguration(data)
                        }}
                    >
                        Configuration
                    </button>
                    <button id="disconnect"
                        onClick={() => {
                            onDisconnect(data);
                            setRemoteAccessOpen(false);
                        }}
                    >
                        Disconnect
                    </button>
                </div>
            </div>

            { remoteAccessOpen && (
                <NewWindow
                    onClose={() => setRemoteAccessOpen(false)}
                    title={`Remote Access - ${data.name} (${data.location})`}
                    ref={popup}
                >
                    <RemoteAccess machine={data} />
                </NewWindow>
            ) }

            {
                configurationOpen && (
                    <NewWindow
                        onClose={() => setConfigurationOpen(false)}
                        title={`Configuration - ${data.name} (${data.location})`}
                        ref={popup}
                    >
                        <div>
                            <h3>CPU</h3>
                            <p>podaci vezani za cpu</p>
                        </div>
                    </NewWindow>
                )
            }
        </>
    );
};

export default ActiveMachine;