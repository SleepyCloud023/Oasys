/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, css } from '@mui/material';
import { Link } from 'react-router-dom';
import { DatasetInfo, ImageMetaData } from '../types/list-image';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { deleteImageById } from '@api/image';

type PropsImageCard = {
  imageInfo: ImageMetaData;
  setDataset: React.Dispatch<React.SetStateAction<DatasetInfo | null>>;
  datasetId: number;
};

const boxStyle = (useHeader: boolean) => css`
  background-color: black;
  position: absolute;
  opacity: ${useHeader ? 0.7 : 0};
  z-index: 900;
  width: 100%;
  height: 100%;
`;

const cardHeaderStyle = (useHeader: boolean) => css`
  position: absolute;
  width: 100%;
  z-index: 1000;
  visibility: ${useHeader ? 'visible' : 'hidden'};

  & span {
    color: white;
  }
  & .MuiCardHeader-title {
    font-size: 1.5rem;
  }
  & .MuiCardHeader-subheader {
    font-size: 1rem;
  }
`;

function ImageCard({ imageInfo, setDataset, datasetId }: PropsImageCard) {
  const [useHeader, setUseHeader] = useState(false);

  const onMouseOver = () => {
    setUseHeader(true);
  };

  const onMouseOut = () => {
    setUseHeader(false);
  };

  async function deleteImage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    const response = await deleteImageById(imageInfo.id);

    if (response.success) {
      const get_data_res = await axios.get(`/api/dataset/${datasetId}`);
      setDataset(get_data_res.data);
    }
    // TODO: 실패 시 Alert 추가
    else {
    }
  }

  const HeaderDeleteIcon = (
    <Tooltip title="Delete">
      <IconButton
        aria-label="settings"
        sx={{ color: grey[200] }}
        onClick={deleteImage}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Link to={'/annotation/' + imageInfo.id}>
      <Card
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        sx={{ position: 'relative' }}
      >
        <Box css={boxStyle(useHeader)} />
        <CardHeader
          css={cardHeaderStyle(useHeader)}
          action={HeaderDeleteIcon}
          title={imageInfo.imageName}
          subheader="September 14, 2016"
          titleTypographyProps={{ fontSize: '1rem' }}
          subheaderTypographyProps={{ fontSize: '0.7rem' }}
        />
        <CardMedia
          component="img"
          image={imageInfo.imageURL}
          alt={imageInfo.imageName}
        />
      </Card>
    </Link>
  );
}

export default ImageCard;
