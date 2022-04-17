import React from 'react';
import { css, styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Explorer from './Explorer';
import UserInfo from './UserInfo';
import SearchBar from './SearchBar';
import Logo from './Logo';

const StyledNav = styled((props) => <nav {...props} />)(
  ({ theme }) => css`
    box-sizing: border-box;
    padding: 0 0.75rem;
    width: 100%;
    height: 3rem;
    border-radius: 3px;
    border-bottom: solid ${theme.palette.divider} 2px;
    background-color: ${theme.palette.secondary.light};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  `,
);

function Navigation() {
  return (
    <>
      <StyledNav>
        <Logo />
        <Explorer />
        <SearchBar />
        <UserInfo />
      </StyledNav>
      <Outlet />
    </>
  );
}

export default Navigation;
