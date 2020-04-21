import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signInSuccess } from '../redux/user/user.action';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = ({ signInSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password,
        }
        login(data);
    }

    const login = (data) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
    
            fetch(`http://localhost:5000/api/login`, requestOptions)
                .then(res => res.json())
                .then((data) => {
                    signInSuccess(data)
                })
                .catch(err => alert("Email Or Password incorrect"))
        } catch (err) {
            console.log("Email Or Password incorrect")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2>Login</h2>
            <TextField
                id="standard-textarea"
                value={email}
                label="Email"
                placeholder="xxx@xxxx.com"
                onChange={handleEmailChange}
            />

            <br></br>
            <TextField
                id="standard-password-input"
                value={password}
                label="Pasword"
                type="password"
                placeholder="Your password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
            />

            <br></br>
            <br></br>
            <Button variant="outlined" type="submit" value="Submit" >Login</Button>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    signInSuccess: (data) => dispatch(signInSuccess(data))
})

export default connect('', mapDispatchToProps)(Login);
  
