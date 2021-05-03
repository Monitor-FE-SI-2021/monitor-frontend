import { convertStatistics, machineNameAndLocation, filterActive} from "../../../pages/Dashboard/Dashboard";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import React from "react";
import ReactDOM from 'react-dom';

describe('Dashboard tests', () => {
    it('Correct statistic calculated', () => {
        const averageCPUUsage= 53.4;

        expect(convertStatistics(averageCPUUsage)).toStrictEqual([5340, -5240]);
    })

    it('Incorrect machine name', () => {
        const machine=null;
        expect(machineNameAndLocation(machine)).toStrictEqual("");
    })

    it('Machine name without location', () => {
        const machine={name: "All machines"};
        expect(machineNameAndLocation(machine)).toStrictEqual("All machines");
    })

    it('Machine name with location', () => {
        const machine={name: "Machine1", location: "Sarajevo"};
        expect(machineNameAndLocation(machine)).toStrictEqual("Machine1 (Sarajevo)");
    })

    it('Active machines successfully filtered', () => {
        const allMachines=[{"deviceUid":"1","lastTimeOnline":"3.3.2021","deviceId":"1"},{"deviceUid":"2","lastTimeOnline":"4.3.2021","deviceId":"2"}];
        let activeMachines=[{"deviceUid":"1","status":"in use","user":"Aj"},{"deviceUid":"3","status":"in use","user":"Tj"}];
        const user={"email":"osoba5@email.com"};
        const setActiveForUser=(machines)=>{console.log(machines)};
        activeMachines=filterActive(activeMachines,allMachines,setActiveForUser,user);

        expect(activeMachines.length).toStrictEqual(1);
    })

    it('Dashboard renders successfully', () => {
        const div =document.createElement("div");
        const user={"email":"osoba5@email.com"};
       
        ReactDOM.render(<Dashboard user={user} ></Dashboard>, div)
    })
})
