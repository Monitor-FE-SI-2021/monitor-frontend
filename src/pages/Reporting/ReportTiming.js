import React from 'react';
import  './ReportTiming.css'


const options = [
    {
        label: "None",
        value: "none",
    },
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
            frequency: "none",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ frequency: e.target.value });
    }

    render() {

        let inputType;
        if(this.state.frequency === 'none'){
            inputType = <div><input id="noneInput" disabled type='text'/></div>
        } else if(this.state.frequency === 'daily'){
            inputType = <div><input className="timeInput" type='time'/></div>
        } else if(this.state.frequency === 'weekly'){
            inputType = <div> 
            <select id="weeklyInputDay" name="Todays_Day">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
        </select>
        <input id="weeklyInputTime" type='time'/>
        </div>
        } else if(this.state.frequency === 'monthly'){
            inputType = inputType = <div> 
       <span>
            <select id="selectDay" name="day">
                 <option value="01">1</option>
                 <option value="02">2</option>
                 <option value="03">3</option>
                 <option value="04">4</option>
                 <option value="05">5</option>
                 <option value="06">6</option>
                 <option value="07">7</option>
                 <option value="08">8</option>
                 <option value="09">9</option>
                 <option value="10">10</option>
                 <option value="11">11</option>
                 <option value="12">12</option>
                 <option value="13">13</option>
                 <option value="14">14</option>
                 <option value="15">15</option>
                 <option value="16">16</option>
                 <option value="17">17</option>
                 <option value="18">18</option>
                 <option value="19">19</option>
                 <option value="20">20</option>
                 <option value="21">21</option>
                 <option value="22">22</option>
                 <option value="23">23</option>
                 <option value="24">24</option>
                 <option value="25">25</option>
                 <option value="26">26</option>
                 <option value="27">27</option>
                 <option value="28">28</option>
                 <option value="29">29</option>
                 <option value="30">30</option>
                 <option value="31">31</option>
            </select>
       </span>
        <input className="timeInput" type='time'/>
             </div>;
        } else if(this.state.frequency === 'yearly'){
            inputType = <div> <span>
            <select id="selectMonth" name="month">
               <option value="01">January</option>
               <option value="02">February</option>
               <option value="03">March</option>
               <option value="04">April</option>
               <option value="05">May</option>
               <option value="06">June</option>
               <option value="07">July</option>
               <option value="08">August</option>
               <option value="09">September</option>
               <option value="10">October</option>
               <option value="11">November</option>
               <option value="12">December</option>
            </select> 
       </span>
       <span>
            <select id="selectDayY" name="day">
                 <option value="01">1</option>
                 <option value="02">2</option>
                 <option value="03">3</option>
                 <option value="04">4</option>
                 <option value="05">5</option>
                 <option value="06">6</option>
                 <option value="07">7</option>
                 <option value="08">8</option>
                 <option value="09">9</option>
                 <option value="10">10</option>
                 <option value="11">11</option>
                 <option value="12">12</option>
                 <option value="13">13</option>
                 <option value="14">14</option>
                 <option value="15">15</option>
                 <option value="16">16</option>
                 <option value="17">17</option>
                 <option value="18">18</option>
                 <option value="19">19</option>
                 <option value="20">20</option>
                 <option value="21">21</option>
                 <option value="22">22</option>
                 <option value="23">23</option>
                 <option value="24">24</option>
                 <option value="25">25</option>
                 <option value="26">26</option>
                 <option value="27">27</option>
                 <option value="28">28</option>
                 <option value="29">29</option>
                 <option value="30">30</option>
                 <option value="31">31</option>
            </select>
       </span>
            <input className="timeInput" type='time'/>
             </div>;
        }

        return (
            <div id="reportTimming">
                <div className="select-container">
                    <label id="qustionOften">
                        How often do you want reports to be sent to you:
                    </label>
                    <div>
                    <select id="selectOften" value={this.state.frequency} onChange={this.handleChange}>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    </div>
                </div>

                <label id="questionTime">At what time do you want an email to be sent:</label>
                    {inputType}
                
            </div>
        );
    }
}

export default ReportTiming;