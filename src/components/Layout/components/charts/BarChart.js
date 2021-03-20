import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
          }
    }
    render(){
        return (
          <div className="chart">
            <Bar
                data={this.state.chartData}
    
                height={'300px'}
                width={'100px'}
                    
                options={{
                    maintainAspectRatio: false, 
                    title:{
                        display: 'Disk utilization last hour',
                        text: 'Disk utilization last hour',
                        fontSize: 25
                    },
                    scales: {
                        yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                    steps: 20,
                                    stepValue: 5,
                                    max: 100
                                }
                            }]  
                    }         
                }}
            />
          </div>
        )
      }

}

export default BarChart