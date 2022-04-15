import { Button, Link } from '@components';
import React from 'react';

function AnnotationNavBar() {
  return (
    <>
      <nav>
        <Link to={'/dataset'}>
          <Button>Home</Button>
        </Link>
      </nav>
    </>
  );
}

export default AnnotationNavBar;
