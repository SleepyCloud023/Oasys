import Button, { ButtonProps } from '@mui/material/Button';
import { css, styled } from '@mui/material/styles';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const StyledNav = styled((props) => <nav {...props} />)(
  ({ theme }) => css`
    min-height: 2rem;
    padding: 10px;
    width: 100vw;
    border-bottom: solid ${theme.palette.divider} 2px;
    background-color: ${theme.palette.secondary.main};
  `,
);

const NavButton = (props: ButtonProps) => (
  <Button
    // variant="contained"
    // variant="outlined"
    variant="text"
    sx={{
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: (theme) => theme.palette.text.primary,
    }}
    {...props}
  />
);

function NavBar() {
  return (
    <>
      <StyledNav>
        <Link to={'/home'}>
          <NavButton>Home</NavButton>
        </Link>
        <Link to={'/dataset'}>
          <NavButton>Dataset</NavButton>
        </Link>
      </StyledNav>
      <Outlet />
    </>
  );
}

export default NavBar;
