import React, {useEffect} from "react";
import {useState} from "react";
import './MyProfile.css';


function MyProfile() {

    return (
        <div className="formDiv">
            <form className="form">
                <h1>PERSONAL INFORMATION</h1>

                <label htmlFor="Name">Name: </label>
                <input  type='text' disabled/>

                <label htmlFor="Surname">Surname: </label>
                <input type='text' disabled/>

                <label htmlFor="Address">Address: </label>
                <input type='text' disabled/>

                <label htmlFor="Number">Mobile phone: </label>
                <input type='text' disabled/>

                <label htmlFor="Email">Email: </label>
                <input type='text' disabled/>

                <input className='button' type="button" value="CHANGE PASSWORD"/>
                <input className='button' type="button" value="VERIFY & CHANGE EMAIL"/>
                <input className='button' type="button" value="VERIFY & CHANGE MOBILE PHONE"/>
            </form>
        </div>
    );
}

export default MyProfile