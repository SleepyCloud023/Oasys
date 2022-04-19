import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { Buffer } from 'buffer';

function Login() {
  // React States
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState('');

  // Login API
  async function loginApi(uname, pass) {
    // use
    const login_req = {
      username: uname,
      password: pass,
    };

    // const encodedAuth = Buffer.from(`${uname}:${pass}`).toString('base64');
    // const config = {
    //   headers: {
    //     Autorization: 'Basic ' + encodedAuth,
    //   },
    // };

    const loginURL = `/api/login`;
    const response = await axios.post(loginURL, login_req);
    const result = response.data;

    if (result.login) {
      navigate('/home');
    } else {
      setErrorMessages(result.error_msg);
    }
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    loginApi(uname.value, pass.value);
  };

  // JSX code for login form
  const RenderForm = () => (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="error"> {errorMessages !== '' && errorMessages}</div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <img
        className="oauth-google"
        src="assets/img/btn_google_signin.png"
        alt="google_signin"
      />
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        <RenderForm />
      </div>
    </div>
  );
}

export default Login;
