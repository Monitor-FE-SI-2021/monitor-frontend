import { connect } from "react-redux";
import React, { useEffect,useState } from "react";
import './Questions.css';
import { requestForgotPassword } from "../../store/modules/login/login";
import { RouteLink } from "../../store/modules/menu/menu";
import axios from "axios";
import { STORAGE_KEY } from "../../utils/consts";
import ReactDOM from 'react-dom';
import { push } from 'connected-react-router';
import request from "../../service";


const securityQuestions = "http://localhost:3333/AllSecurityQuestions"

function Questions() {
    const initialFormData = {
        email: "",
        pitanja:[],
        broj : 1
    };
    const[Questions,setQuestions]=useState([]);
    const[FormQuestions,setFormQuestions]=useState([]);
 const switchRoute = (link) => {
        push(link);
    };

    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
 updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
console.log(e.target.value);

    };


 const Provera = (e) => {
  e.preventDefault();
  FormQuestions.push(document.getElementById("select1").value);
          FormQuestions.push(document.getElementById("select2").value);
          FormQuestions.push(document.getElementById("select3").value);
  if(formData.broj>1) {
 for(let i=0;i<formData.broj-1;i++){
      FormQuestions.push(document.getElementsByClassName("example")[i].value);
  }
  }
  else{
    console.log("Prva");
  console.log(document.getElementById("select1").value);
  console.log("Druga");
   console.log(document.getElementById("select2").value);
     console.log("Druga");
      console.log(document.getElementById("select3").value);
}
console.log(FormQuestions);
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
const myelement = <form><p> Quesstion {formData.broj+3}</p>    <select id="select" className="example">
                                                                            {Questions.map(question=>(
                                                                                          <option key={question.QuestionId}>{question.Question}</option>
                                                                                          ))}
                                                                            </select><input type="text"/></form>;
var broj=formData.broj;
var frr="root"+broj;
const pet=document.getElementById(frr).isEmpty
broj++;
formData.broj=broj;
ReactDOM.render(myelement,document.getElementById(frr));
switchRoute('/question');
};

useEffect(()=>{
        axios.get(securityQuestions)
                .then(res=>{
             console.log(res);
             setQuestions(res.data);
       })
       .catch(err=>{
         console.log(err);
      })
  },[])




    return (
        <div className="formDiv" >
                    <form id="form">
                <h2>Security questions?</h2>
                <p>Quesstion 1:</p>
                <select id="select1" onClick={handleChange}>
      {Questions.map(question=>(
              <option key={question.QuestionId}>{question.Question}</option>
              ))}

                </select>
                <input name="email" type='email'
                       />
                       <p>Quesstion 2:</p>
                          <select id="select2">
                                       {Questions.map(question=>(
                                                     <option key={question.QuestionId}>{question.Question}</option>
                                                     ))}
                                       </select>
                                       <input name="vmdfk" type='email'
                                              />
                                              <p>Quesstion 3:</p>
                                                 <select id="select3">
                                                              {Questions.map(question=>(
                                                                            <option key={question.QuestionId}>{question.Question}</option>
                                                                            ))}
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
                <div id="root10"> </div>
              <input id="AddQuestion" type="submit" value="Add more questions" onClick={AddQuestion}/>
            <input id="submitButton" type="submit" value="Submit answers" onClick={Provera}/>
            </form>

        </div>

    );
}

export default Questions;