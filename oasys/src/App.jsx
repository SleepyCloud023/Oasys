import React from 'react';
import styled from 'styled-components';
import { Footer, Header, WorkingSection } from './Components';

const AppBlock = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppBlock>
      <Header />
      <WorkingSection />
      <Footer />
    </AppBlock>
  );
}

export default App;
