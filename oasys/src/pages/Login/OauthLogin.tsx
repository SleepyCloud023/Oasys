/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { SerializedStyles } from '@emotion/react';
import { User } from '@hooks/useAuth';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import useOauth from '@hooks/useOauth';

const REACT_APP_GOOGLE_CLIENT_ID =
  '163413806779-q6ij208fs7bnk6n24gsbvu9himdks8vs.apps.googleusercontent.com';

type OauthLoginProps = {
  readonly setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  readonly oAuthSetUser: (user: User) => void;
  readonly cssProps: SerializedStyles;
};

function OauthLogin({
  setOpen,
  oAuthSetUser,
  setErrorMessage,
  cssProps,
}: OauthLoginProps) {
  const [getGoogleUser] = useOauth();

  const onGoogleLoginSuccess = React.useCallback(async (Response: any) => {
    const user = await getGoogleUser(Response);

    if (user.login) {
      oAuthSetUser(user);
      setOpen(false);
      // navigate('/home');
    } else {
      // setErrorMessages(Response.data.error_msg);
      setErrorMessage('로그인에 실패했습니다.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGoogleLoginFailure = React.useCallback((Response: any) => {
    console.log('google login failure');
    console.log(Response);
  }, []);

  return (
    <GoogleLogin
      css={cssProps}
      clientId={REACT_APP_GOOGLE_CLIENT_ID} // your Google app client ID
      buttonText="Sign in with Google"
      onSuccess={onGoogleLoginSuccess} // perform your user logic here
      onFailure={onGoogleLoginFailure} // handle errors here
    />
  );
}

export default OauthLogin;
