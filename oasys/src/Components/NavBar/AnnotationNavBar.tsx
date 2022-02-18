import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function AnnotationNavBar() {
  return (
    <>
      <nav>
        <Link to={'/dataset'}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            Home
          </Button>
        </Link>
      </nav>
    </>
  );
}

export default AnnotationNavBar;
