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

function EmailSubmit({ requestForgotPassword }) {
    const initialFormData = {
        email: "",
        pitanja:[],
        broj : 1
    };
    const[Questions,setQuestions]=useState([]);
    const[JSONQuestions,setJSONQuestions]=useState([]);
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
/*
useEffect(async () => {
        const result = await request(
            securityQuestions,
        );

   setQuestions(result.data[0].Question);
       // setQrSecret(result.data.QrSecret)
        //setImgLink(result.data.QRcode)
        //formData.pitanja =await result.json();
        var i;
        for(i=0;i<result.data.length;i++) {
                console.log(result.data.length);
             console.log(result.data[i].Question);
             setQuestions(Questions.concat(result.data[i].Question));
        }
// setQuestions(result.data[0]);
        console.log(result.data.Question)
        console.log(Questions);
   //     setItems(items);
        //console.log(formData.pitanja[0]);
    }, []);
*/
useEffect(()=>{
        axios.get(securityQuestions)
                .then(res=>{
             console.log(res);
             setQuestions(res.data);
       })
       .catch(err=>{
         console.log(err);
      })
  })




    return (
        <div className="formDiv" >
                    <form id="form">
                <h2>Security questions?</h2>
                <p>Quesstion 1:</p>
                <select id="select">
      {Questions.map(question=>(
              <option key={question.QuestionId}>{question.Question}</option>
              ))}

                </select>
                <input name="email" type='email'
                       />
                       <p>Quesstion 2:</p>
                          <select id="select">
                                       {Questions.map(question=>(
                                                     <option key={question.QuestionId}>{question.Question}</option>
                                                     ))}
                                       </select>
                                       <input name="vmdfk" type='email'
                                              />
                                              <p>Quesstion 3:</p>
                                                 <select id="select">
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
            <input id="submitButton" type="submit" value="Submit answers" />
            </form>

        </div>

    );
}

export default connect(state => ({}), { requestForgotPassword })(EmailSubmit);