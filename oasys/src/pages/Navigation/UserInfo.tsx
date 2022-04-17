/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Button } from '@components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { css, styled, Theme, useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledSection = styled((props: BoxProps) => (
  <Box component="section" {...props} />
))`
  flex: 20 1 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const styleButtonIcon = (theme: Theme) => css`
  padding: ${0.2}rem;
`;

const styleIcon = (theme: Theme) => css`
  width: 2rem;
  height: 2rem;
  color: ${theme.palette.primary.main};
`;

// type UserInfoProps = {};

function UserInfo() {
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState('');
  const theme = useTheme();

  async function loginCheck() {
    const loginCheckURL = `/api/login`;
    const response = await axios.get(loginCheckURL);

    if (response.data.login) {
      setUserId(response.data.username);
    } else {
      navigate('/login');
    }
  }
  async function logOut() {
    const logoutURL = `/api/login`;
    const response = await axios.delete(logoutURL);
    if (response.data.logout) {
      navigate('/login');
    }
  }

  React.useEffect(() => {
    loginCheck();
  }, []);

  const UserAvatar = (
    <IconButton css={styleButtonIcon(theme)}>
      <AccountCircleIcon css={styleIcon(theme)} />
    </IconButton>
  );

  // () => <Box>{'User : ' + userId}</Box>;

  const LogOutButton = () => (
    <Button onClick={logOut} sx={{ marginLeft: '0.5rem' }}>
      LogOut
    </Button>
  );

  return (
    <StyledSection>
      {UserAvatar}
      <LogOutButton />
    </StyledSection>
  );
}

export default UserInfo;
