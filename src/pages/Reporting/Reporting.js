import { connect } from "react-redux";

const Reports = () => (
    <div className='page devices'>
        <h1> Reporting </h1>

        <div>
            <p> How often do you want reports to be sent to you? </p>
            <select>
                <option> I don't want you to email me reports </option>
                <option value="daily"> Daily </option>
                <option value="weekly"> Weekly </option>
                <option value="monthly"> Monthly </option>
                <option value="yearly"> Yearly </option>
            </select>
        </div>

        <div>
            {/* ovdje ce trebati ogranicenja u odnosu na to sta se odabere iznad, ali za to moramo sacekati BE */}
            <p> At what time do you want an email to be sent? </p>
            <input type="datetime-local" id="update-time" name="update-time"/>
        </div>

        <div>
            <p> What do you want to see in your report? </p>
            <div>
                {/* ovo je prvi primjer reporta, nakon sto dobijemo dodatne informacije bit ce nam lako promijeniti */}
                <h3> Device data </h3>
                <div>
                    <label for="device-name"> Name: </label>
                    <input type="checkbox" id="device-name" name="device-name"></input>
                </div>
                <div>
                    <label for="device-location"> Location </label>
                    <input type="checkbox" id="device-location" name="device-location"></input>
                </div>
                <div>
                    <label for="device-longitude"> Longitude </label>
                    <input type="checkbox" id="device-longitude" name="device-longitude"></input>
                </div>
                <div>
                    <label for="device-latitude"> Latitude: </label>
                    <input type="checkbox" id="device-latitude" name="device-latitude"></input>
                </div>
                <div>
                    <label for="device-status"> Status: </label>
                    <input type="checkbox" id="device-status" name="device-status"></input>
                </div>
                <div>
                    <label for="device-online"> Last time online: </label>
                    <input type="checkbox" id="device-online" name="device-online"></input>
                </div>
                <div>
                    <label for="device-log"> Time log for selected period: </label>
                    <input type="checkbox" id="device-log" name="device-log"></input>
                </div>
                <div>
                    <label for="device-group"> Group name: </label>
                    <input type="checkbox" id="device-group" name="device-group"></input>
                </div>
            </div>
        </div>
    </div>
);

export default connect(state => ({}), {})(Reports);