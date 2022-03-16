import React, { useEffect, useState } from 'react';
import { Box, css } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
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

const serverURL = 'http://35.197.111.137:5000';

function ListImage() {
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const id = useParams().id;
  // const imageSetURL = useLocation().pathname;
  const imageSetURL = `${serverURL}/dataset/${id}`;

  useEffect(() => {
    async function fetchDataset() {
      const response = await axios.get(imageSetURL);
      setDataset(response.data);
    }
    fetchDataset();
  }, [imageSetURL]);

  if (typeof id === 'undefined' || dataset === null) {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  return (
    <StyledBox>
      <ImageSetController id={parseInt(id)} data={dataset} />
      <ImageSet id={parseInt(id)} data={dataset} />
    </StyledBox>
  );
}

export default ListImage;
