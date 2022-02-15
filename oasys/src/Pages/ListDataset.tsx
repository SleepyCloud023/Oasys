import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { Link } from 'react-router-dom';

const StyleListDataset: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.background.default,
  flex: '1 0 0',
};

function ListDataset() {
  return (
    <Box sx={StyleListDataset}>
      <h1>Display list of Dataset Here</h1>
      <Link to={'/annotation'}>Annotation</Link>
    </Box>
  );
}

export default ListDataset;
