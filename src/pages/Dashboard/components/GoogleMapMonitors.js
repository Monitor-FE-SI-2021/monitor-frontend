import { render } from '@testing-library/react';
import React, {Component, useState} from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import request, { devices } from "../../../service";


/*
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
        //console.log(machines);
        let result = [];
        
        machines.map((machine) => {

            let statusOfMachine = activeMachines.find(e => e.deviceId == machine.deviceId);
            
            if (statusOfMachine != undefined) {
                result.push({
                    deviceId: machine.deviceId, 
                    name: machine.name,
                    locationLongitude: machine.locationLongitude,
                    locationLatitude: machine.locationLatitude,
                    lastTimeOnline: machine.lastTimeOnline,
                    imageURL: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                })
            } else {
                    result.push({
                    deviceId: machine.deviceId, 
                    name: machine.name,
                    locationLongitude: machine.locationLongitude,
                    locationLatitude: machine.locationLatitude,
                    lastTimeOnline: machine.lastTimeOnline,
                    imageURL: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                })
            }
        })

        return result;
    }


 */
const greenMarkerURL = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
const redMarkerURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

function setActivityMarkers(activeMachines, allMachines) {
        allMachines.map((machine) => {
            const isActiveMachine = activeMachines.find(({ deviceUid }) => {
                return machine.deviceUid === deviceUid
            })
            if (isActiveMachine) {
                machine.imageURL = greenMarkerURL
            }
            else {
                machine.imageURL = redMarkerURL
            }
        })
}

function setNonLeapingLocations(machines) {
    machines.map((machine, i) => {
        const machineSameLocation = machines.find((m, j) => {
            return i !== j && machine.locationLatitude === m.locationLatitude
                && machine.locationLongitude === m.locationLongitude
        })
        if (machineSameLocation) {
            machine.locationLatitude = machine.locationLatitude + (Math.random() -.5) / 30000;
            machine.locationLongitude = machine.locationLongitude + (Math.random() -.5) / 30000;
        }
    })
}

class GoogleMapMonitors extends Component {
/*
    state = {
        loading: true,
        machines: []
    };

    async componentDidMount(){
        const response = await request(devices + "/AllDevices");
        this.setState({machines: response.data.data, loading:false})
    }

*/
    render() {

        let activeMachines = this.props.activeMachines
        let allMachines = this.props.allMachines

        setNonLeapingLocations(allMachines)
/*
        let machinesReadyToMark = [];
        if (!this.state.loading) {
            let activeMachines = filterActive([], this.state.machines)
            machinesReadyToMark = filterInactiveMachines(this.state.machines, activeMachines);
            console.log(machinesReadyToMark)
        }
*/
        setActivityMarkers(activeMachines, allMachines)

        //when calling a marker, check if loading is true/false

        const MyMapComponent = withGoogleMap((props) => {
            const [selectedMachine, setSelectedMachine] = useState(null)
            return (
                    <GoogleMap
                        defaultZoom={8}
                        defaultCenter={{lat: 43.856, lng: 18.413}}
                    >
                        {allMachines.map(machine => (
                            <Marker
                                key={machine.deviceUid}
                                position={{
                                    lat: machine.locationLatitude,
                                    lng: machine.locationLongitude
                                }}
                                icon={{url: machine.imageURL}}
                                onClick={() => setSelectedMachine(machine)}
                            >
                            </Marker>
                        ))
                        }
                        {selectedMachine && (
                            <InfoWindow
                                position={{lat: selectedMachine.locationLatitude, lng: selectedMachine.locationLongitude}}
                                onCloseClick={() => setSelectedMachine(null)}
                            >
                                <div>
                                    <h2>{selectedMachine.name}</h2>
                                    <p>{selectedMachine.location}</p>
                                    <p>{new Date(selectedMachine.lastTimeOnline).toLocaleString()}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                )
            }
        );


        return(
            <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqy4jIX3sEoscEfuE-stH6oWMHNLaQIs8&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%`, width:`100%`, borderRadius: `25px`, border: `1px solid #ccc` }} />}
                
            />
        );
    }


}

export default GoogleMapMonitors;