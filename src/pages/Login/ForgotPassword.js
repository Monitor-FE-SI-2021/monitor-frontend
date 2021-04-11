import { connect } from "react-redux";
import React from 'react';
import './Login.scss';
import { push } from "connected-react-router";

function ChooseTypeOfReset({push}) {

    const switchRoute = (link) => {
        push(link);
    };

    const handleSubmitEmailLink = (e) => {
        e.preventDefault();
        switchRoute('/forgot-password-email');
    };

    const handleSubmitQuestions = (e) => {
        e.preventDefault();
        switchRoute('/forgot-password-questions');
    };

    return (
        <div className="formDiv">
            <form class="form">
                <p>Choose how you want to reset your password:</p>
                <input class="submitButton" type="submit" value="Get reset link" onClick={handleSubmitEmailLink}/>
                <input class="submitButton" type="submit" value="Answer security questions" onClick={handleSubmitQuestions}/>
            </form>
        </div>
    );
}
export default connect(state => ({}), { push })(ChooseTypeOfReset);