import Button, { ButtonProps } from '@mui/material/Button';
import { css, styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
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
  return (
    <>
      <StyledNav>
        <Link to={'/home'} buttonVariant="text">
          Home
        </Link>
        <Link to={'/dataset'} buttonVariant="text">
          Dataset
        </Link>
      </StyledNav>
      <Outlet />
    </>
  );
}

export default NavBar;
