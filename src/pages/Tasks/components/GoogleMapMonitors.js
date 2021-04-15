import {render} from '@testing-library/react';
import React, {Component, useState} from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import request, {devices} from "../../../service";
import './GoogleMapMonitors.scss';
const yellowMarkerURL = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png"


class GoogleMapMonitors extends Component {
   
    render() {

        const tasks = this.props.tasks;

        const MyMapComponent = withGoogleMap((props) => {
                //const [selectedMachine, setSelectedMachine] = useState(null)
                return (
                    <GoogleMap
                        defaultZoom={8}
                        defaultCenter={{lat: 43.856, lng: 18.413}}
                    >
                        {tasks.map(task => {
                            let trackers = task.userTrackers;
                            trackers.map(tracker => (
                                <Marker
                                    key={tracker.id}
                                    position={{
                                        lat: tracker.locationLatitude,
                                        lng: tracker.locationLongitutde
                                    }}
                                    icon={{url: yellowMarkerURL}}
                                >
                                </Marker>
                            ))
                            
                            })
                        }
                    </GoogleMap>
                )
            }
        );


        return (
        <div className="map-wrapper">
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