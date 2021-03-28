import React, { useState } from 'react';
import NewWindow from 'react-new-window';

import Avatar from './MachineAvatar.js';
import Terminal from '../../../components/Terminal/Terminal';
import RemoteControl from '../../RemoteControl/RemoteControl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import request, {devices} from "../../../service";
import 'react-tabs/style/react-tabs.css';

const ActiveMachine = ({ data, img, fun, setCharts }) => {
    const [terminalOpen, setTerminalOpen] = useState(false);
    //averageCPUUsage, averageGPUUsage, averageHDDUsage, averageRamUsage
    function getStatistics() {
        request(devices + "/GetDeviceLogs?deviceId=" + data.deviceId)
            .then((res) => res.data.data)
            .then((res) => {
                console.log(res)
                setCharts(res)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className='card' id={data.deviceId} onClick={() => getStatistics()} onDoubleClick={() => setTerminalOpen(true)}>
                <div className='card-img'>
                    <Avatar img={img} />
                </div>

                <div className='card-info'>
                    <h3>{ data.name }</h3>
                    <h3>{ data.location }</h3>
                    <p>{ new Date(data.lastTimeOnline).toGMTString() }</p>
                </div>

                <div className='card-actions'>
                    <button onClick={() => {
                        fun(data)
                    }}>Disconnect</button>
                </div>
            </div>

            { terminalOpen && (
                <NewWindow title={data.name} onUnload={() => setTerminalOpen(false)}>
                    <Tabs>
                        <TabList>
                            <Tab>Terminal</Tab>
                            <Tab>Remote Control</Tab>
                        </TabList>

                        <TabPanel>
                            <Terminal machine={data} />
                        </TabPanel>
                        <TabPanel>
                            <RemoteControl machine={data} />
                        </TabPanel>
                    </Tabs>
                </NewWindow>
            ) }

        </>
    );
}

export default ActiveMachine;