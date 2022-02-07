import React from 'react';
import styled from 'styled-components';
import MockData from '../../../MockData/MainView2.json';

const MainCanvas = styled.div`
  color: white;
  font: bold;
  font-size: 1.25rem;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
      console.log('MainCanvas: areaPercent is needed');
    } else {
      return `
        flex: ${areaPercent} 0 0;
      `;
    }
  }}
  display: flex;
  justify-content: start;
  align-items: start;
  background-color: #1c1d1f;
`;

function MainViewCanvas({ areaPercent, ...rest }) {
  const { ObjectList, ClassList, TagList } = MockData;

  function objectExtractor(element, index) {
    const { ClassName, Bbox } = element.Object;
    const [x1, y1] = Bbox[0];
    const [x2, y2] = Bbox[1];
    return [x1, y1, x2 - x1, y2 - y1];
  }

  const boxElements = ObjectList.map((content, index) => {
    const fullContent = objectExtractor(content, index);
    console.log(fullContent);
    return (
      <rect
        x={fullContent[0]}
        y={fullContent[1]}
        width={fullContent[2]}
        height={fullContent[3]}
        stroke="green"
        fill="transparent"
        stroke-width="3"
        key="{index}"
      />
    );
  });

  return (
    <>
      <MainCanvas areaPercent={areaPercent} {...rest}>
        <svg version="1.1" baseProfile="full" width="320" height="204">
          <image href="img/test_image.jpg" />
          {boxElements}
        </svg>
      </MainCanvas>
    </>
  );
}

export default MainViewCanvas;
