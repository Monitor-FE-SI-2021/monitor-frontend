import React from "react";
import { connect } from "react-redux";
import ActiveMachine from "../../components/Layout/components/ActiveMachine";

function createActiveMachineCard(machine) {
    return (
        <ActiveMachine
            img={machine.img}
            name={machine.name}
            info={machine.info}
        />
    );
}

const machines = [
    {
        img: "https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg",
        name: "Machine 1",
        info: "This machine is used for something"
    },
    {
        img: "https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg",
        name: "Machine 4",
        info: "This machine is used for something"
    },
    {
        img: "https://brain-images-ssl.cdn.dixons.com/3/6/10208063/u_10208063.jpg",
        name: "Machine 9",
        info: "This machine is used for something"
    }
];

const Dashboard = () => (
    <div className='page dashboard'>
        <h1>List of active machines</h1>
        {machines.map(createActiveMachineCard)}
    </div>
);

export default connect(state => ({}), {})(Dashboard)