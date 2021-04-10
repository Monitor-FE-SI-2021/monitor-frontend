import React from "react";
import { connect } from "react-redux";
import MachineIcon from "../../assets/icons/machine.png";
import DonutChart from "./components/charts/DonutChart";
import BarChart from "./components/charts/BarChart";
import ActiveMachine from "./components/ActiveMachine";
import request, { devices, errors } from "../../service";
import GoogleMapMonitors from "./components/GoogleMapMonitors";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import "./dashboard.scss";
import {Bar} from "react-chartjs-2";
import {STORAGE_KEY} from "../../utils/consts";

let barChart = {

    labels: ['100', '200', '300', '400', '500'],
    datasets:[
        {
            label:"Number of errors of type",
            data:[
                1,
                2,
                3,
                4,
                8
            ],
            backgroundColor:'rgba(75, 192, 192, 0.6)'
        }
    ]
}

let ramUsageChart = {
    labels: ["Used", "Not used"],
    datasets: [
        {
            label: "RAM usage",
            data: [],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)"],
        },
    ],
};

let cpuUsageChart = {
    labels: ["Used", "Not used"],
    datasets: [
        {
            label: "CPU usage",
            data: [],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)"],
        },
    ],
};

let gpuUsageChart = {
    labels: ["Used", "Not used"],
    datasets: [
        {
            label: "GPU usage",
            data: [],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)"],
        },
    ],
};

let hddUsageChart = {
    labels: ["Used", "Not used"],
    datasets: [
        {
            label: "HDD usage",
            data: [],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(54, 162, 235, 0.6)"],
        },
    ],
};

// let activeMachines = [
//     {
//         deviceUid: "fc548ecb-12ec-4ad5-8672-9d5a9565ff60",
//         name: "Desktop PC 1",
//         location: "Sarajevo - BBI",
//         ip: "255.255.255.0",
//         path: "C:/user/programfiles",
//     },
//         {
//         deviceUid: "92649d24-fc46-44c6-b085-356977dbb782",
//         name: "Desktop PC 2",
//         location: "Sarajevo - BBI",
//         ip: "255.255.255.0",
//         path: "C:/user/programfiles",
//     },
//     {
//         deviceUid: "eed19402-67c5-4978-9ad2-513cd5db6376",
//         name: "Desktop PC 1",
//         location: "Sarajevo - SCC",
//         ip: "255.255.255.0",
//         path: "C:/user/programfiles",
//     },
//     {
//         deviceUid: "d3143e54-d497-402f-82ef-b1b213c1d172",
//         name: "Desktop PC 2",
//         location: "Sarajevo - SCC",
//         ip: "255.255.255.0",
//         path: "C:/user/programfiles",
//     }
// ];

function convertStatistics(statistic) {
    return [Math.round(statistic * 100), Math.round((1 - statistic) * 100)];
}

const allMachinesString = "All machines"

let removedMachine = null
let clickedMachine = null
let allMachinesUsage = null
let lastDisconnected = null

export let barchartMaxValue = 50

