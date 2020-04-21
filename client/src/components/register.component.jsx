import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signInSuccess } from '../redux/user/user.action';

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
        if(password != cpassword) {
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
            <label>
                Confrim Password:
                <input type="password" value={cpassword} onChange={handleCpasswordChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    signInSuccess: (data) => dispatch(signInSuccess(data))
})

export default connect('', mapDispatchToProps)(Register);
  