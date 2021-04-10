import React, {useState, useEffect, Component} from 'react';
import firebase from 'firebase/app';
import Prompt from "./Prompt";
import request, { authEndpoint, forgotPassword, resetPassword, users, userSecurityQuestions, answerCheck } from "../../../service";
import ConsoleLogs from './ConsoleLogs';

const endpoint = 'https://si-2021.167.99.244.168.nip.io/api';
const getUsers = `${endpoint}/user/GetAllUsers`;

async function retrieveUsersFromDatabase() {
    var users = [];

    return request(getUsers)
            .then(r => {
                if (r.status === 200) {
                    r.data.data.forEach((user) => {
                        users.push(new User(user.userId, user.name, user.lastname, user.email, user.phone, user.address));
                    });
                    return users;
                }
            });
}

class User {
    constructor (userId, name, lastname, email, phone, address) {
        this.userId = userId;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    getId() {
        return this.userId
    }

    toString() {
        return this.userId + ' ' + this.name + ' ' + this.lastname + ' ' + this.email + ' ' + this.phone;
    }
}

class DropDownList extends React.Component {

componentDidMount() { 
    this.renderUsers();
}

constructor(props) {
    super(props);
    this.state = {
        users: [],
        value: ""
    }
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
}

handleDropdownChange(e) {
    this.setState({
        value: e.target.value
    });
    this.renderUsers();
}


renderUsers = async() => {
    try {
        var res = await retrieveUsersFromDatabase();
        // this will re render the view with new data
        console.log("deviceID" + this.props.deviceId)
        this.setState({
            users: res.sort((a, b) => a.getId() - b.getId()).map((user) => 
                {if(user.userId == this.state.value) {
                    return <option selected="selected" key={Math.random()} value={user.userId}>{user.userId} {user.name} {user.lastname}</option>
                } else {
                    return <option  key={Math.random()} value={user.userId}>{user.userId} {user.name} {user.lastname}</option>
                }}
            )
        });
    } catch (err) {
        console.log(err);
    }
}

        
render() {    
    return (
      <div key={Math.random()}>
          <select onChange={this.handleDropdownChange}>
                <option value="all_users">All users</option>
                {this.state.users || 'Retrieving all the users'}
          </select>
          <ConsoleLogs user_id={this.state.value || "all_users"} deviceId={this.props.deviceId}/>
      </div>
    );
  }
}

export default DropDownList;