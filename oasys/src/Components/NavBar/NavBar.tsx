import { Box } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { css, styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
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
    const serverURL = 'http://35.197.111.137:5000';
    const loginCheckURL = `${serverURL}/login_check`;
    const response = await axios.get(loginCheckURL);

    console.log(response.data);
    // if (response.data.login) {
    //   setUserId(response.data.user_id);
    // } else {
    //   navigate('/login');
    // }
  }
  loginCheck();

  return (
    <>
      <StyledNav>
        <Link to={'/home'} buttonVariant="text">
          Home
        </Link>
        <Link to={'/dataset'} buttonVariant="text">
          Dataset
        </Link>
        <Box>{'User : ' + userId}</Box>
      </StyledNav>
      <Outlet />
    </>
  );
}

export default NavBar;
