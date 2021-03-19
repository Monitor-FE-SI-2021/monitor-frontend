import { connect } from "react-redux";
import './Reporting.css';


const Reports = () => (
    
    <div className='page devices'>

        <h1> Reporting </h1>

        <div>
            <p id="often"> How often do you want reports to be sent to you? </p>
            <select class="email">
                <option> I don't want you to email me reports </option>
                <option value="daily"> Daily </option>
                <option value="weekly"> Weekly </option>
                <option value="monthly"> Monthly </option>
                <option value="yearly"> Yearly </option>
            </select>
        </div>

        <div>
            {/* ovdje ce trebati ogranicenja u odnosu na to sta se odabere iznad, ali za to moramo sacekati BE */}
            <p id="time1"> At what time do you want an email to be sent? </p>
            <input type="datetime-local" id="update-time" name="update-time"/>
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
);

export default connect(state => ({}), {})(Reports);