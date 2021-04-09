import React, { useEffect } from "react";
import { useState } from "react";
import './MyProfile.css';
import { push } from "connected-react-router";



function MyProfile() {
    const switchRoute = (link) => {
        push(link);
    };

    const verify = () => {
        switchRoute("/login");
    }
    return (
        <div className="formDiv">
            <form className="form">
                <h1>PERSONAL INFORMATION</h1>

                <label htmlFor="Name">Name: </label>
                <input type='text' disabled />

                <label htmlFor="Surname">Surname: </label>
                <input type='text' disabled />

                <label htmlFor="Address">Address: </label>
                <input type='text' disabled />

                <label htmlFor="Number">Mobile phone: </label>
                <input type='text' disabled />

                <label htmlFor="Email">Email: </label>
                <input type='text' disabled />

                <input className='button' type="button" value="CHANGE PASSWORD" />
                <input className='button' type="button" value="VERIFY & CHANGE EMAIL" />
                <input className='button' type="button" value="VERIFY & CHANGE MOBILE PHONE" />
                <button className="custom-btn" onClick={() => console.log("nesto radi")}>Nesto radi</button>
                <button className="custom-btn" onClick={() => switchRoute("/VerifyEmail")}>VERIFY & CHANGE EMAIL</button>
                <button className="custom-btn" onClick={() => verify}>VERIFY & CHANGE MOBILE PHONE</button>
            </form>
        </div>
    );
}

export default MyProfile