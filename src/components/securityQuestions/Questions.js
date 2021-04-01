import { connect } from "react-redux";
import React from 'react';
import './Login.css';
import { requestForgotPassword } from "../../store/modules/login/login";
import { RouteLink } from "../../store/modules/menu/menu";
import ReactDOM from 'react-dom';
import { push } from 'connected-react-router';


const securityQuestions = "https://si-2021.167.99.244.168.nip.io:3333//AllSecurityQuestions"

function EmailSubmit({ requestForgotPassword }) {
    const initialFormData = {
        email: "",
        broj : 1
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

        const user = {
            email: formData.email,
        };

        requestForgotPassword(user).then(r => {

        })

    };
const AddQuestion=(e)=> {
        e.preventDefault();
const myelement = <form><p> Quesstion {formData.broj+3}</p>    <select id="select">
                                                                            <option>Select1</option>
                                                                            </select><input type="text"/></form>;
var broj=formData.broj;
var frr="root"+broj;
const pet=document.getElementById(frr).isEmpty
broj++;
formData.broj=broj;
ReactDOM.render(myelement,document.getElementById(frr));
switchRoute('/question');
};


    return (
        <div className="formDiv" >
            <form id="form">
                <h2>Security questions?</h2>
                <p>Quesstion 1:</p>
                <select id="select">
                <option>Select1</option>
                </select>
                <input name="email" type='email'
                       />
                       <p>Quesstion 2:</p>
                          <select id="select">
                                       <option>Select1</option>
                                       </select>
                                       <input name="vmdfk" type='email'
                                              />
                                              <p>Quesstion 3:</p>
                                                 <select id="select">
                                                              <option>Select1</option>
                                                              </select>
                                                              <input name="fvddf" type='email'
                       />
               <div id="root1"> </div>
               <div id="root2"> </div>
               <div id="root3"> </div>
               <div id="root4"> </div>
               <div id="root5"> </div>
               <div id="root6"> </div>
               <div id="root7"> </div>
               <div id="root8"> </div>
                <div id="root9"> </div>

              <input id="AddQuestion" type="submit" value="Add more questions" onClick={AddQuestion}/>
            <input id="submitButton" type="submit" value="Submit answers" />
            </form>

        </div>

    );
}

export default connect(state => ({}), { requestForgotPassword })(EmailSubmit);