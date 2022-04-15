import React from 'react';
import LinkButton from '@components/NavBar/LinkButton';

function AnnotationNavBar() {
  return (
    <>
      <nav>
        <LinkButton to={'/dataset'}>Home</LinkButton>
      </nav>
    </>
  );
}

export default AnnotationNavBar;
