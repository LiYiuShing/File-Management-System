import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signInSuccess } from '../redux/user/user.action';

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
                    console.log("signInSuccess")
            })
        } catch (err) {
            return err
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            Login
            <label>
                Email:
                <input type="text" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    signInSuccess: (data) => dispatch(signInSuccess(data))
})

export default connect('', mapDispatchToProps)(Login);
  
