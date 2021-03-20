import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React from 'react';

const groups = [
    {
        groupId: 1,
        name: "Grupa 1",
        parentGroup: null,
    },
    {
        groupId: 2,
        name: "Grupa 2",
        parentGroup: 1,
    },
    {
        groupId: 3,
        name: "Grupa 3",
        parentGroup: null,
    },
    {
        groupId: 4,
        name: "Grupa 4",
        parentGroup: 2
    },
    {
        groupId: 5,
        name: "Grupa 5",
        parentGroup: 3
    }
];

const getParentGroups = (groups) => {
    const parentGroups = []

    for(let group of groups){
        if(group.parentGroup === null){
            parentGroups.push(group)
        }
    }

    return parentGroups
}

const Devices = () => {
    //Ovdje dohvatiti sve uređaje i grupisati ih na osnovu glavnih grupa
    //Tako grupisan niz poslati mapirati u DeviceGroup-e


    const deviceGroups = getParentGroups(groups).map((grupa) => {
        return (
                <DeviceGroup groups={groups} group={grupa} key={grupa.groupId}/>
        );
    });

    return (
        <div className="page devices">
            <div className="top">
                <h1> Pregled mašina </h1>
                <button>Kreiraj mašinu</button>
            </div>
            {deviceGroups}
        </div>
    );
};

export default connect((state) => ({}), {})(Devices);
