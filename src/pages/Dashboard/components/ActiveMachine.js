import React, { useState } from 'react';
import NewWindow from 'react-new-window';

import Avatar from './MachineAvatar.js';
import Terminal from '../../../components/Terminal/Terminal';
import RemoteControl from '../../RemoteControl/RemoteControl';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ActiveMachine = ({ data, img }) => {
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [remoteControlOpen, setRemoteControlOpen] = useState(false);
    return (
        <>
            <div className='card'>
                <div className='card-img'>
                    <Avatar img={img} />
                </div>

                <div className='card-info'>
                    <h3>{ data.name }</h3>
                    <h3>{ data.location }</h3>
                    <p>{ new Date(data.lastTimeOnline).toGMTString() }</p>
                </div>

                <div className='card-actions'>
                    <button onClick={() => setTerminalOpen(true)}>Terminal</button>
                    <button onClick={() => setRemoteControlOpen(true)}>Remote Control</button>
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

            { remoteControlOpen && (
                <NewWindow onUnload={() => setRemoteControlOpen(false)}>
                    <RemoteControl machine={data} />
                </NewWindow>
            ) }
        </>
    );
}

export default ActiveMachine;