import React from 'react';
import { Box, css } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@mui/system/styled';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

function ListDataset({}) {
  return (
    <StyledBox>
      <h1>Display list of Dataset Here</h1>
      <Link to={'/imageSet/1'}>ImageSet 1</Link>
      <br></br>
      <Link to={'/imageSet/2'}>ImageSet 2</Link>
    </StyledBox>
  );
}

export default ListDataset;
