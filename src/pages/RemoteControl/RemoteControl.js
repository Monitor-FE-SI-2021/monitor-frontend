import { connect } from "react-redux";
import { useState } from "react";
import './RemoteControl.css'
import request, { wsEndpoint } from "../../service";

const RemoteControl = () => {

    const [url, setUrl] = useState("slkadhjaksl");

    const handleClick = async () => {

        try {

            var odgovor = await request(wsEndpoint + '/screenshot',
                "post",
                { name: 'DESKTOP-SCC', location: 'Sarajevo - SCC' });

            setUrl(odgovor.data.message);

        } catch (err) {

        }
    }

    return (
        <div className='page dashboard'>
            <h1>IWM Remote Access/Control</h1>

            <div>
                <p className="paragraph1">Quick example</p>
                <div>
                    <div className="screenshot">
                        <p>Screenshot</p>
                        <img alt="Asked image will appear here."
                             className='screenshot-img'
                             src={`data:image/jpeg;base64,${url}`}/>
                    </div>
                </div>
            </div>

            <button type="button" onClick={handleClick}>
                Get Screenshot
            </button>
        </div>
    );
}

export default connect(state => ({}), {})(RemoteControl);