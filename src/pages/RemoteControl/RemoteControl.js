import { connect } from "react-redux";
import { useState } from "react";
import './RemoteControl.css'
import request, { wsEndpoint } from "../../service";
import Tabs from '../../components/Tabs/Tabs'


const RemoteControl = () => {

    

    return (
        <div className='page dashboard'>
            <h1>IWM Remote Access/Control</h1>
            <Tabs></Tabs>
            
        </div>
    );
}

export default connect(state => ({}), {})(RemoteControl);