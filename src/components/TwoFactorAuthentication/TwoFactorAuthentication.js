import React, {useEffect} from "react";
import './TwoFactorAuthentication.css'
import {useState} from "react";
import axios from "axios";
import {STORAGE_KEY} from "../../utils/consts";
import {Update} from "@material-ui/icons";

const securityLink= "https://si-2021.167.99.244.168.nip.io:3333/QRcode";
const QrSave = "https://si-2021.167.99.244.168.nip.io:3333/QRcode/save"

function TwoFactorAuthentication() {

    const [imgLink, setImgLink] = useState("");
    const [qrSecret,setQrSecret] = useState(null)
    const [TwoFacSucc,setTwoFacSucc] = useState(false)
    const test = React.createRef();

    const initialFormData = {
        token: ""
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

        const object = {
            QrSecret: qrSecret,
            token: formData.token
        };
        console.log(object)

        let header = {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem(STORAGE_KEY),
                Accept: "application/json",
                // "Content-Type": 'application/json'
            }
        };

        axios.post(QrSave, object,header)
            .then((response) => {
                if(response.status==200)
                {
                    localStorage.setItem(STORAGE_KEY, response.data.accessToken);
                    setTwoFacSucc(true)

                }
            }, (error) => {
                console.log(error);
                alert("Invalid token")
            });
        updateFormData(initialFormData)

    }

    useEffect(async () => {
        const result = await axios(
            securityLink,
        );

        setQrSecret(result.data.QrSecret)
        setImgLink(result.data.QRcode)

    },[]);



    return (
         <div className="QrMain">
        <form className="login-form-security">
            <h1>TWO - FACTOR AUTHENTICATION </h1>
            <img src={imgLink} alt="Slika"/>
            <input name="token" type="text" placeholder="Your code" value={formData.token} onChange={handleChange}/>
            <input type="submit" value="ACTIVATE" onClick={handleSubmit}/>
        </form>
             {
                 TwoFacSucc && <h1>Security updated</h1>
             }
    </div>

    );
}
export default TwoFactorAuthentication