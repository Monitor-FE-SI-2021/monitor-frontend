import { connect } from "react-redux";
import request from "../../service";
import './Reporting.css';

/*push test*/
window.addEventListener('load', (event) => {
    //document.getElementById('time1').style.visibility = "hidden";

    //Getting token manually is only for testing

    //Fetching user's groups and updating token
    request("https://si-2021.167.99.244.168.nip.io/api/group/MyAssignedGroups").then((r) => {
        window.localStorage.setItem("authorization", r.data.newAccessToken);

        var groups = [];
        r.data.data.forEach(element => {
            groups.push({ id: element["groupId"], name: element["name"] });
        });

        var listGroups = document.getElementById("groups");

        groups.forEach(element => {
            let opt = document.createElement('option');
            opt.appendChild(document.createTextNode(element["name"]));
            opt.value = element["id"];
            listGroups.appendChild(opt);
        });

    }).catch(() => {
        console.log("Unauthorized. Check the token");
    });
});

function handleClick(e) {
    var div = document.createElement("div");

    div.innerHTML = `
    <div>
    <p>AND</p>
    <br></br>
    <div class="queries">
        <select name="column" id="column" onChange={handleChange1}>
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

    <div id="typeOfComparison1">
        <select id="typeOfCompId">
            <option value="equal">Equal</option>
            <option value="conatins">Conatins</option>
        </select>
    </div>

    <div class="typeOfAnswer">
        <input class="typeOfAnswerId" type="text"></input>
    </div>
    </div>
    `;
    document.getElementById('queriesManipulation').appendChild(div);
}

function handleClick1(e) {

}


function handleChange1(e) {
    var e = document.getElementById("typeOfCompId");
    e.parentElement.removeChild(e);

    var selected1 = document.getElementById("column").value;


    if (selected1 == 'longitude' || selected1 == 'latitude') {

        const inp = document.createElement('select');

        inp.id = "typeOfCompId";

        inp.innerHTML = `
            <option value="equal">Equal</option>
            <option value="greater">&gt;</option>
            <option value="less">&lt;</option>
            <option value="greaterEqual">&gt;=</option>
            <option value="lessEqual">&lt;=</option>
        `;

        document.getElementsByClassName('typeOfAnswerId').type = 'number';
        document.getElementById('typeOfComparison1').appendChild(inp);
    } else if (selected1 == 'name' || selected1 == 'location') {
        const inp = document.createElement('select');

        inp.id = "typeOfCompId";

        inp.innerHTML = `
            <option value="equal">Equal</option>
            <option value="conatins">Contains</option>
        `;

        document.getElementsByClassName('typeOfAnswerId').type = 'text';
        document.getElementById('typeOfComparison1').appendChild(inp);

    } else if (selected1 == 'status') {
        const inp = document.createElement('select');

        inp.id = "typeOfCompId";


        inp.innerHTML = `
            <option value="yes">On</option>
            <option value="no">Off</option>
        `;

        document.getElementsByClassName('typeOfAnswerId').disabled = "true";
        document.getElementById('typeOfComparison1').appendChild(inp);
    } else if (selected1 == 'lastTimeOnline') {
        const inp = document.createElement('select');

        inp.id = "typeOfCompId";


        inp.innerHTML = `
            <option value="equal">Equal</option>
            <option value="greater">&gt;</option>
            <option value="less">&lt;</option>
            <option value="greaterEqual">&gt;=</option>
            <option value="lessEqual">&lt;=</option>
        `;

        document.getElementsByClassName('typeOfAnswerId').type = 'datetime-local';
        document.getElementById('typeOfComparison1').appendChild(inp);
    }
}

