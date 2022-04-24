/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { css, Divider, Modal, ModalProps, styled } from '@mui/material';
import { Button } from '@components';
import { UserLogin } from '@hooks/useAuth';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const REACT_APP_GOOGLE_CLIENT_ID =
  '163413806779-q6ij208fs7bnk6n24gsbvu9himdks8vs.apps.googleusercontent.com';

const StyledModal = styled(Modal)`
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledForm = styled('form')`
  & h1 {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
    margin-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 3px;
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const StyledInputSection = styled('section')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 10px;
    & input {
      border: 1px solid ${theme.palette.divider};
      border-radius: 3px;
      /* border: rgba(0, 0, 0, 0.2); */
    }
  `,
);

const SubmitButton = styled(Button)`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  align-self: center;
  /* color: white; */
  &:hover {
    transform: none;
    /* color: white; */
  }
`;

const OAuthButton = styled(Button)(
  ({ theme }) => css`
    padding: 0;
    align-self: center;
  `,
);

const dividerStyle = css`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

type LoginProps = {
  open: ModalProps['open'];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  login: (userLogin: UserLogin) => Promise<any>;
  loginSetUer: any
  onClose?: ModalProps['onClose'];
};

function LoginModal({ setOpen, login, loginSetUer, ...props }: LoginProps) {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = React.useState<UserLogin>({
    username: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const loginSuccess = await login(userLogin);

    if (loginSuccess) {
      setOpen(false);
      // navigate('/home');
    } else {
      // setErrorMessages(Response.data.error_msg);
      setErrorMessages('로그인에 실패했습니다.');
    }
  };

  const onGoogleLoginSuccess = React.useCallback(
    (Response : any) => {
      const idToken = Response.tokenId;
      const data = {
        email: Response.profileObj.email,
        first_name: Response.profileObj.givenName,
        last_name: Response.profileObj.familyName
      };
  
      validateTokenAndObtainSession({ data, idToken });
    },
    []
  );

  const onGoogleLoginFailure = React.useCallback(
    (Response : any) => {
      console.log("google login failure")
      console.log(Response)
    },
    []
  );

  async function validateTokenAndObtainSession ({ data, idToken }: any) {
    const headers = {
      Authorization: idToken,
      'Content-Type': 'application/json'
    };
  
    const loginURL = `/api/login/oauth`;
    const response = await axios.post(loginURL, data, {headers:headers});
    const result = response.data;
    
    if (result.login) {
      loginSetUer(result);
      setOpen(false);
      // navigate('/home');
    } else {
      // setErrorMessages(Response.data.error_msg);
      setErrorMessages('로그인에 실패했습니다.');
    }
  };

  return (
    <StyledModal {...props}>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <StyledInputSection>
          <label>Username </label>
          <input type="text" name="username" required onChange={handleChange} />
        </StyledInputSection>
        <StyledInputSection>
          <label>Password </label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
        </StyledInputSection>
        <p style={{ fontSize: '0.5rem', color: 'red' }}>{errorMessages}</p>
        <SubmitButton variant="contained" onClick={handleSubmit}>
          Submit
        </SubmitButton>
        <Divider css={dividerStyle} />
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_CLIENT_ID}  // your Google app client ID
          buttonText="Sign in with Google"
          onSuccess={onGoogleLoginSuccess} // perform your user logic here
          onFailure={onGoogleLoginFailure} // handle errors here
        />
      </StyledForm>
    </StyledModal>
  );
}

export default LoginModal;
