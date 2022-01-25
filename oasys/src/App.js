import React from "react";
import styled from "styled-components";
import Container from "./Components/Container";
import LeftControlPanel from "./Components/LeftControlPanel";
import MainViewCanvas from "./Components/MainViewCanvas";
import RightControlPanel from "./Components/RightControlPanel";

const AppBlock = styled.div`
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppBlock>
      <Container sectionType={"header"}></Container>
      <Container sectionType={"workingSection"}>
        <LeftControlPanel />
        <MainViewCanvas />
        <RightControlPanel />
      </Container>
      <Container sectionType={"footer"}></Container>
    </AppBlock>
  );
}

export default App;
