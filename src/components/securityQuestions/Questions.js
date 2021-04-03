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
import { showSwalToast } from "../../utils/utils";

const tooken = window.localStorage.getItem(STORAGE_KEY);
const securityQuestions = "https://si-2021.167.99.244.168.nip.io:3333/AllSecurityQuestions";
const saveQuestions="https://si-2021.167.99.244.168.nip.io:3333/setSecurityQuestionsAndAnswers";

function Questions() {
    const initialFormData = {
        broj : 1
    };

    const[Questions,setQuestions]=useState([]);
    const[QuestionsID,setQuestionsID]=useState([]);
    const[FormQuestions,setFormQuestions]=useState([]);
    const[FormAnswers, setFormAnswers]=useState([]);
     const [QueSuc, setQueSuc] = useState(false)

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

 const handleSubmit = (e) => {
  e.preventDefault();
  let niz=[];
  for(let i=0;i<formData.broj+2;i++) {
  const doubleQuestion=FormQuestions.find(element=>element==document.getElementsByClassName("questions")[i].value);
   FormQuestions.push(document.getElementsByClassName("questions")[i].value);
  //var oneQuestion=document.getElementsByClassName("questions")[i].value;
  const DBQuestion=Questions.find(element=>element.Question==document.getElementsByClassName("questions")[i].value);
 // QuestionsID.push(idQuestion.QuestionId);
if(DBQuestion) {
var json={ "questionId":DBQuestion.QuestionId, "answer":document.getElementsByClassName("answers")[i].value };
if(!doubleQuestion)
niz.push(json);
  }
  }
console.log("JSON ODGOVORI");
console.log(niz);
 console.log("TOKEN");
   const token = window.localStorage.getItem(STORAGE_KEY);
 console.log(token);


   request(saveQuestions, 'post', niz)
             .then(() => {
                 setQueSuc(true);
                 showSwalToast(`successfully answered`, 'success');
             }).catch((error) => {
             console.log(error);
              showSwalToast('Invalid answers');
         })

         updateFormData(initialFormData);
         niz=[];


    }


const AddQuestion=(e)=> {
        e.preventDefault();
        if(formData.broj<=7){
const myelement = <form><p> Question {formData.broj+3}</p>    <select id="select" className="questions">
<option value="" selected disabled hidden>Choose here</option>
   {Questions.map(question=>(
  <option key={question.QuestionId}>{question.Question}</option>
           ))}
   </select><input type="text" className="answers"/></form>;
var broj=formData.broj;
var add="root"+formData.broj;
const pet=document.getElementById(add).isEmpty
broj++;
formData.broj++;
ReactDOM.render(myelement,document.getElementById(add));
}
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
                <p>Question 1</p>
                <select id="select1"   className="questions" onClick={handleChange}>
                <option value="" selected disabled hidden>Choose here</option>
      {Questions.map(question=>(
              <option key={question.QuestionId}>{question.Question}</option>
              ))}

                </select>
                <input  className="answers" type='text'
                       />
                       <p>Question 2</p>
                          <select id="select2" className="questions">
                          <option value="" selected disabled hidden>Choose here</option>
                                       {Questions.map(question=>(
                                                     <option key={question.QuestionId}>{question.Question}</option>
                                                     ))}
                                       </select>
                                       <input className="answers" type='text'
                                              />
                                              <p>Question 3</p>
                                                 <select id="select3" className="questions">
                                                 <option value="" selected disabled hidden>Choose here</option>
                                                              {Questions.map(question=>(
                                                                            <option key={question.QuestionId}>{question.Question}</option>
                                                                            ))}
                                                              </select>
                                                              <input  className="answers" type='text'
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
            <input id="submitButton" type="submit" value="Submit answers" onClick={handleSubmit}/>
            </form>

        </div>

    );
}

export default Questions;