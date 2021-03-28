import React from "react";
import { connect } from "react-redux";
import MachineIcon from '../../assets/icons/machine.png'
import PieChart from "./components/charts/PieChart";
import LineChart from "./components/charts/LineChart";
import ChartDonut from "./components/charts/ChartDonut";
import BarChart from "./components/charts/BarChart";
import ActiveMachine from "./components/ActiveMachine";
import request, { devices } from "../../service";
import './dashboard.scss'

// DUMMY DATA

// Api get may or may not be called here.
// The data is an example of how the data structure should look like

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
                /*            'rgba(255, 206, 86, 0.6)',
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                              'rgba(255, 159, 64, 0.6)',
                              'rgba(255, 99, 132, 0.6)'*/
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
    labels: ['Q1', 'Q2', 'Q3'],
    datasets: [
        {
            label: 'GPU usage',
            data: [
                60,
                65,
                80
            ],
            backgroundColor: [
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(257, 102, 90, 0.6)'
            ]
        }
    ]
}
let currentTime = new Date().getHours();

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

const Dashboard = ({ user }) => {
    const [allLogs, setAllLogs] = React.useState([])
    const [machines, setMachines] = React.useState([])

    const groupId = user?.userGroups[0]?.groupId || 2;

    React.useEffect(() => {
        request(devices + "/AllDevicesForGroup?groupId=" + groupId)
            .then((res) => {
                setMachines(res.data.data.devices)
            })
            .catch((err) => console.log(err))

        request(devices + "/GetAllDeviceLogs")
            .then((resp) => resp.data)
            .then((logs) => {
                setAllLogs(logs.data)
                /*setMachines(smtn.data.filter((value, index, self) => {
                  return self.findIndex(v => v.deviceId === value.deviceId) === index
                }))*/
            })
            .catch((err) => console.log(err))

    }, [])

    return (
        <div className='page'>
            <div className='dashboard'>
                <div className='row machine-cards'>
                    <h1>List of active machines</h1>
                    <div className='scrollable'>
                        {machines.map(createActiveMachineCard)}
                    </div>
                </div>

                <div className='row'>
                    <PieChart chartData={chartPieDataExample}/>
                    <LineChart chartData={chartLineDataExample}/>
                </div>

                <div className='row'>
                    <ChartDonut chartData={chartDonutDataExample}/>
                    <BarChart chartData={chartBarDataExample}/>
                </div>
            </div>
        </div>
    );
}


function createActiveMachineCard(machine) {
    return (
        <ActiveMachine
            key={machine.name}
            img={MachineIcon}
            name={machine.name}
            info={new Date(machine.lastTimeOnline).toGMTString()}
        />
    );
}

export default connect(state => ({
    user: state.login.user,
}), {})(Dashboard)