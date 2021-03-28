import React from "react";
import {connect} from "react-redux";
import MachineIcon from "../../assets/icons/machine.png";
import PieChart from "./components/charts/PieChart";
import LineChart from "./components/charts/LineChart";
import DonutChart from "./components/charts/DonutChart";
import BarChart from "./components/charts/BarChart";
import ActiveMachine from "./components/ActiveMachine";
import request, {devices} from "../../service";

import "./dashboard.scss";
import {act} from "@testing-library/react";

// DUMMY DATA

// Api get may or may not be called here.
// The data is an example of how the data structure should look like

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
/*
let chartPieDataExample = {
    labels: ['Used', 'Not used'],
    datasets: [
        {
            label: 'Average RAM usage',
            data: [
                80,
                20
            ],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                              'rgba(255, 159, 64, 0.6)',
                              'rgba(255, 99, 132, 0.6)'
            ]
        }
    ]
}

let chartLineDataExample = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
        {
            label: 'CPU usage',
            data: [
                60,
                65,
                80,
                70
            ],
            backgroundColor: [
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ]
        }
    ]
}
let chartDonutDataExample = {
    labels: ['Used', 'Not used'],
    datasets: [
        {
            label: 'GPU usage',
            data: [
                60,
                40
            ],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ]
        }
    ]
}

let chartBarDataExample = {

    labels: [currentTime + ':10', currentTime + ':20', currentTime + ':30', currentTime + ':40', currentTime + ':50'],
    datasets: [
        {
            label: "Disk utilization percentage",
            data: [
                10,
                20,
                30,
                40,
                50
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }
    ]
}

 */
let currentTime = new Date().getHours();

/*let activeMachines = [
    {
        name: "Desktop PC 1",
        location: "Sarajevo - BBI",
        ip: "255.255.255.0",
        path: "C:/user/programfiles",
    },
    {
        name: "Desktop PC 2",
        location: "Sarajevo - BBI",
        ip: "255.255.255.0",
        path: "C:/user/programfiles",
    },
    {
        name: "Desktop PC",
        location: "Mostar - Mepas Mall",
        ip: "255.255.255.0",
        path: "C:/user/programfiles",
    },
];*/

function convertStatistics(statistic) {
    return [Math.round(statistic * 100), Math.round((1 - statistic) * 100)];
}

let removedMachine = null
let clickedMachine = null

const Dashboard = ({user}) => {

    let activeMachines = []
    const [machines, setMachines] = React.useState([]);
    const [active, setActive] = React.useState([...activeMachines]);
    const [showCharts, setShowCharts] = React.useState(false);

    function filterActive(activeMachines, allMachines) {
        return activeMachines.filter((machine) => {
            const existingMachine = allMachines.find(({name, location}) => {
                return machine.status !== "Disconnected" && name === machine.name && location === machine.location;
            });
            if (existingMachine) {
                machine.deviceId = existingMachine.deviceId;
                machine.lastTimeOnline = existingMachine.lastTimeOnline;
            }
            return existingMachine;
        });
    }

    React.useEffect(() => {
        request(devices + "/AllDevices")
            .then((res) => {
                const allMachines = res.data.data;
                setMachines(allMachines);
                request("https://si-grupa5.herokuapp.com/api/agent/online")
                    .then((res) => {
                        console.log(res)
                        setActive(filterActive(res?.data, allMachines));
                    })
            })
            .catch((err) => console.log(err));

      /*  request("https://si-grupa5.herokuapp.com/api/agent/online").then((res) => {
            console.log(res);
        });*/
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
                name: machine.name,
                location: machine.location,
                ip: machine.ip,
                user: user
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
            cloned.splice(index, 1);
            if (removedMachine?.deviceId === clickedMachine?.deviceId)
                setShowCharts(false)
            setActive(cloned);
        }
    };

    const setCharts = ({
                           averageCPUUsage,
                           averageGPUUsage,
                           averageHDDUsage,
                           averageRamUsage,
                       }, machine) => {
        clickedMachine = machine
        if (removedMachine?.deviceId !== machine?.deviceId) {
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
                        {active.map((machine, id) => (
                            <ActiveMachine
                                key={id}
                                data={machine}
                                img={MachineIcon}
                                fun={disconnectMachine}
                                setCharts={setCharts}
                            />
                        ))}
                    </div>
                </div>

                {showCharts && (
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
                )}
                {showCharts && (
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
                )}
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