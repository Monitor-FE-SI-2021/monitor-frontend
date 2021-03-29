import React, { useEffect } from "react";
import './TwoFactorAuthentication.css'
import { useState } from "react";
import axios from "axios";
import { STORAGE_KEY } from "../../utils/consts";
import { Update } from "@material-ui/icons";
import { showSwalToast } from "../../utils/utils";
import request from "../../service";

const securityLink = "https://si-2021.167.99.244.168.nip.io:3333/QRcode";
const QrSave = "https://si-2021.167.99.244.168.nip.io:3333/QRcode/save"

function TwoFactorAuthentication() {

    const [imgLink, setImgLink] = useState("");
    const [qrSecret, setQrSecret] = useState(null)
    const [TwoFacSucc, setTwoFacSucc] = useState(false)
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

        const data = {
            QrSecret: qrSecret,
            token: formData.token
        };

        request(QrSave, 'post', data)
            .then(() => {
                setTwoFacSucc(true)
            }).catch((error) => {
            console.log(error);
            showSwalToast('Invalid Token');
        })

        updateFormData(initialFormData)
    }

    useEffect(async () => {
        const result = await request(
            securityLink,
        );

        setQrSecret(result.data.QrSecret)
        setImgLink(result.data.QRcode)

    }, []);


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