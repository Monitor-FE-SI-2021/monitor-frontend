import React from 'react';
import ReactDOM from 'react-dom';
import { setNonLeapingLocations, compareTrackersByTime, GoogleMapMonitors } from "../../../../pages/Tasks/components/GoogleMapMonitors.js";

describe('GoogleMapMonitor tests', () => {
    it('preklapanje lokacija', () => {
        const trackers = [
            {
                "id": 76,
                "userTaskId": 125,
                "locationLongitutde": 18.3959658,
                "locationLatitude": 43.8502505,
                "time": "2021-04-29T16:56:57.603+00:00"
            },
            {
                "id": 79,
                "userTaskId": 125,
                "locationLongitutde": 18.3959658,
                "locationLatitude": 43.8502505,
                "time": "2021-04-29T19:01:46.351+00:00"
            }
        ];
        
        setNonLeapingLocations(trackers);
        expect(trackers[0].locationLongitutde != trackers[1].locationLongitutde);
    }),
    it('poredjenje po vremenu', () => {
        const trackers = [
            {
                "id": 76,
                "userTaskId": 125,
                "locationLongitutde": 18.3959658,
                "locationLatitude": 43.8502505,
                "time": "2021-04-29T16:56:57.603+00:00"
            },
            {
                "id": 79,
                "userTaskId": 125,
                "locationLongitutde": 18.3959658,
                "locationLatitude": 43.8502505,
                "time": "2021-04-29T19:01:46.351+00:00"
            },
        ];
        
        setNonLeapingLocations(trackers);
        expect(compareTrackersByTime(trackers[0], trackers[1])).toBe(-1);
        expect(compareTrackersByTime(trackers[1], trackers[0])).toBe(1);
        expect(compareTrackersByTime(trackers[0], trackers[0])).toBe(0);
    })
    it('Google map renders successfully', () => {
        const tasks = [
            {
            "taskId": 125,
            "userId": 2,
            "deviceId": 41,
            "startTime": "2021-04-30T13:40:57.767+00:00",
            "location": null,
            "description": "Test lokacija",
            "endTime": "2021-04-30T14:55:57.767+00:00",
            "statusId": 2,
            "photoUploaded": false,
            "device": {
                "deviceId": 41,
                "name": "test masina",
                "location": "test lokacija",
                "locationLongitude": 18.3,
                "locationLatitude": 43.5,
                "status": true,
                "lastTimeOnline": "2021-04-29T19:23:45.246333+00:00",
                "installationCode": null,
                "deviceUid": "9f83691e-43ff-4438-b112-8fc0f9e420a6",
                "deviceFiles": [],
                "deviceGroups": [],
                "errorLogs": [],
                "userCommandsLogs": [],
                "userTasks": null
            },
            "status": null,
            "components": [],
            "userTrackers": [
                {
                    "id": 76,
                    "userTaskId": 125,
                    "locationLongitutde": 18.3959658,
                    "locationLatitude": 43.8502505,
                    "time": "2021-04-29T16:56:57.603+00:00"
                },
                {
                    "id": 79,
                    "userTaskId": 125,
                    "locationLongitutde": 18.4200475,
                    "locationLatitude": 43.868161,
                    "time": "2021-04-29T19:01:46.351+00:00"
                }
            ]
        }
        ];
        
        const div = document.createElement("div");
        ReactDOM.render(<GoogleMapMonitors tasks={ tasks }/>, div);
    })
})