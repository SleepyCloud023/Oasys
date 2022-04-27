import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { DatasetInfo, ImageMetaData } from '../types/list-image';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

type PropsImageCard = {
  imageInfo: ImageMetaData;
  setDataset: React.Dispatch<React.SetStateAction<DatasetInfo | null>>;
  datasetId: number;
};

function ImageCard({ imageInfo, setDataset, datasetId }: PropsImageCard) {
  const [useHeader, setUseHeader] = useState(0);

  const onMouseOver = () => {
    setUseHeader(1);
  };
  const onMouseOut = () => {
    setUseHeader(0);
  };
  async function deleteImage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();

    const imageDelete = await axios.delete(`/api/image/${imageInfo.id}`);

    if (imageDelete.data.success) {
      const get_data_res = await axios.get(`/api/dataset/${datasetId}`);
      setDataset(get_data_res.data);
    }
  }

  return (
    <Link to={'/annotation/' + imageInfo.id}>
      <Card
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        sx={{ position: 'relative' }}
      >
        <Box
          sx={{
            backgroundColor: 'black',
            position: 'absolute',
            opacity: useHeader ? '0.5' : '0',
            zIndex: 900,
            width: '100%',
            height: '100%',
          }}
        />
        <CardHeader
          action={
            <Tooltip title="Delete">
              <IconButton
                aria-label="settings"
                sx={{ color: grey[200] }}
                onClick={deleteImage}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          title={imageInfo.imageName}
          subheader="September 14, 2016"
          sx={{
            position: 'absolute',
            zIndex: 1000,
            visibility: useHeader ? 'visible' : 'hidden',
            color: 'white',
          }}
          titleTypographyProps={{ fontSize: '1rem' }}
          subheaderTypographyProps={{ fontSize: '0.7rem' }}
        />
        <CardMedia
          component="img"
          image={imageInfo.imageURL}
          alt="img/no_image.jpg"
        />
      </Card>
    </Link>
  );
}

export default ImageCard;
