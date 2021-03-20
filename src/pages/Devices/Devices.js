import { connect } from "react-redux";
import "./Devices.scss";
import DeviceGroup from "../../components/DeviceGroup/DeviceGroup";
import React from 'react';

const devices = [
    {
        id: 1,
        name: "Uređaj 1",
        location: "Sarajevo",
        longitude: "014013430",
        latitude: "64354354",
        status: true,
        LastTimeOnline: Date.now(),
        group: {
            id: 2,
            name: "Nadgrupa1",
            subGroup: {
                id: 3,
                name: "Subgrupa1",
                subGroup: null,
            },
        },
    },
    {
        id: 4,
        name: "Uređaj 2",
        location: "Travnik",
        longitude: "014013430",
        latitude: "64354354",
        status: true,
        LastTimeOnline: Date.now(),
        group: {
            id: 2,
            name: "Nadgrupa1",
            subGroup: {
                id: 6,
                name: "Subgrupa2",
                subGroup: null,
            },
        },
    },
    {
        id: 10,
        name: "Uređaj 2",
        location: "Travnik",
        longitude: "014013430",
        latitude: "64354354",
        status: true,
        LastTimeOnline: Date.now(),
        group: {
            id: 2,
            name: "Nadgrupa1",
            subGroup: {
                id: 12,
                name: "Subgrupa2",
                subGroup: null,
            },
        },
    },
    {
        id: 7,
        name: "Uređaj 3",
        location: "Bugojno",
        longitude: "014013430",
        latitude: "64354354",
        status: false,
        LastTimeOnline: Date.now(),
        group: {
            id: 8,
            name: "Nadgrupa2",
            subGroup: null,
        },
    },
];

const grupe = [
    {
        grupaid: 1,
        name: "Grupa 1",
        parentGroup: null,
    },
    {
        grupaid: 2,
        name: "Grupa 2",
        parentGroup: null,
    },
    {
        grupaid: 3,
        name: "Grupa 3",
        parentGroup: null,
    },
];

const Devices = () => {
    //Ovdje dohvatiti sve uređaje i grupisati ih na osnovu glavnih grupa
    //Tako grupisan niz poslati mapirati u DeviceGroup-e

    const deviceGroups = grupe.map((grupa) => {
        return (
                <DeviceGroup grupa={grupa} key={grupa.grupaid}/>
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
