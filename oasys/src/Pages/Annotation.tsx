import React from 'react';
import styled from '@emotion/styled';
import { Footer, Header, WorkingSection } from '../Components';
import { useParams } from 'react-router-dom';
import { lte } from 'lodash';

const AnnotationBlock = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
`;

function Annotation() {
  const parmas = useParams();
  let id = parmas.id;
  if (id == null) {
    id = '1';
  }

  return (
    <AnnotationBlock>
      <Header />
      <WorkingSection index={id} />
      <Footer />
    </AnnotationBlock>
  );
}

export default Annotation;
