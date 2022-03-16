import React from 'react';
import { Box, css } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from '@mui/system/styled';
import { ImageSetController, ImageSet } from '../Components';
import axios, { AxiosResponse } from 'axios';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

const serverURL = `http://35.197.111.137:5000`;

type ImageMetaData = {
  id: number;
  imageName: string;
  imageSize: string;
  imageURL: string;
};

export type DatasetInfo = {
  datasetName: string;
  image_metadata: ImageMetaData[];
};

function ListImageSet() {
  const parmas = useParams();
  const id = parmas.id;

  if (typeof id === 'undefined') {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  const imageSetURL = `${serverURL}/dataset/${id}`;
  const imageSetData = axios
    .get(imageSetURL)
    .then((response: AxiosResponse) => {
      // 에러처리 필요함
      const data: DatasetInfo = response.data;
      return data;
    });

  return (
    <StyledBox>
      <ImageSetController id={parseInt(id)} data={imageSetData} />
      <ImageSet id={parseInt(id)} data={imageSetData} />
    </StyledBox>
  );
}

export default ListImageSet;
