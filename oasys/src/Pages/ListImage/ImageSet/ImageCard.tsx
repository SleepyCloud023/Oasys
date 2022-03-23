import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageMetaData } from '../types/list-image';

type PropsImageCard = {
  imageInfo: ImageMetaData;
};

function ImageCard({ imageInfo }: PropsImageCard) {
  const [useHeader, setUseHeader] = useState(0);

  const onMouseOver = () => {
    setUseHeader(1);
  };
  const onMouseOut = () => {
    setUseHeader(0);
  };

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
            <IconButton aria-label="settings" sx={{ color: grey[50] }}>
              <MoreVertIcon />
            </IconButton>
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
