import React from 'react';
import styled from '@emotion/styled';
import { Footer, Header, WorkingSection } from '../Components';

const AnnotationBlock = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
`;

function Annotation() {
  return (
    <AnnotationBlock>
      <Header />
      <WorkingSection />
      <Footer />
    </AnnotationBlock>
  );
}

export default Annotation;
