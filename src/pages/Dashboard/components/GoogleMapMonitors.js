import {render} from '@testing-library/react';
import React, {Component, useState, useEffect} from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow, withScriptjs} from "react-google-maps"
import request, {devices} from "../../../service";

function filterActive(activeMachines, allMachines) {
    return activeMachines ? activeMachines.filter((machine) => {
        const existingMachine = allMachines.find(({name, location}) => {
            return machine.status !== "Disconnected" && name === machine.name && location === machine.location;
        });
        if (existingMachine) {
            machine.deviceId = existingMachine.deviceId;
            machine.lastTimeOnline = existingMachine.lastTimeOnline;
        }
        return existingMachine;
    }) : [];
}

function filterInactiveMachines(machines, activeMachines) {

    let result = [];

    machines.map((machine) => {

        let statusOfMachine = activeMachines.find(e => e.deviceId == machine.deviceId);

        if (statusOfMachine != undefined) {
            result.push({
                deviceId: machine.deviceId,
                name: machine.name,
                locationLongitude: machine.locationLongitude,
                locationLatitude: machine.locationLatitude,
                imageURL: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            })
        } else {
            result.push({
                deviceId: machine.deviceId,
                name: machine.name,
                locationLongitude: machine.locationLongitude,
                locationLatitude: machine.locationLatitude,
                imageURL: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            })
        }
    })

    return result;
}

class GoogleMapMonitors extends Component {


    state = {
        loading: true,
        machines: []
    };


    async componentDidMount() {
        const response = await request(devices + "/AllDevices");
        this.setState({machines: response.data.data, loading: false})
    }


    render() {


        let machinesReadyToMark = [];

        if (!this.state.loading) {
            let activeMachines = filterActive([], this.state.machines)
            console.log(this.state.machines);
            machinesReadyToMark = filterInactiveMachines(this.state.machines, activeMachines);
        }

        //when calling a marker, check if loading is true/false
        function Map() {
            const [selectedMachine, setSelectedMachine] = useState(null);


            useEffect(() => {
                const listener = e => {
                    if (e.key === "Escape") {
                        setSelectedMachine(null);
                    }
                };
                window.addEventListener("keydown", listener);

                return () => {
                    window.removeEventListener("keydown", listener);
                };
            }, []);

            return (

                <GoogleMap
                    defaultZoom={8}
                    defaultCenter={{lat: 43.856, lng: 18.413}}
                >
                    {machinesReadyToMark.filter((m, i)=>i<1).map(machine => (
                        <Marker
                            key={machine.deviceId}
                            position={{
                                lat: machine.locationLatitude,
                                lng: machine.locationLongitude
                            }}
                            icon={{url: machine.imageURL}}
                            onClick={() => {
                                setSelectedMachine(machine);
                            }}
                        >
                        </Marker>
                    ))
                    }
                    {selectedMachine && (
                        <InfoWindow
                            onCloseClick={() => {
                                setSelectedMachine(null);
                            }}
                            position={{
                                lat: selectedMachine.locationLatitude,
                                lng: selectedMachine.locationLongitude
                            }}
                        >
                            <div>
                                <h2>{selectedMachine.deviceId}</h2>
                                <p>{selectedMachine.name}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            );
        }

        const MapWrapped = withScriptjs(withGoogleMap(Map));
        return (
            <MapWrapped
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqy4jIX3sEoscEfuE-stH6oWMHNLaQIs8&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`, width: `80%`}}/>}
            />
        );
    }


}

export default GoogleMapMonitors;