import React from 'react';
import './Login.css';
import { connect } from "react-redux";
import { doLogin } from "../../store/modules/login/login";
import { RouteLink } from "../../store/modules/menu/menu";
import { push } from "connected-react-router";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ForgotPassword from "../../pages/Login/ForgotPassword";

function Login({ doLogin, push }) {

    const switchRoute = (link) => {
        push(link);
    };

    const initialFormData = {
        email: "",
        password: ""
    };

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const user = {
            email: formData.email,
            password: formData.password
        };

        doLogin(user).then(r => {
            updateFormData(initialFormData);
        })
    };

    const handleForgot = (e) => {
        e.preventDefault();
        switchRoute('forgot-password');
        console.log("lasdj");
    };

    return (
        <div className="formDiv">
            <form id="login-form">
                <h1>LOGIN</h1>
                
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input name="password" type='password'
                       placeholder="Password"
                       value={formData.password}
                       onChange={handleChange}/>
                <input id = "submitButton" type="submit" value="LOG IN" onClick={handleSubmit}/>
                <input id = "forgotPasswordButton" type="button" value="Forgot password?" onClick={()=>switchRoute('forgot-password')}/>
            </form>
        </div>
    );
}

export default connect(state => ({}), { doLogin, push })(Login)