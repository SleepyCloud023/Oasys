import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { css, styled } from '@mui/material/styles';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import LinkButton from '../../components/NavBar/LinkButton';

const StyledNav = styled((props) => <nav {...props} />)(
  ({ theme }) => css`
    padding: 0 10px;
    width: 100vw;
    height: 3rem;
    border-bottom: solid ${theme.palette.divider} 2px;
    /* background-color: ${theme.palette.secondary.light}; */
    /* a + a {
      margin-left: 0.8rem;
    } */
  `,
);

function Navigation() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

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
        <LinkButton to={'/home'} buttonVariant="contained">
          Home
        </LinkButton>
        <LinkButton to={'/dataset'} buttonVariant="contained">
          Dataset
        </LinkButton>
        <LinkButton to={'/home'} buttonVariant="text">
          test_1
        </LinkButton>
        <LinkButton to={'/home'} buttonVariant="outlined">
          test_2
        </LinkButton>
        <LogOutButton />
        <UserNameBox />
      </StyledNav>
      <Outlet />
    </>
  );
}

export default Navigation;
