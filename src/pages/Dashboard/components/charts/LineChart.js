import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  render(){
    return (
      <div className="chart">
        <Line
            data={this.state.chartData}

            height={300}
            width={100}
                
            options={{
                maintainAspectRatio: false, 
                title:{
                    display: 'Quarterly CPU usage',
                    text:'Quarterly CPU usage',
                    fontSize: 25
            },           
            }}
        />
      </div>
    )
  }
}

export default LineChart
