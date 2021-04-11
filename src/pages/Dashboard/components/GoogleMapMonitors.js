import {render} from '@testing-library/react';
import React, {Component, useState} from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import request, {devices} from "../../../service";

const greenMarkerURL = "http://maps.google.com/mapfiles/ms/micons/green-dot.png"
const redMarkerURL = "http://maps.google.com/mapfiles/ms/micons/red-dot.png"
const yellowMarkerURL = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png"
const ltBlueMarkerURL = "http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png"

function setActivityMarkers(activeMachines, allMachines) {
    allMachines.map((machine) => {
        const isActiveMachine = activeMachines.find(({deviceUid}) => {
            return machine.deviceUid === deviceUid
        })
        if (isActiveMachine) {
            machine.imageURL = greenMarkerURL
        } else {
            machine.imageURL = ltBlueMarkerURL
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
            machine.locationLatitude = machine.locationLatitude + (Math.random() - .5) / 30000;
            machine.locationLongitude = machine.locationLongitude + (Math.random() - .5) / 30000;
        }
    })
}

function checkMachineErrors(errors, machines) {

    machines.map((machine) => {
        let statusCodesOfMachine = errors.find(e => e.deviceUID == machine.deviceUid);

        if (statusCodesOfMachine != undefined) {

            if (statusCodesOfMachine.errorInfo.filter(e => e.code >= 400 && e.code <= 561 || e.code === null || e.type == "RUNTIME").length != 0) {
                machine.imageURL = redMarkerURL;
                return;
            } else if (statusCodesOfMachine.errorInfo.filter(e => e.code >= 300 && e.code < 400).length != 0) {
                machine.imageURL = yellowMarkerURL;
            }
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
        let allErrors = this.props.allErrors

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
        checkMachineErrors(allErrors, allMachines)

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


        return (
        <div className="map-wrapper">
        <div className="map-legend">
            <div className="legend-wrapper">
                <div className="legend-bg">
                    <ul id="legend-list">
                        <li id="first-list-item"> online</li>
                        <li id="second-list-item"> offline</li>
                        <li id="third-list-item"> critical</li>
                    </ul>
                </div>
            </div>
            </div>
            <div className="map-wrapper">
        <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqy4jIX3sEoscEfuE-stH6oWMHNLaQIs8&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "400px" }} />}
                mapElement={<div style={{ height: "100%", width:"100%", borderRadius: "25px", border: "1px solid #ccc" }} />}
            />
            </div>
            </div>
        );
    }


}

export default React.memo(GoogleMapMonitors);