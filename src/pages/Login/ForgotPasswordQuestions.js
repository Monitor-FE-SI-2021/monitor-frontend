import React from 'react';
import { connect } from "react-redux";
import './Login.scss';
import { fetchAllUsersQuestions, checkAnswers } from "../../store/modules/login/login";
import { Spinner } from "../../components/Spinner/Spinner";
import { useState } from 'react';
import { push } from "connected-react-router";

function QuestionsSubmit({ token, userQuestions, fetchAllUsersQuestions, checkAnswers, push }) {

    const switchRoute = (link) => {
        push(link);
    };

    const [state, setState] = useState('start');

    const initialFormData = {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        email: '',
    };

    const [formData, updateFormData] = React.useState(initialFormData);

    let ids = [];
    let questions = [];

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const sacurityQuestionsAnswers = [
            {
                Answer: formData.answer1,
                QuestionId: ids[0]
            },
            {
                Answer: formData.answer2,
                QuestionId: ids[1]
            },
            {
                Answer: formData.answer3,
                QuestionId: ids[2]
            },
            //if 4th and/or 5th question is missing ids below will be undefined and answers will be ignored in backend 
            {
                Answer: formData.answer4,
                QuestionId: ids[3]
            },
            {
                Answer: formData.answer5,
                QuestionId: ids[4]
            }
        ]

        const data = {
            email: formData.email,
            answers: sacurityQuestionsAnswers
        };

        checkAnswers(data).then(r => {
        });
    };

    const handleSubmitEmail = (e) => {

        e.preventDefault();

        const user = {
            email: formData.email
        };

        fetchAllUsersQuestions(user).then(r => {
            setState('add-trip');
        });
    };

    if (userQuestions) userQuestions.map(question => {
        ids.push(question.QuestionId);
        questions.push(question.Question);
    });

    if (token) {
        switchRoute('/password-reset/' + token);
        token = null;
    }

    return (
        <div className="login formDiv">
            {state === 'start' &&
            <div>
                <form class="form">
                    <p>Enter your email adress:</p>
                    <input name="email" type='email'
                           placeholder="example@domain.com"
                           value={formData.email}
                           onChange={handleChange}/>
                    <input class="submitButton" type="submit" value="Get security questions"
                           onClick={handleSubmitEmail}/>
                </form>
            </div>
            }
            {state === 'add-trip' &&
            <form class="form">
                {questions.length == 0 && <p>Sorry, you don't have this option.</p>}
                {questions.length != 0 &&
                <div>
                    <h3>Please answer your security questions below:</h3>
                    <p>{questions[0]}</p><input name="answer1" value={formData.answer1} onChange={handleChange}/>
                    <p>{questions[1]}</p><input name="answer2" value={formData.answer2} onChange={handleChange}/>
                    <p>{questions[2]}</p><input name="answer3" value={formData.answer3} onChange={handleChange}/>
                    {questions.length === 4 &&
                    <div>
                        <p>{questions[3]}</p><input name="answer4" value={formData.answer4} onChange={handleChange}/>
                    </div>
                    }
                    {questions.length == 5 &&
                    <div>
                        <p>{questions[3]}</p><input name="answer4" value={formData.answer4} onChange={handleChange}/>
                        <p>{questions[4]}</p><input name="answer5" value={formData.answer5} onChange={handleChange}/>
                    </div>
                    }
                    <input class="submitButton" type="submit" value="Verify identity" onClick={handleSubmit}/>
                </div>
                }
            </form>
            }
        </div>
    );
}

export default connect(state => ({
    token: state.login.token,
    userQuestions: state.login.userQuestions
}), { fetchAllUsersQuestions, checkAnswers, push })(QuestionsSubmit);