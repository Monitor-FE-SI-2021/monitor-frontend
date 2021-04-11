import { connect } from "react-redux";
import React from 'react';
import './Login.scss';
import { requestForgotPassword } from "../../store/modules/login/login";

function EmailSubmit({ requestForgotPassword }) {
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

        requestForgotPassword(user).then(r => {
        })
    };

    return (
        <div className="formDiv">
            <form class="form">
                <p>Enter your email adress:</p>
                <input name="email" type='email'
                       placeholder="example@domain.com"
                       value={formData.email}
                       onChange={handleChange}/>
                <input class="submitButton" type="submit" value="Get reset link" onClick={handleSubmit}/>
            </form>
        </div>
    );
}

export default connect(state => ({}), { requestForgotPassword })(EmailSubmit);