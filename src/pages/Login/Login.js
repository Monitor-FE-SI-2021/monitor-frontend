import React from 'react';
import './Login.scss';
import { connect } from "react-redux";
import { doLogin } from "../../store/modules/login/login";
import { push } from "connected-react-router";
import { AsyncButton } from "../../components/AsyncButton/AsyncButton";

function Login({ doLogin, push, loginAsync, userAsync }) {

    const async = loginAsync || userAsync;

    console.log(async);

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
            // updateFormData(initialFormData);
        })
    };

    return (
        <div className="login formDiv">
            <form className="form" onSubmit={e => e.preventDefault()}>
                <h1>LOGIN</h1>

                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                <input name="password" type='password'
                       placeholder="Password"
                       value={formData.password}
                       onChange={handleChange}/>
                <AsyncButton onClick={handleSubmit}
                             async={async}
                             className='custom-btn login-btn'>Login</AsyncButton>
                <input id="forgotPasswordButton" type="button" value="Forgot password?"
                       onClick={() => switchRoute('/forgot-password-type')}/>
            </form>
        </div>
    );
}

export default connect(state => ({
    loginAsync: state.login.loginAsync,
    userAsync: state.login.userAsync,
}), { doLogin, push })(Login)