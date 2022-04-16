import React from 'react';
import { styled } from '@mui/material';
import { Box } from '@mui/material';

const StyleHome = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  flex: '1 0 0',
}));

function Home() {
  return (
    <>
      <StyleHome>
        <h1>Oasys: Home Page</h1>
      </StyleHome>
      <div className="g-signin2" data-onsuccess="onSignIn"></div>
    </>
  );
}

export default Home;