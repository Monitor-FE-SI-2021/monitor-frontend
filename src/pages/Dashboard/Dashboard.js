import React from "react";
import { connect } from "react-redux";
import MachineIcon from "../../assets/icons/machine.png";
import DonutChart from "./components/charts/DonutChart";
import BarChart from "./components/charts/BarChart";
import ActiveMachine from "./components/ActiveMachine";
import request, { devices, errors } from "../../service";
import GoogleMapMonitors from "./components/GoogleMapMonitors";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./dashboard.scss";
import {Bar} from "react-chartjs-2";
import {STORAGE_KEY} from "../../utils/consts";
import { LiveTv } from "@material-ui/icons";


let barChart = {

    labels: ['0', '100', '200', '300', '400', '500'],
    datasets:[
        {
            label:"Number of errors of type",
            data:[
                0,
                0,
                0,
                0,
                0
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


function convertStatistics(statistic) {
    return [Math.round(statistic * 100), Math.round((1 - statistic) * 100)];
}

const allMachinesString = "All machines"

let removedMachine = null
let clickedMachine = null
let allMachinesUsage = null
let lastDisconnected = null
let allErrors = []

export let barchartMaxValue = 10

const Dashboard = ({ user }) => {
    
    let activeMachines = []
    const [machines, setMachines] = React.useState([]);
    const [active, setActive] = React.useState([...activeMachines]);
    const [showCharts, setShowCharts] = React.useState(false);
    let end = new Date();
    const [endDate, setEndDate] = React.useState(end);
    let start = new Date(end.getTime() - (7 * 24 * 60 * 60 * 1000));
    const [startDate, setStartDate] = React.useState(start);
    let [chartType, setChartType] = React.useState(true)


    
    
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

    function getStatistics(machine, startDate, endDate) {

        request(errors + "/DateInterval?DeviceUID=" + machine.deviceUid + "&StartDate=" + startDate + "&EndDate" + endDate)
            .then((res) => res.data.data)
            .then((res) => {
                console.log([res])
                setErrorCharts([res])
            })

        request(devices + "/GetDeviceLogs?deviceId=" + machine.deviceId + "&startDate=" + startDate + "&endDate=" + endDate)
            .then((res) => res.data.data)
            .then((res) => {
                setCharts(res, machine);
            })
            .catch((err) => console.log(err));
    }

    function getAllDevicesStatistics(startDate, endDate) {
        request(errors + "/AllDateInterval?StartDate=" + startDate + "&EndDate" + endDate)
            .then((res) => allErrors = res.data.data)
            .then(() => setErrorCharts(allErrors))

        request(devices + "/GetAverageHardwareUsageForUser?startDate=" + startDate + "&endDate" + endDate)
            .then((res) => {
                allMachinesUsage = res.data.data
                setCharts(allMachinesUsage, { name: allMachinesString })
            })
    }

    function datePickerChange(startDate, endDate) {
        startDate = startDate.toISOString()
        endDate = endDate.toISOString()
        console.log(startDate, endDate)
        if (clickedMachine?.name === allMachinesString) {
            getAllDevicesStatistics(startDate, endDate)
        }
        else {
            getStatistics(clickedMachine, startDate, endDate)
        }
    }

    function setErrorCharts(errorList) {
        let numberOfEachError = [0,0,0,0,0,0]
        errorList.forEach((machine) => {
            const errorsByType = machine.errorTypeInfos
            errorsByType.forEach((error) => {
                numberOfEachError[Math.floor(error.code / 100)] += error.errorCodeNumber
            })
        })
        barchartMaxValue = numberOfEachError.reduce((a,b) => a+b, 0)
        if (barchartMaxValue === 0 || barchartMaxValue % 10 !== 0)
            barchartMaxValue = barchartMaxValue + (10 - barchartMaxValue % 10)
        barChart.datasets[0].data = numberOfEachError
    }


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

        getAllDevicesStatistics(startDate.toISOString(), endDate.toISOString())

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
                setErrorCharts(allErrors)
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
                                    sDate={startDate.toISOString()}
                                    eDate={endDate.toISOString()}
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
                    <div className="statistics">
                        <h2 className="machineName">{clickedMachine?.name}</h2>
                    <br></br>

                        <div className="pickers">
                        <h5 className="picker-h5">Date range:</h5>
                        <DatePicker
                         className="picker"
                         selected={startDate}
                         onChange={date => {
                            date.setHours(0, 0, 0);
                            setStartDate(date)
                            datePickerChange(date, endDate)
                         }}
                         maxDate={endDate}
                         className="my-custom-input" // custom class
                        />
                        <DatePicker
                         className="picker"
                         selected={endDate}
                         onChange={date => {
                             date.setHours(23, 59, 59);
                             setEndDate(date)
                             datePickerChange(startDate, date)
                        }}
                         minDate={startDate}
                         className="my-custom-input" // custom class
                        />
                       <br></br>
                        </div>
                        <div className="stats">
                        <button onClick={() => {setChartType(chartType = true)}}>Hardware Usage</button>
                        <button onClick={() => {setChartType(chartType = false)}}>Errors</button>
                        </div>
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
                    allErrors={allErrors}
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