import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class ChartDonut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData
        }
    }

    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={this.state.chartData}

                    height={300}
                    width={300}

                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: 'Average GPU usage',
                            text: 'Average GPU usage',
                            fontSize: 25
                        },
                    }}
                />
            </div>
        )
    }
}

export default ChartDonut
