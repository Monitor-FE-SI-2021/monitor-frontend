import { connect } from "react-redux";
import React from 'react';
import './Login.scss';
import { requestResetPassword } from "../../store/modules/login/login";
import { push } from 'connected-react-router';
import { showSwalToast } from "../../utils/utils";

function NewPassword({ requestResetPassword, push }) {
    const initialFormData = {
        password: "",
        repeatedPassword: ""
    };

    const switchRoute = (link) => {
        push(link);
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
        const pathname = window.location.pathname;

        if (formData.password !== formData.repeatedPassword)
            showSwalToast("Passwords don't match!");

        else {
            const data = {
                password: formData.password,
                token: pathname.substring(pathname.lastIndexOf('/') + 1),
            }

            requestResetPassword(data).then(r => {
                showSwalToast("Password changed successfully!", 'success');
                switchRoute('/login');
            })
        }
    };

    return (
        <div className="login formDiv">
            <form className="form">
                <h3>Reset your password</h3>
                <input name="password" type='password'
                       placeholder="New password"
                       value={formData.password}
                       onChange={handleChange}/>
                <input name="repeatedPassword" type='password'
                       placeholder="Confirm password"
                       value={formData.repeatedPassword}
                       onChange={handleChange}/>
                <input class="submitButton" type="submit" value="Reset password" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

export default connect(state => ({}), { requestResetPassword, push })(NewPassword);