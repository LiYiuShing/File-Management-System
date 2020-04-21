import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signInSuccess } from '../redux/user/user.action';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Register = ({ signInSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleCpasswordChange = (event) => {
        setCpassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password !== cpassword) {
            alert('Password and Re-password is not same!')
        } else {
            const data = {
                email: email,
                password: password,
            }
            register(data);
        }
    }

    const register = (data) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
    
            fetch(`http://localhost:5000/api/register`, requestOptions)
                .then(res => res.json())
                .then((data) => {
                    signInSuccess(data)
            })
        } catch (err) {
            return err
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container">
            <h2>Register</h2>
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
                autoComplete="current-password"
                placeholder="Your password"
                onChange={handlePasswordChange}
            />

            <br></br>
            <TextField
                id="standard-password-input"
                value={cpassword}
                type="password"
                autoComplete="current-password"
                label="Confrim Password"
                placeholder="Confrim password"
                onChange={handleCpasswordChange}
            />

            <br></br>
            <br></br>
            <Button variant="outlined" type="submit" value="Submit" >Submit</Button>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    signInSuccess: (data) => dispatch(signInSuccess(data))
})

export default connect('', mapDispatchToProps)(Register);
  