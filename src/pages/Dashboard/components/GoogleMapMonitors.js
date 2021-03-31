import { render } from '@testing-library/react';
import React, {Component} from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"


    function filterInactiveMachines(machines, activeMachines) {
        
        let result = [];
        
        machines.map((machine) => {

            let statusOfMachine = activeMachines.find(e => e.deviceId == machine.deviceId);
            
            if (statusOfMachine != undefined) {
                result.push({
                    deviceId: machine.deviceId, 
                    name: machine.name,
                    locationLongitude: 1,
                    locationLatitude: 0,
                    imageURL: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                })
            } else {
                    result.push({
                    deviceId: machine.deviceId, 
                    name: machine.name,
                    locationLongitude: 1,
                    locationLatitude: 0,
                    imageURL: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                })
            }
        })

        return result;
    }



class GoogleMapMonitors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            machines: props.machines,
            activeMachines: props.activeMachines
        }
    }






    render() {

        filterInactiveMachines(this.state.machines, this.state.activeMachines);

        const MyMapComponent = withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 43.856, lng: 18.413 }}
            >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            <Marker
                position={{ lat: -34.397, lng: 150.644}}
            />
            </GoogleMap>
        );


        return(
            <MyMapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqy4jIX3sEoscEfuE-stH6oWMHNLaQIs8&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%`, width:`80%` }} />}
            />
        );
    }


}

export default GoogleMapMonitors;