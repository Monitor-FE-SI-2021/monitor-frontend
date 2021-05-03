import { convertStatistics, machineNameAndLocation } from "../../../pages/Dashboard/Dashboard";

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
})
