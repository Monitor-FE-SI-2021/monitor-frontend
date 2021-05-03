import { convertStatistics, machineNameAndLocation } from "../../../pages/Dashboard/Dashboard";

describe('Dashboard tests', () => {
    it('Correct statistic calculated', () => {
        const averageCPUUsage= 53.4;

        expect(convertStatistics(averageCPUUsage)).toStrictEqual([5340, -5240]);
    })
})

