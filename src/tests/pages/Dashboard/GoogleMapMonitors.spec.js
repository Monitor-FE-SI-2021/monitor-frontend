import {setActivityMarkers, setNonLeapingLocations, checkMachineErrors} from "../../../pages/Dashboard/components/GoogleMapMonitors";
import GoogleMapMonitors from "../../../pages/Dashboard/components/GoogleMapMonitors";
import React from "react";
import ReactDOM from 'react-dom';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";

describe('Google Map tests', () => {
    it('Correct markers should be set', () => {
        
        let allMachines=[{"deviceUid": "1"},{"deviceUid" : "2"}, {"deviceUid" : "3"}];
        let activeMachines=[{"deviceUid" : "2"}];
        setActivityMarkers(activeMachines,allMachines);
        expect(allMachines[0].imageURL).toStrictEqual("http://maps.google.com/mapfiles/ms/micons/ltblue-dot.png");
        expect(allMachines[1].imageURL).toStrictEqual("http://maps.google.com/mapfiles/ms/micons/green-dot.png");
    })

    it('NonLeaping Locations set', () => {
        
        let machines=[{"deviceUid": "1", "locationLatitude": "45", "locationLongitude":"45"},
        {"deviceUid": "2", "locationLatitude": "45", "locationLongitude":"45"}];
        setNonLeapingLocations(machines);
        expect(machines[0].locationLatitude !=machines[1].locationLatitude).toStrictEqual(true);
        expect(machines[0].locationLongitude !=machines[1].locationLongitude).toStrictEqual(true);
        
    })

    it('Machine errors checked', () => {
        let errors = [{"deviceUID" : "1",
                "errorInfo" : [
                    {
                        "code" : "400",
                        "type" : "RED"
                    }
                ]
            },
            {  "deviceUID" : "2",
                "errorInfo" : [
                    {
                        "code" : "300",
                        "type" : "Yellow"
                    }
                ]
            }
        ]
        let machines=[{"deviceUid": "1"},{"deviceUid": "2"}];
        checkMachineErrors(errors, machines);
        expect(machines[0].imageURL).toStrictEqual("http://maps.google.com/mapfiles/ms/micons/red-dot.png");
        expect(machines[1].imageURL).toStrictEqual("http://maps.google.com/mapfiles/ms/micons/yellow-dot.png");
        
    })
    /*
    it('Google map renders successfully', () => {
        const div =document.createElement("div");
        const allMachines=[{"deviceUid":"1", "name":"Aj", "location":"Sarajevo", "lastTimeOnline":"2.2.2021", "locationLatitude":"45", "locationLongitude":"45"}];
        const activeMachines=[{"deviceUid":"1", "name":"Aj", "location":"Sarajevo", "lastTimeOnline":"2.2.2021", "locationLatitude":"45", "locationLongitude":"45"}];
        const errors= [{"deviceUID" : "1",
        "errorInfo" : [
            {
                "code" : "400",
                "type" : "RED"
            }
        ]
        },
        {  "deviceUID" : "2",
           "errorInfo" : [
            {
                "code" : "300",
                "type" : "Yellow"
            }
        ]
        }
        ];
       
        ReactDOM.render(<GoogleMapMonitors allMachines={allMachines} activeMachines={activeMachines} allErrors={errors} ></GoogleMapMonitors>, div)
    })
    */
})
