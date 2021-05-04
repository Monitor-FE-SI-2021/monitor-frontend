import React from 'react';
import ReactDOM from 'react-dom';
import UserTable from "../../../components/UsersTable/UsersTable.js";
import renderer from 'react-test-renderer';
import store from '../../../store/store';
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup)

describe('Users table tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement("div");
        const users = [
            {
                "userId": 2,
                "name": "Aya",
                "lastname": "Ayić",
                "email": "aayić@aya.com",
                "phone": "433444",
                "roleId": 2,
                "password": null,
                "qrSecret": null,
                "address": null,
                "emailVerified": null,
                "role": null,
                "reports": [],
                "userCommandsLogs": [],
                "userGroups": [],
                "userTasks": []
            },
            {
                "userId": 3,
                "name": "Osoba1",
                "lastname": "Osobić",
                "email": "osoba1@email.com",
                "phone": "061111111",
                "roleId": 1,
                "password": null,
                "qrSecret": null,
                "address": null,
                "emailVerified": null,
                "role": null,
                "reports": [],
                "userCommandsLogs": [],
                "userGroups": [],
                "userTasks": []
            }
        ];
        ReactDOM.render(<UserTable users = {users} ></UserTable>, div)
    }),
    it('renders UserScheduler', () => {
        const users = [
            {
                "userId": 2,
                "name": "Aya",
                "lastname": "Ayić",
                "email": "aayić@aya.com",
                "phone": "433444",
                "roleId": 2,
                "password": null,
                "qrSecret": null,
                "address": null,
                "emailVerified": null,
                "role": null,
                "reports": [],
                "userCommandsLogs": [],
                "userGroups": [],
                "userTasks": []
            },
            {
                "userId": 3,
                "name": "Osoba1",
                "lastname": "Osobić",
                "email": "osoba1@email.com",
                "phone": "061111111",
                "roleId": 1,
                "password": null,
                "qrSecret": null,
                "address": null,
                "emailVerified": null,
                "role": null,
                "reports": [],
                "userCommandsLogs": [],
                "userGroups": [],
                "userTasks": []
            }
        ];
        const component = renderer.create(<UserTable users = {users} ></UserTable>)
           let tree = component.toJSON();
           expect(tree.type).toBe('div');
    }),
    it("Should have Name and calendar icon", () => {
        render(<UserTable store={store} users={[{
            "userId": 2,
            "name": "Aya",
            "lastname": "Ayić",
            "email": "aayić@aya.com",
            "phone": "433444",
            "roleId": 2,
            "password": null,
            "qrSecret": null,
            "address": null,
            "emailVerified": null,
            "role": null,
            "reports": [],
            "userCommandsLogs": [],
            "userGroups": [],
            "userTasks": []
        }]} />);
        screen.getByText('Name');
        screen.getByTestId('calendar-2');
    }),
    it('should render div', () => {
        const users = [
            {
                "userId": 2,
                "name": "Aya",
                "lastname": "Ayić",
                "email": "aayić@aya.com",
                "phone": "433444",
                "roleId": 2,
                "password": null,
                "qrSecret": null,
                "address": null,
                "emailVerified": null,
                "role": null,
                "reports": [],
                "userCommandsLogs": [],
                "userGroups": [],
                "userTasks": []
            },
            {
                "userId": 3,
                "name": "Osoba1",
                "lastname": "Osobić",
                "email": "osoba1@email.com",
                "phone": "061111111",
                "roleId": 1,
                "password": null,
                "qrSecret": null,
                "address": null,
                "emailVerified": null,
                "role": null,
                "reports": [],
                "userCommandsLogs": [],
                "userGroups": [],
                "userTasks": []
            }
        ];
        const component = renderer.create(<UserTable users = {users} ></UserTable>);
           let tree = component.toJSON();
           expect(tree.type).toBe('div');
    })
})