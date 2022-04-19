/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalProps, styled } from '@mui/material';

type LoginProps = {
  open: ModalProps['open'];
  onClose?: ModalProps['onClose'];
};

const StyledModal = styled(Modal)`
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

function LoginModal(props: LoginProps) {
  // React States
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Login API
  async function loginApi(uname: string, pass: string) {
    const login_req = {
      username: uname,
      password: pass,
    };
    const loginURL = `/api/login`;
    const response = await axios.post(loginURL, login_req);

    if (response.data.success) {
      setIsSubmitted(true);
      navigate('/home');
    } else {
      setErrorMessages(response.data.error_msg);
    }
  }

  const handleSubmit: React.FormEventHandler = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    loginApi(uname.value, pass.value);
  };

  // JSX code for login form
  const renderForm = (
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
        src="img/btn_google_signin.png"
        alt="google_signin"
      />
    </div>
  );

  return (
    <StyledModal {...props}>
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </StyledModal>
  );
}

export default LoginModal;
