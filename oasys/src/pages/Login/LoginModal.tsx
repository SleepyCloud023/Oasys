/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { css, Divider, Modal, ModalProps, styled } from '@mui/material';
import { Button } from '@components';
import { User, UserLogin } from '@hooks/useAuth';
import OauthLogin from './OauthLogin';

const StyledModal = styled(Modal)`
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  /* height: 30rem; */
  border-radius: 3px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  & h1 {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 400;
    margin: 0;
    margin-bottom: 1rem;
  }
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

const oAuthButtonStyle = css`
  /* width: 100%; */
  align-self: center;
  /* margin: 0 10px; */
`;

const dividerStyle = css`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

type LoginProps = {
  open: ModalProps['open'];
  onClose?: ModalProps['onClose'];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  login: (userLogin: UserLogin) => Promise<any>;
  oAuthSetUser: (user: User) => void;
};

function LoginModal({ setOpen, login, oAuthSetUser, ...props }: LoginProps) {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = React.useState<UserLogin>({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = React.useState('');

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
      setErrorMessage('로그인에 실패했습니다.');
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
        <p style={{ fontSize: '0.5rem', color: 'red' }}>{errorMessage}</p>
        <SubmitButton variant="contained" onClick={handleSubmit}>
          Submit
        </SubmitButton>
        <Divider css={dividerStyle} />
        <OauthLogin
          cssProps={oAuthButtonStyle}
          setOpen={setOpen}
          oAuthSetUser={oAuthSetUser}
          setErrorMessage={setErrorMessage}
        />
      </StyledForm>
    </StyledModal>
  );
}

export default LoginModal;
