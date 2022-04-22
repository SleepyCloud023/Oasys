import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { Buffer } from 'buffer';
import { GoogleLogin } from 'react-google-login';
import { validateTokenAndObtainSession } from './oauthUtils.js';

const REACT_APP_GOOGLE_CLIENT_ID =
  '982907587510-7qm6n6ogqetnbh69tqb4drn536g8fh88.apps.googleusercontent.com';

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

  const onGoogleLoginSuccess = useCallback(
    (response) => {
      const idToken = response.tokenId;
      const data = {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
      };

      validateTokenAndObtainSession({ data, idToken })
        .then(handleUserInit)
        .catch(notifyError);
    },
    [handleUserInit],
  );

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
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID} // your Google app client ID
        buttonText="Sign in with Google"
        onSuccess={onGoogleLoginSuccess} // perform your user logic here
        onFailure={onGoogleLoginFailure} // handle errors here
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
