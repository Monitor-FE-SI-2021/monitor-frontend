import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import './Questions.css';
import {requestForgotPassword} from "../../store/modules/login/login";
import {RouteLink} from "../../store/modules/menu/menu";
import axios from "axios";
import {STORAGE_KEY} from "../../utils/consts";
import ReactDOM from 'react-dom';
import {push} from 'connected-react-router';
import request from "../../service";
import {showSwalToast} from "../../utils/utils";

const tooken = window.localStorage.getItem(STORAGE_KEY);
const securityQuestions = "https://si-2021.167.99.244.168.nip.io:3333/AllSecurityQuestions";
const saveQuestions = "https://si-2021.167.99.244.168.nip.io:3333/setSecurityQuestionsAndAnswers";
let nizOdgovora = [];

function Questions() {

    const initialFormData = {
        broj: 1
    };

    const [Questions, setQuestions] = useState([]);
    const [FormQuestions, setFormQuestions] = useState([]);
    const [QueSuc, setQueSuc] = useState(false);

    const switchRoute = (link) => {
        push(link);
    };

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();

        nizOdgovora = [];
        for (let i = 0; i < formData.broj + 2; i++) {
            FormQuestions.push(document.getElementsByClassName("questions")[i].value);
            const DBQuestion = Questions.find(element => element.Question == document.getElementsByClassName("questions")[i].value);
            if (DBQuestion) {
                var json = {
                    "questionId": DBQuestion.QuestionId,
                    "answer": document.getElementsByClassName("answers")[i].value
                };

                nizOdgovora.push(json);
            }
        }
        request(saveQuestions, 'post', nizOdgovora)
            .then(() => {
                setQueSuc(true);
                window.location.reload();
                showSwalToast(`successfully answered`, 'success');
            })
    }


    const AddQuestion = (e) => {
        e.preventDefault();
        if (formData.broj <= 2) {
            const myelement = <form><p> Question {formData.broj + 3}</p>    <select id="select" className="questions">
                <option value="" selected disabled hidden>Choose here</option>
                {Questions.map(question => (
                    <option key={question.QuestionId}>{question.Question}</option>
                ))}
            </select><input type="text" className="answers"/></form>;
            var broj = formData.broj;
            var add = "root" + formData.broj;

            const pet = document.getElementById(add).isEmpty
            broj++;
            formData.broj++;
            ReactDOM.render(myelement, document.getElementById(add));
        }
        switchRoute('/question');
    };

    useEffect(() => {
        axios.get(securityQuestions)
            .then(res => {
                setQuestions(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div className="formDiv">
            <form id="form">
                <h2>Security questions?</h2>
                <p>Question 1</p>
                <select id="select1" className="questions">
                    <option value="" selected disabled hidden>Choose here</option>
                    {Questions.map(question => (
                        <option key={question.QuestionId}>{question.Question}</option>
                    ))}

                </select>
                <input className="answers" type='text'
                />
                <p>Question 2</p>
                <select id="select2" className="questions">
                    <option value="" selected disabled hidden>Choose here</option>
                    {Questions.map(question => (
                        <option key={question.QuestionId}>{question.Question}</option>
                    ))}
                </select>
                <input className="answers" type='text'
                />
                <p>Question 3</p>
                <select id="select3" className="questions">
                    <option value="" selected disabled hidden>Choose here</option>
                    {Questions.map(question => (
                        <option key={question.QuestionId}>{question.Question}</option>
                    ))}
                </select>
                <input className="answers" type='text'
                />
                <div id="root1"></div>
                <div id="root2"></div>
                <input id="AddQuestion" type="submit" value="Add more questions" onClick={AddQuestion}/>
                <input id="submitButton" type="submit" value="Submit answers" onClick={handleSubmit}/>
            </form>

        </div>

    );
}

export default Questions;