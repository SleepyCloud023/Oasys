import React from 'react';
import { Box, Grid, Card } from '@mui/material';
import styled, { css } from 'styled-components';
import ImageCard from './ImageCard';

const baseImageSet = {
  datasetName: 'test_dataset1',
  image_metadata: [
    {
      id: 1,
      imageName: 'menu_1.png',
      imageSize: '340 453',
      imageURL: 'http://35.197.111.137:5001/img/menu_1.png',
    },
    {
      id: 2,
      imageName: 'menu_2.png',
      imageSize: '340 340',
      imageURL: 'http://35.197.111.137:5001/img/menu_2.png',
    },
    {
      id: 3,
      imageName: 'menu_3.png',
      imageSize: '340 453',
      imageURL: 'http://35.197.111.137:5001/img/menu_3.png',
    },
    {
      id: 4,
      imageName: 'menu_4.png',
      imageSize: '340 454',
      imageURL: 'http://35.197.111.137:5001/img/menu_4.png',
    },
  ],
};

const StyledImageSetPanel = styled(Box)(
  () => css`
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
);

const StyledImageSet = styled(Box)(
  () => css`
    padding: 20pt;
  `,
);

function ImageSet() {
  const cardElements = baseImageSet.image_metadata.map((objects, index) => {
    return (
      <Grid item xs={4} sm={3} md={3} lg={2} key={`imageCard${index}`}>
        <ImageCard imageInfo={objects}></ImageCard>
      </Grid>
    );
  });

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
