import { connect } from "react-redux";
import { useState } from "react";

const handleClick = () => {
    console.log("called");
    fetch('http://109.237.36.76:25565/screenshot')
    .then(res => res.text())
    .then(res => console.log(res));
}


const RemoteControl = () => {

    const [url, setUrl] = useState("slkadhjaksl");

    


    
    return (
        <div className='page dashboard'>
        <h1>IWM Remote Access/Control</h1>
        
        <div>
            <div>

            </div>
            <div>
                <div>

                </div>
            </div>
        </div>

        <button type="button" onClick = {handleClick}>
            Get Screenshot
        </button>    

        </div>
    );
}

export default connect(state => ({}), {})(RemoteControl);