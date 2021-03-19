import React from "react";
import { connect } from "react-redux";
import ActiveMachine from "../../components/Layout/components/ActiveMachine";

const Dashboard = () => (
    <div className='page dashboard'>
        <h1>List of active machines</h1>
        <ActiveMachine 
        img="https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg" 
        name="Machine 1"
        info="This machine is used for something"
        />
        <ActiveMachine 
        img="https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg" 
        name="Machine 4"
        info="This machine is used for something"
        />
        <ActiveMachine 
        img="https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg" 
        name="Machine 9"
        info="This machine is used for something"
        />
    </div>
);

export default connect(state => ({}), {})(Dashboard)