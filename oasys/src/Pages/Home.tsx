import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

const StyleHome: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.default,
  flex: '1 0 0',
};

function Home() {
  return (
    <Box sx={StyleHome}>
      <h1>Oasys: Home Page</h1>
    </Box>
  );
}

export default Home;
