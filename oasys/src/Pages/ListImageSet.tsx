import React from 'react';
import { Box, css } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import styled from '@mui/system/styled';
import { ImageSetController, ImageSet } from '../Components';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

function ListImageSet() {
  const parmas = useParams();
  const id = parmas.id;

  return (
    <StyledBox>
      <ImageSetController></ImageSetController>
      <ImageSet></ImageSet>
    </StyledBox>
  );
}

export default ListImageSet;
