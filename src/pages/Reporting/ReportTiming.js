import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import  './ReportTiming.scss'

import HourPicker from './HourPicker.js';


const options = [
    {
        label: "Daily",
        value: "daily",
    },
    {
        label: "Weekly",
        value: "weekly",
    },
    {
        label: "Monthly",
        value: "monthly",
    },
    {
        label: "Yearly",
        value: "yearly",
    },
];

class ReportTiming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frequency: "daily",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ frequency: e.target.value });
    }

    render() {

        let inputType;
        
        if(this.state.frequency === 'daily'){
            inputType = < HourPicker />
        } else if(this.state.frequency === 'weekly'){
            inputType = <div> 
                <Select className="select">
                <MenuItem value="0">Monday</MenuItem>
                <MenuItem value="1">Tuesday</MenuItem>
                <MenuItem value="2">Wednesday</MenuItem>
                <MenuItem value="3">Thursday</MenuItem>
                <MenuItem value="4">Friday</MenuItem>
                <MenuItem value="5">Saturday</MenuItem>
                <MenuItem value="6">Sunday</MenuItem>
            </Select>
        < HourPicker />
        </div>
        } else if(this.state.frequency === 'monthly'){
            inputType = inputType = <div> 
       <span>
       <Select className="select">
                <MenuItem value="0">1</MenuItem>
                <MenuItem value="1">2</MenuItem>
                <MenuItem value="2">3</MenuItem>
                <MenuItem value="3">4</MenuItem>
                <MenuItem value="4">5</MenuItem>
                <MenuItem value="5">6</MenuItem>
                <MenuItem value="6">7</MenuItem>
                <MenuItem value="7">8</MenuItem>
                <MenuItem value="8">9</MenuItem>
                <MenuItem value="9">10</MenuItem>
                <MenuItem value="10">11</MenuItem>
                <MenuItem value="11">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
                <MenuItem value="17">17</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="19">19</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="21">21</MenuItem>
                <MenuItem value="22">22</MenuItem>
                <MenuItem value="23">23</MenuItem>
                <MenuItem value="24">24</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="26">26</MenuItem>
                <MenuItem value="27">27</MenuItem>
                <MenuItem value="28">28</MenuItem>
                <MenuItem value="29">29</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="31">31</MenuItem>
            </Select>
       </span>
       < HourPicker />
             </div>;
        } else if(this.state.frequency === 'yearly'){
            inputType = <div> <span>
            <Select className="select">
                <MenuItem value="0">1</MenuItem>
                <MenuItem value="1">2</MenuItem>
                <MenuItem value="2">3</MenuItem>
                <MenuItem value="3">4</MenuItem>
                <MenuItem value="4">5</MenuItem>
                <MenuItem value="5">6</MenuItem>
                <MenuItem value="6">7</MenuItem>
                <MenuItem value="7">8</MenuItem>
                <MenuItem value="8">9</MenuItem>
                <MenuItem value="9">10</MenuItem>
                <MenuItem value="10">11</MenuItem>
                <MenuItem value="11">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
                <MenuItem value="17">17</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="19">19</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="21">21</MenuItem>
                <MenuItem value="22">22</MenuItem>
                <MenuItem value="23">23</MenuItem>
                <MenuItem value="24">24</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="26">26</MenuItem>
                <MenuItem value="27">27</MenuItem>
                <MenuItem value="28">28</MenuItem>
                <MenuItem value="29">29</MenuItem>
                <MenuItem value="30">30</MenuItem>
                <MenuItem value="31">31</MenuItem>
            </Select>
       </span>
       <span>
       <Select className="select">
                <MenuItem value="0">January</MenuItem>
                <MenuItem value="1">February</MenuItem>
                <MenuItem value="2">March</MenuItem>
                <MenuItem value="3">April</MenuItem>
                <MenuItem value="4">May</MenuItem>
                <MenuItem value="5">June</MenuItem>
                <MenuItem value="6">July</MenuItem>
                <MenuItem value="7">August</MenuItem>
                <MenuItem value="8">September</MenuItem>
                <MenuItem value="9">October</MenuItem>
                <MenuItem value="10">November</MenuItem>
                <MenuItem value="11">December</MenuItem>
            </Select>
       </span>
       < HourPicker />
             </div>;
        }

        return (
            <div >
                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper"> How often do you want a report to be sent to you? </InputLabel>
                    <Select className="select" labelId="frequencyLabel" value={this.state.frequency} onChange={this.handleChange}>
                        {options.map(option => <MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>)}
                    </Select>
                </div>

                <div className="inputWrapper">
                    <InputLabel className="inputLabelWrapper"> At what time do you want an email to be sent? </InputLabel>
                    
                        {inputType}
                   
                </div>
            </div>
        );
    }
}

export default ReportTiming;
