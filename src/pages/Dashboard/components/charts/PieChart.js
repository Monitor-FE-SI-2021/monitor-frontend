import React, {Component} from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  render(){
    return (
      <div className="chart">
        <Pie
            data={this.state.chartData}

            height={300}
            width={300}
                
            options={{
                maintainAspectRatio: false, 
                title:{
                    display: 'Average RAM usage',
                    text:'Average RAM usage',
                    fontSize: 25
            },           
            }}
        />
      </div>
    )
  }
}

export default PieChart
