import React from 'react';
import axios from 'axios';
import './Login.css';

function Login() {


    const initialFormData = {
        email: "",
        password: ""
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
            password: formData.password
        };

        axios.post(`http://167.99.244.168:3333/login`,user)
            .then(res => {
                if(res.status===200) {
                    console.log(user)
                    console.log(res.data)
                    localStorage.setItem('token',res.data.accessToken);
                    alert("Token ispisan u konzoli")
                    updateFormData(initialFormData)
                }
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                alert("Invalid username or password")
            })

    };

    return (
        <div className="formDiv">
            <form id="login-form">
                <h1>LOGIN</h1>
                <input  name="email" placeholder="Email" value= {formData.email}  onChange={handleChange}/>
                <input  name="password"  placeholder="Password" value= {formData.password} onChange={handleChange}/>
                <input type="submit" value="LOG IN" onClick={handleSubmit}/>
            </form></div>
    );
}

export default Login