const Dashboard = ({ user }) => {
    let end = new Date();
    const endDefaultValue = {
        year: end.getFullYear(),
        month: end.getMonth()+1,
        day: end.getUTCDate()
    };
    let start = new Date(end.getTime() - (7 * 24 * 60 * 60 * 1000));
    const startDefaultValue = {
        year: start.getFullYear(),
        month: start.getMonth()+1,
        day: start.getUTCDate()
    };
    let activeMachines = []
    const [machines, setMachines] = React.useState([]);
    const [active, setActive] = React.useState([...activeMachines]);
    const [showCharts, setShowCharts] = React.useState(false);
    const [chartType, setChartType] = React.useState(true)



    const [endDate, setEndDate] = React.useState(endDefaultValue);
    const endformatInputValue = () => {
        if (!endDate) return '';
        return `${endDate.day}/${endDate.month}/${endDate.year}`;
      };
    
    const [startDate, setStartDate] = React.useState(startDefaultValue);
    const startformatInputValue = () => {
        if (!startDate) return '';
        return `${startDate.day}/${startDate.month}/${startDate.year}`;
      };
    
    function filterActive(activeMachines, allMachines) {
        return activeMachines ? activeMachines.filter((machine) => {
            const existingMachine = allMachines.find(({ deviceUid }) => {
                return machine.status !== "Waiting" && machine.deviceUid === deviceUid;
            });
            if (existingMachine) {
                machine.deviceId = existingMachine.deviceId
                machine.lastTimeOnline = existingMachine.lastTimeOnline;
            }
            return existingMachine;
        }) : [];
    }

    console.log(startDate, endDate)

    function getStatistics(machine) {
        console.log(machine)
        request(devices + "/GetDeviceLogs?deviceId=" + machine.deviceId)
            .then((res) => res.data.data)
            .then((res) => {
                setCharts(res, machine);
            })
            .catch((err) => console.log(err));

/*
        fetch(errors + "/DateInterval", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + window.localStorage.getItem(STORAGE_KEY),
            },
            body: JSON.stringify({
                deviceUID: machine.deviceUid,
                startDate: "2021-01-09T11:42:10.180Z",
                endDate: "2021-04-09T11:42:10.180Z"
            }),
        })
            .then((res) => console.log(res.json()))*/

        request(errors + "/DateInterval", "get", {
            deviceUID: machine.deviceUid,
            startDate: "2021-01-09T11:42:10.180Z",
            endDate: "2021-04-09T11:42:10.180Z"
        })
            .then((res) => console.log(res.data.data))



    }

    /*
        React.useEffect(() => {
            request(devices + "/AllDevices")
                .then((res) => {
                    const allMachines = res.data.data;
                    setMachines(allMachines);
                    console.log(allMachines)
                    request("https://si-grupa5.herokuapp.com/api/agent/online")
                        .then((res) => {
                            console.log(res)
                            setActive(filterActive(res?.data, allMachines));
                        })
                })
                .catch((err) => console.log(err));

            request(devices + "/GetAverageHardwareUsageForUser")
                .then((res) => {
                    allMachinesUsage = res.data.data
                    console.log(allMachinesUsage)
                    setCharts(allMachinesUsage, { name: "All machines"})
                })
        }, []);
    */

    React.useEffect(() => {
        request(devices + "/AllDevices")
            .then((res) => {
                const allMachines = res.data.data;
                setMachines(allMachines);
                request("https://si-grupa5.herokuapp.com/api/agent/online")
                    .then((res) => {
                        setActive(filterActive(res?.data, allMachines));
                    })
                // setActive(filterActive(activeMachines, allMachines))
            })
            .catch((err) => console.log(err));

        request(devices + "/GetAverageHardwareUsageForUser")
            .then((res) => {
                allMachinesUsage = res.data.data
                setCharts(allMachinesUsage, { name: allMachinesString })
            })

    }, []);

    const disconnectMachine = (machine) => {
        removedMachine = machine
        const index = active.indexOf(machine);
        const cloned = active.slice(0);
        if (
            index >= 0 &&
            window.confirm("Are you sure you wish to disconnect this machine?")
        ) {
            request("https://si-grupa5.herokuapp.com/api/agent/disconnect", "POST", {
                deviceUid: machine.deviceUid,
                user: user.email
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            cloned.splice(index, 1);
            lastDisconnected = machine
            if (cloned.length === 0 || removedMachine?.deviceId === clickedMachine?.deviceId) {
                clickedMachine = { name: allMachinesString }
                setCharts(allMachinesUsage, clickedMachine)
            }
            setActive(cloned);
        }
    };

    const setCharts = ({
                           averageCPUUsage,
                           averageGPUUsage,
                           averageHDDUsage,
                           averageRamUsage,
                       }, machine) => {
        if (machine === lastDisconnected) return
        clickedMachine = machine
        if (machine?.name === allMachinesString || removedMachine?.deviceId !== machine?.deviceId) {
            cpuUsageChart.datasets[0].data = convertStatistics(averageCPUUsage);
            gpuUsageChart.datasets[0].data = convertStatistics(averageGPUUsage);
            hddUsageChart.datasets[0].data = convertStatistics(averageHDDUsage);
            ramUsageChart.datasets[0].data = convertStatistics(averageRamUsage);
            setShowCharts(false)
            setShowCharts(true)
        }

    };

    return (
        <div className="page">
            <div className="dashboard">
                <div className="row machine-cards">
                    <h1>List of active machines</h1>
                    <div className="scrollable">
                        {active?.length ? (
                            active.map((machine, id) => (
                                <ActiveMachine
                                    key={id}
                                    data={machine}
                                    img={MachineIcon}
                                    onDisconnect={disconnectMachine}
                                    getStatistics={getStatistics}
                                />
                            ))
                        ) : (
                            <div className='no-active-machines'>
                                No active machines.
                            </div>
                        )}
                    </div>
                </div>

                {showCharts && (
                    <div>
                        <h2 className="machineName">{clickedMachine?.name}</h2>


                        <div className="pickers">
                            <h5 className="picker-h5">Date Range Input</h5>
                            <DatePicker
                                className="picker"
                                value={startDate}
                                onChange={setStartDate}
                                formatInputText={startformatInputValue} // format value

                                inputClassName="my-custom-input" // custom class
                                shouldHighlightWeekends
                            />
                            <DatePicker
                                className="picker"
                                value={endDate}
                                onChange={setEndDate}
                                formatInputText={endformatInputValue} // format value

                                inputClassName="my-custom-input" // custom class
                                shouldHighlightWeekends
                            />
                        </div>

                        <button onClick={() => {setChartType(!chartType)}}>Change</button>
                        { chartType && (
                            <div className="chartContainer">
                                <div className="row">
                                    <DonutChart
                                        displayTitle="Average RAM usage"
                                        chartData={ramUsageChart}
                                    />
                                    <DonutChart
                                        displayTitle="Average CPU usage"
                                        chartData={cpuUsageChart}
                                    />
                                </div>
                                <div className="row">
                                    <DonutChart
                                        displayTitle="Average GPU usage"
                                        chartData={gpuUsageChart}
                                    />
                                    <DonutChart
                                        displayTitle="Average disk usage"
                                        chartData={hddUsageChart}
                                    />
                                </div>
                            </div>
                        )}


                        { !chartType && (
                            <div className="chartContainer">
                                    <BarChart chartData={barChart}/>

                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="googleMapMonitors">
                <GoogleMapMonitors
                    activeMachines={active}
                    allMachines={machines}
                />
            </div>

        </div>
    );
};

export default connect(
    (state) => ({
        user: state.login.user,
    }),
    {}
)(Dashboard);