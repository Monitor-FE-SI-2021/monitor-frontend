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
    const[QuestionsID,setQuestionsID]=useState([]);
    const[FormQuestions,setFormQuestions]=useState([]);
    const[FormAnswers, setFormAnswers]=useState([]);

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

  //FormAnswers.push(document.getElementsByClassName("answers")[i].value);
   FormQuestions.push(document.getElementsByClassName("questions")[i].value);
  var oneQuestion=document.getElementsByClassName("questions")[i].value;
  const idQuestion=Questions.find(element=>element.Question==oneQuestion);
  QuestionsID.push(idQuestion.QuestionId);

var json={ "questionId":idQuestion.QuestionId, "answer":document.getElementsByClassName("answers")[i].value };
if(!doubleQuestion)
niz.push(json);
  }



console.log("Pitanjaaaa");
console.log(FormQuestions);
console.log("odgovor");
console.log(FormAnswers);
console.log("ID");
console.log(Questions);
console.log("Jedan Id");
console.log(Questions[0].QuestionId);
console.log("idijeeviii");
    console.log(QuestionsID);
console.log("JSON ODGOVORI");
console.log(niz);
    };


const AddQuestion=(e)=> {
        e.preventDefault();
        if(formData.broj<=7){
const myelement = <form><p> Quesstion {formData.broj+3}</p>    <select id="select" className="questions">
                                                                            {Questions.map(question=>(
                                                                                          <option key={question.QuestionId}>{question.Question}</option>
                                                                                          ))}
                                                                            </select><input type="text" className="answers"/></form>;
var broj=formData.broj;
var frr="root"+broj;
const pet=document.getElementById(frr).isEmpty
broj++;
formData.broj=broj;
ReactDOM.render(myelement,document.getElementById(frr));
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
                <p>Quesstion 1:</p>
                <select id="select1" className="questions" onClick={handleChange}>
      {Questions.map(question=>(
              <option key={question.QuestionId}>{question.Question}</option>
              ))}

                </select>
                <input name="email" className="answers" type='email'
                       />
                       <p>Quesstion 2:</p>
                          <select id="select2" className="questions">
                                       {Questions.map(question=>(
                                                     <option key={question.QuestionId}>{question.Question}</option>
                                                     ))}
                                       </select>
                                       <input name="vmdfk"className="answers" type='email'
                                              />
                                              <p>Quesstion 3:</p>
                                                 <select id="select3" className="questions">
                                                              {Questions.map(question=>(
                                                                            <option key={question.QuestionId}>{question.Question}</option>
                                                                            ))}
                                                              </select>
                                                              <input name="fvddf" className="answers" type='email'
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