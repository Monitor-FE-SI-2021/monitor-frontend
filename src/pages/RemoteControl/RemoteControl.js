import React, { useState } from 'react';
import PropTypes from 'prop-types';

import request, { wsEndpoint } from "../../service";

const RemoteControl = ({ machine }) => {
    const [url, setUrl] = useState('slkadhjaksl');

    const handleClick = () => {
        request(`${wsEndpoint}/screenshot`, 'POST', { ...machine, user: 'test' })
            .then(res => {
                // Wasn't sure what the API is supposed to return so feel free to change what url is set to
                res && setUrl(res?.message);
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <div>
                <div>
                    <div className="screenshot">
                        <p>Screenshot</p>
                        <img alt="Asked image will appear here." className="screenshot-img" src={`data:image/jpeg;base64,${url}`} />
                    </div>
                </div>
            </div>

            <button type="button" onClick={handleClick}> Get Screenshot </button>
        </div>
    );
};

RemoteControl.propTypes = {
    machine: PropTypes.object.isRequired
};

export default RemoteControl;
