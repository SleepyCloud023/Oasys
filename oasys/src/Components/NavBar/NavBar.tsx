import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <nav
        style={{
          minHeight: '2rem',
          padding: '10px',
          width: '100vw',
          borderBottom: 'solid 1px',
        }}
      >
        <Link to={'/home'}>Home</Link>
        <br />
        <Link to={'/dataset'}>Dataset</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
