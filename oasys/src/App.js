import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import WorkingSection from "./Components/WorkingSection/WorkingSection";

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
