import DeviceSubGroup from './DeviceSubGroup/DeviceSubGroup';
import './DeviceGroup.scss';
import DeviceTable from '../DeviceTable/DeviceTable';
import React, { useState } from 'react';

const DeviceGroup = ({groups, group}) => {

   const [hidden, setHidden] = useState(false);

    let devicesData = [
        {
            deviceId: 1,
            name: "Uredjaj 1",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now(),
            groupId: 1
        },
        {
            deviceId: 2,
            name: "Uredjaj 2",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now(),
            groupId: 2
        },
        {
            deviceId: 3,
            name: "Uredjaj 3",
            location: 'Sarajevo',
            locationLongitude: 44.13,
            locationLatitude: 18.2,
            status: true,
            lastTimeOnline: Date.now(),
            groupId: 4
        },
    ]

    const getSubGroups = (groups, groupId) => {
        const subGroups = [];

        for(let group of groups){
            if(group.parentGroup === groupId){
                subGroups.push(group);
            }
        }

        return subGroups;
    }

    const getFilterDevices = (devices) => {
        const filteredDevices = [];

        for(let device of devices){
            if(device.groupId === group.groupId){
                filteredDevices.push(device);
            }
        }

        return filteredDevices;
    }

    let subGroups = getSubGroups(groups, group.groupId).map(subGroup => {
        return <DeviceGroup groups={groups} group={subGroup} key={subGroup.groupId}/>
    });

    let filteredDevices = getFilterDevices(devicesData);

    if(subGroups.length === 0){
        subGroups = null;
    }

    let data = null;

    if(!hidden){
        data = <React.Fragment>
            {filteredDevices.length != 0 ? <DeviceTable devices={filteredDevices} /> : null}
            {subGroups}
        </React.Fragment>   
    }

    return (
        <div className='group'>
            <h2>{group.name}</h2>
            <button onClick={() => setHidden(!hidden)}>Klikni me maco</button>
            {data}
        </div>
    )
}

export default DeviceGroup;