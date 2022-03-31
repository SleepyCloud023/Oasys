import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import Header from './Header/Header';
import WorkingSection from './WorkingSection/WorkingSection';
import Footer from './Footer/Footer';
import AlertBox, { AlertInfo } from '../../Components/Alert/AlertBox';

const AnnotationBlock = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
`;

const defaultAlert: AlertInfo = {
  open: false,
  success: true,
  message: '',
};

function Annotation() {
  const [alert, setAlert] = useState(defaultAlert);

  const params = useParams();
  let id: string = params.id || '1';

  const AlertManger = () => (
    <AlertBox
      {...alert}
      sx={{ position: 'absolute', top: '70px', margin: 'auto' }}
      onCloseIcon={() => setAlert(defaultAlert)}
    />
  );

  return (
    <AnnotationBlock>
      <AlertManger />
      <Header />
      <WorkingSection id={parseInt(id)} setAlert={setAlert} />
      <Footer />
    </AnnotationBlock>
  );
}

export default Annotation;
