import { connect } from "react-redux";
import React from 'react';
import './Login.css';
import { requestReset } from "../../store/modules/login/forgotPassword";

function EmailSubmit({requestReset}) {
    const initialFormData = {
        email: ""
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
        };

        requestReset(user).then(r => {
            
        })

    };

    return (
        <div className="formDiv">
            <form id="login-form">
                <h2>Forgot password?</h2>
                <p>Enter your email adress:</p>
                <input name="email" type='email'
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleChange} />
                <input id = "submitButton" type="submit" value="Get reset link" onClick={handleSubmit} />
            </form>
        </div>
    );
}

export default connect(state => ({}), {requestReset})(EmailSubmit);