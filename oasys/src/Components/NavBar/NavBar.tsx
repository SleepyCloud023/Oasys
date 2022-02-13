import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to={'/home'}>Home</Link>
        <Link to={'/dataset'}>Dataset</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
