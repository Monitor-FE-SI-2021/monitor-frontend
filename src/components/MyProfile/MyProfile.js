import React, {useEffect} from "react";
import {useState} from "react";
import './MyProfile.css';
import { push } from "connected-react-router";
import { RouteLink } from "../../store/modules/menu/menu";
import Button from "@material-ui/core/Button";
import {
    changeEmailForUser,
    checkIfEmailExists,
    getUserDetails,
    sendVerificationEmail,
    verifyEmail
} from "./VerifyEmail";
import request from "../../service";
import {showSwalToast} from "../../utils/utils";
function MyProfile() {

    const [showInitialForm, setInitialForm] = React.useState(true);

    const initialEmailValue = {
        email: ""
    };
    const [emailValue,setEmailValue] = React.useState(initialEmailValue)


    const initialFormData = {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: ""
    };

    const [formData, updateFormData] = React.useState(initialFormData);

    React.useEffect(() => {
        getUserDetails().then(res => {
            if(res && res.status==200)
            {
                updateFormData(res.data)
                const objekat = {
                    email:res.data.email
                };
                setEmailValue(objekat)
            }
        })

    },[])

    const handleChange = (e) => {
        e.preventDefault()
        setEmailValue({
            ...emailValue,
            [e.target.name]: e.target.value.trim()
        });
        console.log(emailValue)
    };

    const handleVerify = (e) => {
        e.preventDefault();

        const user = {
            email: formData.email
        }
        verifyEmail(user).then(r => {
             if (r && r.status === 200) {
                 if (r.message === "Email already verified!") {
                     showSwalToast(r.message);

                }
                 sendVerificationEmail(user).then(r => {
                     if (r && r.status === 200) {
                         showSwalToast(r.message, 'success');
                        console.log(r.message);
                         console.log(r.data.message);
                     }
                 });
             }
         });



    }


    const handleChangeEmail = (e) => {

        e.preventDefault()
        const user = {
            email: emailValue
        }

        checkIfEmailExists(user).then(r => {
            console.log(r)
            if (r===true) {
                showSwalToast("Email is already in use!");
            }
                else
                    {
                    changeEmailForUser(user).then(res => {
                    if (res && res.status === 200) {
                        showSwalToast(res.data.message, 'success')
                        console.log(res.data.message);
                    }
                });
            }
        });

    }






    if (showInitialForm) {
        return (
            <div className="formDiv">
                <form className="form">
                    <h1>PERSONAL INFORMATION</h1>

                    <label htmlFor="Name">Name: </label>
                    <input type='text' value={formData.name} disabled/>

                    <label htmlFor="Surname">Surname: </label>
                    <input type='text' value={formData.lastname} disabled/>

                    <label htmlFor="Address">Address: </label>
                    <input type='text' value={formData.address} disabled/>

                    <label htmlFor="Number">Mobile phone: </label>
                    <input type='text' value={formData.phone} disabled/>

                    <label htmlFor="Email">Email: </label>
                    <input type='text' value={formData.email} disabled/>

                    <input className='button' type="button" value="CHANGE PASSWORD"/>
                    <input className='button' type="button" value="VERIFY OR CHANGE EMAIL" onClick={() =>setInitialForm(false)}/>
                    <input className='button' type="button" value="VERIFY OR CHANGE MOBILE PHONE"/>
                </form>
            </div>
        );
    }
    return (
            <div className="formDiv">
            <form className="form">
                <h1>EMAIL VERIFICATION</h1>

                <label htmlFor="Email">Email: </label>
                <input type='text' name="email" value={emailValue.email} onChange={handleChange}/>

                <input className='button' type="button" value="CHANGE EMAIL" onClick={handleChangeEmail}/>
                <input className='button' type="button" value="VERIFY EMAIL" onClick={handleVerify}/>
                <button className="backToProfile">Back to profile</button>
            </form>
        </div>


    );
}

export default MyProfile