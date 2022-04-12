import { Box } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { css, styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Link from './Link';

const StyledNav = styled((props) => <nav {...props} />)(
  ({ theme }) => css`
    min-height: 2rem;
    padding: 10px;
    width: 100vw;
    border-bottom: solid ${theme.palette.divider} 2px;
    background-color: ${theme.palette.secondary.light};
    a + a {
      margin-left: 0.8rem;
    }
  `,
);

function NavBar() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  async function loginCheck() {
    const loginCheckURL = `api/login`;
    const response = await axios.get(loginCheckURL);

    if (response.data.login) {
      setUserId(response.data.login_id);
    } else {
      navigate('/login');
    }
  }
  async function logOut() {
    const logoutURL = `api/login`;
    const response = await axios.delete(logoutURL);
    if (response.data.logout) {
      navigate('/login');
    }
  }

  useEffect(() => {
    loginCheck();
  }, []);

  const LogOutButton = () => (
    <Button
      onClick={logOut}
      sx={{ backgroundColor: 'black', marginLeft: '10px' }}
    >
      LogOut
    </Button>
  );
  const UserNameBox = () => (
    <Box sx={{ display: 'inline', marginLeft: '10px' }}>
      {'User : ' + userId}
    </Box>
  );

  return (
    <>
      <StyledNav>
        <Link to={'/home'} buttonVariant="text">
          Home
        </Link>
        <Link to={'/dataset'} buttonVariant="text">
          Dataset
        </Link>
        <LogOutButton />
        <UserNameBox />
      </StyledNav>
      <Outlet />
    </>
  );
}

export default NavBar;
