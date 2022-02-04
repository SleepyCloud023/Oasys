import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledToggleList = styled.ul`
  margin: 0;
  padding: 0;
  overflow-y: auto;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ upperFixed }) =>
    upperFixed &&
    css`
      margin-bottom: auto;
    `}
  ${({ expandRatio }) => {
    //console.log(expandRatio);

    expandRatio &&
      css`
        flex: ${expandRatio} 0 0;
      `;
  }}
`;

const ListCover = styled.li`
  background-color: azure;
  border-radius: 3px;
  border: 1px solid black;
  color: black;
  font-style: italic;
  font-size: 1rem;
  display: flex;
  padding: 1px 4px;
  align-items: center;
  /* 커버 상단 고정 */
  position: sticky;
  top: 0;
`;

const ListElement = styled.li`
  background-color: gray;
  border: 1px solid black;
  border-radius: 3px;
  color: white;
  font-size: 0.75rem;
  padding: auto 4px;
`;

function ToggleList({
  title,
  contentList,
  contentExtractor,
  expandRatio,
  upperFixed,
  ...rest
}) {
  const [fold, setFold] = useState(false);
  const onToggle = () => setFold(!fold);

  const isExtractorExist = (extractor) =>
    extractor
      ? true
      : console.log(`In ${title}, contentExtractor is not given`) || false;

  const listElements =
    isExtractorExist(contentExtractor) &&
    !fold &&
    contentList.map((content, index) => {
      const fullContent = contentExtractor(content, index);
      return <ListElement key={index}>{fullContent}</ListElement>;
    });

  return (
    <StyledToggleList expandRatio={expandRatio} upperFixed={upperFixed}>
      <ListCover onClick={onToggle}>{title}</ListCover>
      {listElements}
    </StyledToggleList>
  );
}

export default ToggleList;
