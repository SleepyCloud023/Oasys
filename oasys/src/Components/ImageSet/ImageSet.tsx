import React from 'react';
import { Box, Grid, Card } from '@mui/material';
import styled, { css } from 'styled-components';
import ImageCard from './ImageCard';
import { DatasetInfo } from '../../Pages/ListImageSet';

const StyledImageSetPanel = styled(Box)`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledImageSet = styled(Box)`
  padding: 20pt;
`;

export type ImageSetProps = {
  id: number;
  data: DatasetInfo;
};

function ImageSet({ id, data }: ImageSetProps) {
  const { image_metadata } = data;
  const cardElements = image_metadata.map((objects, index) => (
    <Grid item xs={4} sm={3} md={3} lg={2} key={`imageCard${index}`}>
      <ImageCard imageInfo={objects}></ImageCard>
    </Grid>
  ));

  return (
    <StyledImageSetPanel>
      <StyledImageSet>
        <Grid container spacing={2}>
          {cardElements}
        </Grid>
      </StyledImageSet>
    </StyledImageSetPanel>
  );
}

export default ImageSet;
