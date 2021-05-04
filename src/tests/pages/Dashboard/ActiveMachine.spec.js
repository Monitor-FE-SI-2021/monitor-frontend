import ActiveMachine from "../../../pages/Dashboard/components/ActiveMachine";
import React from "react";
import ReactDOM from 'react-dom';

describe('Active Machine tests', () => {
    it('Active machine renders successfully', () => {
        const div =document.createElement("div");
        const data = {"deviceId" : "xyz123",
        "location" : "Mostar - Braće Fejić" ,
        "name" : "Br1",
        "path" : "C:\Users\Br\Desktop\SI\Doc", "user" : "broj5@email.com"};
        const img ="som.jpg";
        const onDisconnect=(data)=>{console.log(data)};
        const getStatistics=(data,sDate,eDate)=>{console.log(data)};
        const sDate="4.4.2021";
        const eDate="8.5.2021";
        const user={"email":"broj5@email.com"};
       
        ReactDOM.render(<ActiveMachine data={data} img={img} onDisconnect={onDisconnect} getStatistics={getStatistics} 
            sDate={sDate} eDate={eDate} user={user} ></ActiveMachine>, div)
    })
})
