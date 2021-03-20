import { connect } from "react-redux";
import './Reporting.css';


window.addEventListener('load', (event) => {
    document.getElementById('time1').style.visibility = "hidden";
  });


function handleClick(e) {
    const div = document.createElement('div');

    div.className = 'queries';

    div.innerHTML = `
    <p>AND</p>
    <select name="column" id="column">
    <option value="name">Name</option>
    <option value="location">Location</option>
    <option value="longitude">Longitude</option>
    <option value="latitude">Latitude</option>
    <option value="status">Status</option>
    <option value="lastTimeOnline">Last time online</option>
    <option value="timeLog">Time log for selected period</option>
    <option value="groupName">Group name</option>
    </select>
    ` ;

    document.getElementById('queriesManipulation').appendChild(div);

    const div1 = document.createElement('div');

    div1.className = 'typeOfComparison';

    div1.innerHTML = `
        <select name="comparison" id="comparison">
        <option value="equal">Equal</option>
        <option value="graterThan">&gt;</option>
        <option value="graterThanOrEqual">&gt;=</option>
        <option value="lessThan">&lt;</option>
        <option value="lessThanOrEqual">&lt;=</option>
        <option value="conatins">Contains</option>
        </select>
    ` ;


    document.getElementById('queriesManipulation').appendChild(div1);

    const div2 = document.createElement('div');

    div2.className = 'typeOfAnswer';

    div2.innerHTML = `
        <input id="typeOfAnswerId" type="text"></input>
    ` ;


    document.getElementById('queriesManipulation').appendChild(div2);
}

function handleClick1(e) {
    const div = document.createElement('div');

    div.className = 'queries';

    div.innerHTML = `
    <p>OR</p>
    <select name="column" id="column">
    <option value="name">Name</option>
    <option value="location">Location</option>
    <option value="longitude">Longitude</option>
    <option value="latitude">Latitude</option>
    <option value="status">Status</option>
    <option value="lastTimeOnline">Last time online</option>
    <option value="timeLog">Time log for selected period</option>
    <option value="groupName">Group name</option>
    </select>
    ` ;

    document.getElementById('queriesManipulation').appendChild(div);

    const div1 = document.createElement('div');

    div1.className = 'typeOfComparison';

    div1.innerHTML = `
        <select name="comparison" id="comparison">
        <option value="equal">Equal</option>
        <option value="graterThan">&gt;</option>
        <option value="graterThanOrEqual">&gt;=</option>
        <option value="lessThan">&lt;</option>
        <option value="lessThanOrEqual">&lt;=</option>
        <option value="conatins">Contains</option>
        </select>
    ` ;


    document.getElementById('queriesManipulation').appendChild(div1);

    const div2 = document.createElement('div');

    div2.className = 'typeOfAnswer';

    div2.innerHTML = `
        <input id="typeOfAnswerId" type="text"></input>
    ` ;


    document.getElementById('queriesManipulation').appendChild(div2);
}


function handleChange(e) {
    
    var selected = document.getElementById("email").value;
    
    if(selected == 'daily'){
        document.getElementById('update-time').type = 'time';
        document.getElementById('time1').style.visibility = "visible";
    }
    else if(selected == 'weekly'){
        document.getElementById('update-time').type = 'datetime-local';
        document.getElementById('time1').style.visibility = "visible";
    }
    else if(selected == 'monthly'){
        document.getElementById('update-time').type = 'datetime-local';
        document.getElementById('time1').style.visibility = "visible";
    }
    else if(selected == 'yearly'){
        document.getElementById('update-time').type = 'datetime-local';
        document.getElementById('time1').style.visibility = "visible";
    }else if(selected == 'nothing'){
        document.getElementById('time1').style.visibility = "hidden";
    }

}

const Reports = () => {

    return (
    
    <div className='page devices'>

        <h1> Reporting </h1>
        <h2>Query Builder</h2>
        <br/>
        <div>
            <p id="often"> How often do you want reports to be sent to you? </p>
            <select id="email" onChange={handleChange}>
                <option value="nothing"> I don't want you to email me reports </option>
                <option value="daily"> Daily </option>
                <option value="weekly"> Weekly </option>
                <option value="monthly"> Monthly </option>
                <option value="yearly"> Yearly </option>
            </select>
        </div>

        <div id="time1">
            {/* ovdje ce trebati ogranicenja u odnosu na to sta se odabere iznad, ali za to moramo sacekati BE */}
            <p id="timePar"> At what time do you want an email to be sent? </p>
            <input type="datetime-local"  id="update-time" name="update-time"/>
        </div>

        <div class="groups">
            <label for="groups" id="groupsLabel">Choose a group:</label>

            <select name="groups" id="groups">

            {/*Ovaj drop down će se popunjavati iz baze,  za sad su u njemu bezveze podaci*/}
            <option value="group1">Group 1</option>
            <option value="group2">Group 2</option>
            <option value="group3">Group 3</option>
            <option value="group4">Group 4</option>

            </select>
        </div>
        
        <div id="queriesManipulation">
        <p>Select conditions:</p>
        <button type="button" onClick={handleClick}>AND</button>
        <button type="button" onClick={handleClick1}>OR</button>
        <br></br>
        <br></br>
        <div class="queries">
            <select name="column" id="column">
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="longitude">Longitude</option>
            <option value="latitude">Latitude</option>
            <option value="status">Status</option>
            <option value="lastTimeOnline">Last time online</option>
            <option value="timeLog">Time log for selected period</option>
            <option value="groupName">Group name</option>
            </select>
        </div>

        <div class="typeOfComparison">
            <select name="comparison" id="comparison">
            <option value="equal">Equal</option>
            <option value="graterThan">&gt;</option>
            <option value="graterThanOrEqual">&gt;=</option>
            <option value="lessThan">&lt;</option>
            <option value="lessThanOrEqual">&lt;=</option>
            <option value="conatins">Contains</option>
            </select>
        </div>

        <div class="typeOfAnswer">
            <input id="typeOfAnswerId" type="text"></input>
        </div>
        <br></br>
        </div>

        <div class="table">
            <div class="device_data">
                <p> What do you want to see in your report? </p>
                {/* ovo je prvi primjer reporta, nakon sto dobijemo dodatne informacije bit ce nam lako promijeniti */}
                <h3> Device data </h3>
                <section>
                    <label for="device-name"> Name: </label>
                    <input type="checkbox" id="device-name" name="device-name"></input>
                </section>
                <section>
                    <label for="device-location"> Location: </label>
                    <input type="checkbox" id="device-location" name="device-location"></input>
                </section>
                <section>
                    <label for="device-longitude"> Longitude: </label>
                    <input type="checkbox" id="device-longitude" name="device-longitude"></input>
                </section>
                <section>
                    <label for="device-latitude"> Latitude: </label>
                    <input type="checkbox" id="device-latitude" name="device-latitude"></input>
                </section>
                <section>
                    <label for="device-status"> Status: </label>
                    <input type="checkbox" id="device-status" name="device-status"></input>
                </section>
                <section>
                    <label for="device-online"> Last time online: </label>
                    <input type="checkbox" id="device-online" name="device-online"></input>
                </section>
                <section>
                    <label for="device-log"> Time log for selected period: </label>
                    <input type="checkbox" id="device-log" name="device-log"></input>
                </section>
                <section>
                    <label for="device-group"> Group name: </label>
                    <input type="checkbox" id="device-group" name="device-group"></input>
                </section>
            </div>
        </div>
    </div>
)};

export default connect(state => ({}), {})(Reports);