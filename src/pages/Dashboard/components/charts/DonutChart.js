import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class DonutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTitle: props.displayTitle,
            chartData: props.chartData
        }
    }

    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={
                        this.state.chartData}

                    height={300}
                    width={300}

                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: this.state.displayTitle,
                            text: this.state.displayTitle,
                            fontSize: 25
                        },
                    }}
                />
            </div>
        )
    }
}

export default DonutChart
