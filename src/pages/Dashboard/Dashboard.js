import React from "react";
import { connect } from "react-redux";
import ActiveMachine from "../../components/Layout/components/ActiveMachine";
import PieChart from "../../components/Layout/components/charts/PieChart.js";
import LineChart from "../../components/Layout/components/charts/LineChart.js";
import ChartDonut from "../../components/Layout/components/charts/ChartDonut.js";
import BarChart from "../../components/Layout/components/charts/BarChart.js";
import MachineAvatar from "../../assets/icons/machine.png";

const Dashboard = () => (
    <div className='page dashboard'>

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
);


function createActiveMachineCard(machine) {
    return (
        <ActiveMachine
            img={machine.img}
            name={machine.name}
            info={machine.info}
        />
    );
}

// DUMMY DATA

// Api get may or may not be called here.
// The data is an example of how the data structure should look like

let chartPieDataExample = {
    labels: ['Used', 'Not used'],
    datasets:[
        {
            label:'Average RAM usage',
            data:[
                80,
                20
            ],
            backgroundColor:[
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
    datasets:[
        {
            label:'CPU usage',
            data:[
                60,
                65,
                80,
                70
            ],
            backgroundColor:[
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ]
        }
    ]
}
let chartDonutDataExample = {
    labels: ['Q1', 'Q2', 'Q3'],
    datasets:[
        {
            label:'GPU usage',
            data:[
                60,
                65,
                80
            ],
            backgroundColor:[
                'rgba(255, 206, 86, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(257, 102, 90, 0.6)'
            ]
        }
    ]
}
let currentTime = new Date().getHours();

let chartBarDataExample = {

    labels: [currentTime+':10', currentTime+':20', currentTime+':30', currentTime+':40', currentTime+':50'],
    datasets:[
        {
            label:"Disk utilization percentage",
            data:[
                10,
                20,
                30,
                40,
                50
            ],
            backgroundColor:'rgba(75, 192, 192, 0.6)'
        }
    ]
}

const machines = [
    {
        img: MachineAvatar,
        name: "Machine 1",
        info: "This machine is used for something"
    },
    {
        img: MachineAvatar,
        name: "Machine 4",
        info: "This machine is used for something"
    },
    {
        img: MachineAvatar,
        name: "Machine 9",
        info: "This machine is used for something"
    }
];

export default connect(state => ({}), {})(Dashboard)