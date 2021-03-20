import React from "react";
import { connect } from "react-redux";
import ActiveMachine from "../../components/Layout/components/ActiveMachine";
import PieChart from "../../components/Layout/components/charts/PieChart.js";
import LineChart from "../../components/Layout/components/charts/LineChart.js";
import ChartDonut from "../../components/Layout/components/charts/ChartDonut.js";
function createActiveMachineCard(machine) {
    return (
        <ActiveMachine
            img={machine.img}
            name={machine.name}
            info={machine.info}
        />
    );
}

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

const machines = [
    {
        img: "https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg",
        name: "Machine 1",
        info: "This machine is used for something"
    },
    {
        img: "https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg",
        name: "Machine 4",
        info: "This machine is used for something"
    },
    {
        img: "https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg",
        name: "Machine 9",
        info: "This machine is used for something"
    }
];

const Dashboard = () => (
    <div className='page dashboard'>
        <h1>List of active machines</h1>
        {machines.map(createActiveMachineCard)}

        <PieChart chartData={chartPieDataExample}/>
        <LineChart chartData={chartLineDataExample}/>
        <ChartDonut chartData={chartDonutDataExample}/>
    </div>
);

export default connect(state => ({}), {})(Dashboard)