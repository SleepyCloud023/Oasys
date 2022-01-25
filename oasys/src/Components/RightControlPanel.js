import React from "react";
import styled from "styled-components";
import MockData from "../MockData/MainView.json";

const RightPanel = styled.div`
  border: 2px solid tomato;
  border-radius: 4px;
  color: white;
  font: bold;
  flex: 20 0 0;
`;

const ListCover = styled.div`
  background-color: azure;
  color: black;
`;

const ElementCover = styled.div`
  font-size: 0.875rem;
  background-color: #5c5b5b;
  border: 1px solid black;
  border-radius: 2px;
`;

function RightControlPanel() {
  console.log(MockData);
  const { ClassList, TagList, ObjectList } = MockData;
  return (
    <>
      <RightPanel>
        <ListCover>Objects</ListCover>
        {ObjectList.map(({ object }, idx) => (
          <ElementCover>
            Object[{idx}]: {object.class}
          </ElementCover>
        ))}
        <ListCover>Class</ListCover>
        {ClassList.map((className) => (
          <ElementCover>{className}</ElementCover>
        ))}
        <ListCover>Tag</ListCover>
        {TagList.map((tagName) => (
          <ElementCover>{tagName}</ElementCover>
        ))}
      </RightPanel>
    </>
  );
}

export default RightControlPanel;
