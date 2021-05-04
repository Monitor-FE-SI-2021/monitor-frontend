import React from 'react';
import ReactDOM from 'react-dom';
import UserScheduler from "../../../../pages/Tasks/components/UserScheduler.js";
import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";

describe('Users scheduler tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        const tasks = [
            {
                "taskId": 111,
                "userId": 2,
                "deviceId": 20,
                "startTime": "2021-04-12T08:30:34.128+00:00",
                "location": null,
                "description": "Description test",
                "endTime": "2021-04-12T09:45:34.128+00:00",
                "statusId": 4,
                "photoUploaded": false,
                "device": {
                    "deviceId": 20,
                    "name": "Desktop PC 1",
                    "location": "Mostar - Mepas Mall",
                    "locationLongitude": 18.43,
                    "locationLatitude": 43.5,
                    "status": true,
                    "lastTimeOnline": "2021-04-12T12:03:49.699293+00:00",
                    "installationCode": null,
                    "deviceUid": "839868fb-d927-479e-8337-1a860c2351e8",
                    "deviceFiles": [],
                    "deviceGroups": [],
                    "errorLogs": [],
                    "userCommandsLogs": [],
                    "userTasks": null
                },
                "status": null,
                "components": [],
                "userTrackers": []
            }
        ];
        ReactDOM.render(<UserScheduler tasks = {tasks} ></UserScheduler>, div)
    }),
    it('renders usersScheduler', () => {
        const div = document.createElement("div");
        const tasks = [
            {
                "taskId": 111,
                "userId": 2,
                "deviceId": 20,
                "startTime": "2021-04-12T08:30:34.128+00:00",
                "location": null,
                "description": "Description test",
                "endTime": "2021-04-12T09:45:34.128+00:00",
                "statusId": 4,
                "photoUploaded": false,
                "device": {
                    "deviceId": 20,
                    "name": "Desktop PC 1",
                    "location": "Mostar - Mepas Mall",
                    "locationLongitude": 18.43,
                    "locationLatitude": 43.5,
                    "status": true,
                    "lastTimeOnline": "2021-04-12T12:03:49.699293+00:00",
                    "installationCode": null,
                    "deviceUid": "839868fb-d927-479e-8337-1a860c2351e8",
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
                        "id": 72,
                        "userTaskId": 119,
                        "locationLongitutde": 17.8895351,
                        "locationLatitude": 43.9674153,
                        "time": "2021-04-17T13:00:32.527+00:00"
                    },
                    {
                        "id": 73,
                        "userTaskId": 119,
                        "locationLongitutde": 17.8895351,
                        "locationLatitude": 43.9674153,
                        "time": "2021-04-17T13:02:21.042+00:00"
                    }
                ]
            }
        ];
        const component = renderer.create(
                <UserScheduler tasks = {tasks}/>)
           let tree = component.toJSON();
           expect(tree.type).toBe('div');
    }),
    it('renders usersScheduler alert', () => {
        const div = document.createElement("div");
        const tasks = [];
        render(<UserScheduler tasks = {tasks} ></UserScheduler>);
        screen.getByText('The user has no tasks defined!');
    })
})