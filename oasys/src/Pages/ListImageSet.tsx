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

function ListImageSet() {
  const [data, setData] = useState<DatasetInfo | null>(null);
  // const imageSetURL = useLocation().pathname;
  const id = useParams().id;

  useEffect(() => {
    const imageSetURL = `${serverURL}/dataset/${id}`;
    axios.get(imageSetURL).then((response: AxiosResponse) => {
      // TODO: 에러처리 필요함
      const data_response: DatasetInfo = response.data;
      setData(data_response);
    });
  }, [id]);

  if (typeof id === 'undefined' || data === null) {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  return (
    <StyledBox>
      <ImageSetController id={parseInt(id)} data={data} />
      <ImageSet id={parseInt(id)} data={data} />
    </StyledBox>
  );
}

export default ListImageSet;
