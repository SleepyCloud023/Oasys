import React from 'react';
import { Link } from 'react-router-dom';

function AnnotationNavBar() {
  return (
    <>
      <nav>
        <Link to={'/dataset'}>Back</Link>
      </nav>
    </>
  );
}

export default AnnotationNavBar;
