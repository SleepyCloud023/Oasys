import React, { useEffect, useState } from 'react';
import { Box, css } from '@mui/material';
import { useParams } from 'react-router-dom';
import styled from '@mui/system/styled';
import axios from 'axios';
import { DatasetInfo } from './types/list-image';
import { ImageSetController } from './ImageSetController';
import { ImageSet } from './ImageSet';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

function ListImage() {
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const id = useParams().id;
  const imageSetURL = `/api/dataset/${id}`;

  useEffect(() => {
    (async function () {
      const response = await axios.get(imageSetURL);
      setDataset(response.data);
    })();
  }, [imageSetURL]);

  if (typeof id === 'undefined' || dataset === null) {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  return (
    <StyledBox>
      <ImageSetController
        id={parseInt(id)}
        data={dataset}
        setDataset={setDataset}
      />
      <ImageSet id={parseInt(id)} data={dataset} />
    </StyledBox>
  );
}

export default ListImage;