function handleChange(e) {

    var selected = document.getElementById("email").value;

    if (selected == 'daily') {
        document.getElementById('update-time').type = 'time';
        document.getElementById('time1').style.visibility = "visible";
    } else if (selected == 'weekly') {
        document.getElementById('update-time').type = 'datetime-local';
        document.getElementById('time1').style.visibility = "visible";
    } else if (selected == 'monthly') {
        document.getElementById('update-time').type = 'datetime-local';
        document.getElementById('time1').style.visibility = "visible";
    } else if (selected == 'yearly') {
        document.getElementById('update-time').type = 'datetime-local';
        document.getElementById('time1').style.visibility = "visible";
    } else if (selected == 'nothing') {
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
                    <option value="nothing"> I don't want you to email me reports</option>
                    <option value="daily"> Daily</option>
                    <option value="weekly"> Weekly</option>
                    <option value="monthly"> Monthly</option>
                    <option value="yearly"> Yearly</option>
                </select>
            </div>

            <div id="time1">
                {/* ovdje ce trebati ogranicenja u odnosu na to sta se odabere iznad, ali za to moramo sacekati BE */}
                <p id="timePar"> At what time do you want an email to be sent? </p>
                <input type="datetime-local" id="update-time" name="update-time"/>
            </div>

            <div class="groups">
                <label htmlFor="groups" id="groupsLabel">Choose a group:</label>

                <select name="groups" id="groups">

                </select>
            </div>

            <div id="queriesManipulation">
                <p>Select conditions:</p>
                <button type="button" onClick={handleClick}>AND</button>
                <button type="button" onClick={handleClick1}>OR</button>
                <br></br>
                <br></br>

                <div class="queries">
                    <select name="column" id="column" onChange={handleChange1}>
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

                <div id="typeOfComparison1">
                    <select id="typeOfCompId">
                        <option value="equal">Equal</option>
                        <option value="conatins">Conatins</option>
                    </select>
                </div>

                <div class="typeOfAnswer">
                    <input class="typeOfAnswerId" type="text"></input>
                </div>
                {/************* */}
                <div>
                    <p>AND</p>
                    <br></br>
                    <div class="queries">
                        <select name="column" id="column" onChange={handleChange1}>
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

                    <div id="typeOfComparison1">
                        <select id="typeOfCompId">
                            <option value="equal">Equal</option>
                            <option value="conatins">Conatins</option>
                        </select>
                    </div>

                    <div class="typeOfAnswer">
                        <input class="typeOfAnswerId" type="text"></input>
                    </div>
                </div>
                {/*************** */}
                <br></br>
            </div>

            <div class="table">
                <div class="device_data">
                    <p> What do you want to see in your report? </p>
                    {/* ovo je prvi primjer reporta, nakon sto dobijemo dodatne informacije bit ce nam lako promijeniti */}
                    <h3> Device data </h3>
                    <section>
                        <label htmlFor="device-name"> Name: </label>
                        <input type="checkbox" id="device-name" name="device-name"></input>
                    </section>
                    <section>
                        <label htmlFor="device-location"> Location: </label>
                        <input type="checkbox" id="device-location" name="device-location"></input>
                    </section>
                    <section>
                        <label htmlFor="device-longitude"> Longitude: </label>
                        <input type="checkbox" id="device-longitude" name="device-longitude"></input>
                    </section>
                    <section>
                        <label htmlFor="device-latitude"> Latitude: </label>
                        <input type="checkbox" id="device-latitude" name="device-latitude"></input>
                    </section>
                    <section>
                        <label htmlFor="device-status"> Status: </label>
                        <input type="checkbox" id="device-status" name="device-status"></input>
                    </section>
                    <section>
                        <label htmlFor="device-online"> Last time online: </label>
                        <input type="checkbox" id="device-online" name="device-online"></input>
                    </section>
                    <section>
                        <label htmlFor="device-log"> Time log for selected period: </label>
                        <input type="checkbox" id="device-log" name="device-log"></input>
                    </section>
                    <section>
                        <label htmlFor="device-group"> Group name: </label>
                        <input type="checkbox" id="device-group" name="device-group"></input>
                    </section>
                </div>
            </div>
            <button id="btn" type="submit" value="Submit">Submit</button>
        </div>
    )
};

export default connect(state => ({}), {})(Reports);