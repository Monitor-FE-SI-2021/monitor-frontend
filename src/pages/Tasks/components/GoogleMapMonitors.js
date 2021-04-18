import {render} from '@testing-library/react';
import React, {Component, useState} from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import request from "../../../service";
import userTaskTrackers from "../../../service";
import './GoogleMapMonitors.scss';
//import request from "/../../../service";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";


const yellowMarkerURL = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png"

async function taskData(id){
    const res = await request("https://si-2021.167.99.244.168.nip.io/api/UserTasks/Admin/"+id);
    
    return res.data.data;
}

function compareTrackersByTime( a, b ) {
    if ( Date.parse(a.time) < Date.parse(b.time) ){
      return -1;
    }
    if ( Date.parse(a.time) > Date.parse(b.time) ){
      return 1;
    }
    return 0;
}


function sortTrackersByTime(trackers) {
    return trackers.sort(compareTrackersByTime);
}

function setNonLeapingLocations(trackers) {
    trackers.map((tracker, i) => {
        const trackerSameLocation = trackers.find((m, j) => {
            return i !== j && tracker.locationLatitude === m.locationLatitude
                && tracker.locationLongitutde === m.locationLongitutde
        })
        if (trackerSameLocation) {
            tracker.locationLatitude = tracker.locationLatitude + (Math.random() - .5) / 30000;
            tracker.locationLongitutde = tracker.locationLongitutde + (Math.random() - .5) / 30000;
        }
    })
}

class GoogleMapMonitors extends Component {
   
    render() {

        const tasks = this.props.tasks;
        console.log("Ovo su taskovi koji su u map komponenti:\n");
        console.log(tasks);

        let allTrackers = [];
        for(let task of tasks) {
            for(let tracker of task.userTrackers)
                allTrackers.push(tracker);
        }
        sortTrackersByTime(allTrackers);
        console.log("EVO SVIH TRACKERA ZA USERA, POREDANI PO VREMENU CHECK INA");
        console.log(allTrackers);
        setNonLeapingLocations(allTrackers);

        const MyMapComponent = withGoogleMap((props) => {
            const [selectedTracker, setSelectedTracker] = useState(null)
            const [currentTask, setCurrentTask] = useState(null)
            
                return (<GoogleMap
                        defaultZoom={8}
                        defaultCenter={{lat: 43.856, lng: 18.413}}
                    >
                        {allTrackers.map(tracker => (
                            <Marker
                                key={tracker.id}
                                position={{
                                    lat: tracker.locationLatitude,
                                    lng: tracker.locationLongitutde
                                }}
                                icon={{url: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + allTrackers.indexOf(tracker) + "|FE6256|000000"}}
                                onClick={async () => {
                                    let taskD = await taskData(tracker.userTaskId);
                                    
                                    setCurrentTask(taskD);
                                    setSelectedTracker(tracker);
                                }}
                            >
                            </Marker>
                        ))
                        }
                        {selectedTracker && (
                            <InfoWindow
                            
                                position={{lat: selectedTracker.locationLatitude, lng: selectedTracker.locationLongitutde}}
                                onCloseClick={() => {
                                    //setCurrentTask(null);
                                    setSelectedTracker(null);}}
                            >
                                <div>
                                    <h1>{currentTask.device ? currentTask.device.location : currentTask.location}</h1>
                                    <h2>{new Date(selectedTracker.time).toLocaleString()}</h2>
                                    <h3>{currentTask.device ? currentTask.device.name : 'Nije specificiran naziv mašine'}</h3>
                                    <p>{currentTask.description ? currentTask.description : 'Nema specificiran opis' }</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>)
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