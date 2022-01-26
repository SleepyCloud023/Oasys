import React from "react";
import styled from "styled-components";
import MockData from "../../MockData/MainView.json";

const RightPanel = styled.div`
  border: 2px solid azure;
  border-radius: 4px;
  color: white;
  font: bold;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
      console.log("RightPanel: areaPercent is needed");
    } else {
      return `
        flex: ${areaPercent} 0 0;
      `;
    }
  }}
`;

const ListCover = styled.div`
  background-color: azure;
  border-radius: 3px;
  color: black;
`;

const ElementCover = styled.div`
  font-size: 0.75rem;
  background-color: #5c5b5b;
  border: 1px solid black;
  border-radius: 3px;
`;

function RightControlPanel({ areaPercent, ...rest }) {
  const { ClassList, TagList, ObjectList } = MockData;
  return (
    <>
      <RightPanel areaPercent={areaPercent} {...rest}>
        <ListCover>Objects</ListCover>
        {ObjectList.map(({ object }, idx) => (
          <ElementCover key={idx}>
            Object[{idx}]: {object.class}
          </ElementCover>
        ))}
        <ListCover>Class</ListCover>
        {ClassList.map((className, idx) => (
          <ElementCover key={idx}>{className}</ElementCover>
        ))}
        <ListCover>Tag</ListCover>
        {TagList.map((tagName, idx) => (
          <ElementCover key={idx}>{tagName}</ElementCover>
        ))}
      </RightPanel>
    </>
  );
}

export default RightControlPanel;
