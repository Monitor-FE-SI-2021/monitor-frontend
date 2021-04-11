import React, { useEffect } from "react";
import { useState } from "react";
import './MyProfile.scss';

import {
    changeEmailForUser,
    checkIfEmailExists,
    getUserDetails,
    sendVerificationEmail,
    checkIfEmailVerified,
    regexEmail
} from "./VerifyEmail";
import { showSwalToast } from "../../utils/utils";
import { regexPhoneNumber, sendVerificationSMS } from "./VerifyPhoneNumber";
import { checkPassword } from "./PasswordChange";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
import TwoFactorAuthentication from "../TwoFactorAuthentication/TwoFactorAuthentication";
import Questions from "../securityQuestions/Questions";

const PROFILE_TABS = {
    SETTINGS: '/my-profile/settings',
    TWO_FACTOR_AUTH: '/my-profile/2fa',
    QUESTIONS: '/my-profile/questions',
}

function TabPanel(props) {
    const { children, value, path, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== path}
            id={`simple-tabpanel-${path}`}
            {...other}
        >
            {value === path && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function MyProfile({ token, push, location }) {

    const path = location?.pathname;

    useEffect(() => {
        if (!Object.values(PROFILE_TABS).includes(path)) {
            handleTabChange(PROFILE_TABS.SETTINGS)
        }
    }, [])

    const switchRoute = (link) => {
        push(link);
    };

    const [selectedTab, setSelectedTab] = useState(path);

    const handleTabChange = (path) => {
        setSelectedTab(path);
        switchRoute(path);
    }

    const [showInitialForm, setInitialForm] = React.useState(true);
    const [showMobileForm, setMobileForm] = React.useState(false);
    const [showPasswordForm, setPasswordForm] = React.useState(false);

    const statusEmail = {
        state: "",
        message: ""
    }
    const [correctEmail, setCorrectEmail] = React.useState(statusEmail);

    const statusPhone = {
        state: "",
        message: ""
    }
    const [correctPhone, setCorrectPhone] = React.useState(statusPhone);

    const initialEmailValue = {
        email: ""
    };
    const initialMobileValue = {
        phone: ""
    };
    const initialPasswordValue = {
        password: ""
    };

    const [emailValue, setEmailValue] = React.useState(initialEmailValue)
    const [mobileValue, setMobileValue] = React.useState(initialMobileValue)
    const [passwordValue, setPasswordValue] = React.useState(initialPasswordValue)

    const initialFormData = {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: ""
    };

    const [formData, updateFormData] = React.useState(initialFormData);

    React.useEffect(() => {
        getUserDetails().then(res => {
            if (res && res.status == 200) {
                updateFormData(res.data)
                const objekat = {
                    email: res.data.email
                };
                const objekatMobitel = {
                    phone: res.data.phone
                };
                setEmailValue(objekat)
                setMobileValue(objekatMobitel)
            }
        })

    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setEmailValue({
            ...emailValue,
            [e.target.name]: e.target.value.trim()
        });

    };

    const handleVerify = (e) => {
        e.preventDefault();

        const user = {
            email: formData.email
        }
        checkIfEmailVerified(user).then(r => {
            if (r && r.status === 200) {
                if (r.message === "Email already verified!") {
                    showSwalToast(r.message, 'success');
                } else {
                    sendVerificationEmail(user).then(r => {
                        if (r && r.status === 200) {
                            showSwalToast('Email sent', 'success');
                        }
                    });
                }
            }
        }, err => {
            console.log(err);
        }).catch(
            err => {
                console.log(err);
            }
        );


    }


    const handleChangeEmail = (e) => {
        e.preventDefault()
        const user = {
            email: emailValue
        }
        if (regexEmail(emailValue)) {
            setCorrectEmail({
                state: "valid",
                message: "Email is valid."
            });


            checkIfEmailExists(user).then(r => {
                if (r === true) {
                    showSwalToast("Email is already in use!");
                } else {
                    changeEmailForUser(user).then(res => {
                        if (res && res.status === 200) {
                            showSwalToast(res.data.message, 'success');
                        }
                    });
                }
            });
        } else {
            setCorrectEmail({
                state: "invalid",
                message: "Enter a valid email address."
            });
        }

    }

    //////////////////////////////////////////////////////////////////Mobile Phone///////////////////////////////
    const handleMobileChange = (e) => {
        e.preventDefault()
        setMobileValue({
            ...mobileValue,
            [e.target.name]: e.target.value.trim()
        });

    };

    const handleClickMobileChange = (e) => {
        e.preventDefault()

        const user = {
            phone: mobileValue.phone
        }
        if (regexPhoneNumber(mobileValue)) {
            setCorrectPhone({
                state: "valid",
                message: "Phone number is valid."
            });

            sendVerificationSMS(user).then(res => {

                if (res && res.status === 200) {
                    showSwalToast(res.data.message, 'success');
                } else if (res && res.status === 400) {
                    showSwalToast(res.data.message);
                }
            });
        } else {
            setCorrectPhone({
                state: "invalid",
                message: "Enter a valid phone number."
            });
        }
    }


    //////////////////////////////////////////////////////////////////Password Change///////////////////////////////

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPasswordValue({
            ...passwordValue,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleClickPasswordChange = (e) => {
        e.preventDefault()

        const user = {
            password: passwordValue.password
        }
        checkPassword(user).then(res => {
            if (res && res.status === 200) {

                showSwalToast(res.data.message, 'success');

                switchRoute('/password-reset/' + res.data.token);


            } else if (res && res.status === 400) {
                showSwalToast(res.data.message);
                setPasswordValue(initialPasswordValue)
            }
        });
        setPasswordValue(initialPasswordValue)
    }

    const renderMyProfile = () => {
        if (showInitialForm) {
            return (
                <div className="formDiv">
                    <form className="form">
                        <h1>Personal Information</h1>

                        <label htmlFor="Name">Name: </label>
                        <input type='text' value={formData.name} disabled/>

                        <label htmlFor="Surname">Surname: </label>
                        <input type='text' value={formData.lastname} disabled/>

                        <label htmlFor="Address">Address: </label>
                        <input type='text' value={formData.address} disabled/>

                        <label htmlFor="Number">Mobile phone: </label>
                        <input type='text' value={formData.phone} disabled/>

                        <label htmlFor="Email">Email: </label>
                        <input type='text' value={formData.email} disabled/>

                        <input className='custom-btn' type="button" value="Change password"
                               onClick={() => {
                                   setInitialForm(false);
                                   setMobileForm(false);
                                   setPasswordForm(true)
                               }}/>
                        <input className='custom-btn' type="button" value="Verify or change email"
                               onClick={() => {
                                   setInitialForm(false);
                                   setMobileForm(false);
                                   setPasswordForm(false)
                               }}/>
                        <input className='custom-btn' type="button" value="Change mobile phone number"
                               onClick={() => {
                                   setMobileForm(true);
                                   setInitialForm(false);
                                   setPasswordForm(false)
                               }}/>
                    </form>
                </div>
            );
        } else if (showMobileForm) {
            return (
                <div className="formDiv">
                    <form className="formChange">
                        <h1>Change your phone number</h1>

                        <label htmlFor="Number">Enter a new mobile phone number: </label>
                        <input type='text' name="phone" value={mobileValue.phone} onChange={handleMobileChange}/>
                        <p className={correctPhone.state}>{correctPhone.message}</p>
                        <input className='custom-btn' type="button" value="Change number"
                               onClick={handleClickMobileChange}/>
                    </form>
                    <div>
                        <button className="backToProfile" onClick={() => setInitialForm(true)}>Back to profile</button>
                    </div>
                </div>
            );
        } else if (showPasswordForm) {
            return (
                <div className="formDiv">
                    <form className="formChange">
                        <h1>Change your password</h1>

                        <label htmlFor="Number">Enter your current password: </label>
                        <input type='text' name="password" value={passwordValue.password}
                               onChange={handlePasswordChange}/>
                        <p></p>
                        <input className='custom-btn' type="button" value="Confirm"
                               onClick={handleClickPasswordChange}/>
                    </form>
                    <div>
                        <button className="backToProfile" onClick={() => {
                            setInitialForm(true);
                            setPasswordValue(initialPasswordValue)
                        }}>Back to profile
                        </button>
                    </div>
                </div>
            );
        } else
            return (
                <div className="formDiv">
                    <form className="form">
                        <h1>Email Verification</h1>
                        <input className='custom-btn' type="button" value="Verify email" onClick={handleVerify}/>

                    </form>
                    <form className="formChange">
                        <h1>Change Email</h1>
                        <label htmlFor="Email">Enter a new email address: </label>
                        <input type='text' name="email" value={emailValue.email} onChange={handleChange}/>
                        <p className={correctEmail.state}>{correctEmail.message}</p>
                        <input className='custom-btn' type="button" value="Change email" onClick={handleChangeEmail}/>
                    </form>
                    <div>
                        <button className="backToProfile" onClick={() => setInitialForm(true)}>Back to profile</button>
                    </div>
                </div>
            );
    }

    return (
        <div className='my-profile page'>
            <AppBar position="static" className='profile-tabs'>
                <Tabs value={selectedTab}
                      TabIndicatorProps={{
                          style: {
                              backgroundColor: "white",
                          }
                      }}>
                    <Tab onClick={() => handleTabChange(PROFILE_TABS.SETTINGS)}
                         value={PROFILE_TABS.SETTINGS}
                         label="Profile"
                         className='single-tab'/>
                    <Tab onClick={() => handleTabChange(PROFILE_TABS.TWO_FACTOR_AUTH)}
                         value={PROFILE_TABS.TWO_FACTOR_AUTH}
                         label="Two Factor Auth"
                         className='single-tab'/>
                    <Tab onClick={() => handleTabChange(PROFILE_TABS.QUESTIONS)}
                         value={PROFILE_TABS.QUESTIONS}
                         label="Security Questions"
                         className='single-tab'/>
                </Tabs>
            </AppBar>
            <TabPanel value={selectedTab} path={'/my-profile/settings'}>
                {renderMyProfile()}
            </TabPanel>
            <TabPanel value={selectedTab} path={'/my-profile/2fa'}>
                <TwoFactorAuthentication/>
            </TabPanel>
            <TabPanel value={selectedTab} path={'/my-profile/questions'}>
                <Questions/>
            </TabPanel>
        </div>
    )


}

export default connect(state => ({}), { push })(MyProfile);