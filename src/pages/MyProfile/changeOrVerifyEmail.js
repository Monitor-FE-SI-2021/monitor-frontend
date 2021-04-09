import React, { useEffect } from 'react';
import { changeEmailForUser, getUserDetails, verifyEmail } from '../../components/MyProfile/VerifyEmail';
import { showSwalToast } from "../../utils/utils";
import { connect } from "react-redux";

function verifyOrChangeEmail() {

    const initialFormData = {
        email: ""
    };
    const [formData, updateFormData] = React.useState(initialFormData);

    useEffect(() => {

        getUserDetails().then(r => {
            if (r && r.status === 200) {
                console.log(r.email);
                console.log(formData);
                updateFormData(r.email);
                console.log("poslije" + formData);
            }
        });

    }, []);



    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleVerify = (e) => {
        e.preventDefault();

        const user = {
            email: formData.email
        }
        console.log(user);
        // verifyEmail(user).then(r => {
        //     if (r && r.status === 200) {
        //         if (r.message === "Email already verified!") {
        //             showSwalToast(r.message);
        //             switchRoute('/verifyOrChange');
        //         }
        //         sendVerificationEmail(user).then(r => {
        //             if (r && r.status === 200) {
        //                 showSwalToast(r.message, 'success');
        //                 console.log(r.message);
        //                 console.log(r.data.message);
        //             }
        //         });
        //     }
        // });



    }
    const handleChangeEmail = (e) => {
        e.preventDefault();
        const user = {
            email: formData.email
        }

        changeEmailForUser(user).then(r => {
            if (r && r.status === 200) {
                if (r.message === "Email is already in use!") {
                    showSwalToast(r.message);
                }
                changeEmailForUser(user).then(r => {
                    if (r && r.status === 200) {
                        showSwalToast(r.message, 'success');
                        console.log(r.message);
                        console.log(r.data.message);
                    }
                });
            }
        });

    }

    return (
        <div className="emailVer">
            <button className="custom-btn" onClick={() => handleVerify}>Verify Email</button>
            <div className="change">

                <p>Enter your email adress:</p>
                <input name="email" type='email'
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleChange} />
                <button className="custom-btn" onClick={() => handleChangeEmail}>Change Email</button>
            </div>
        </div>

    )
}
export default connect(state => ({}), {})(verifyOrChangeEmail);