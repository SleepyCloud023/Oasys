import React from 'react';
import styled from 'styled-components';

const StyledToggleList = styled.ul`
  margin: 0;
  padding: 0;
  overflow-y: auto;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListCover = styled.li`
  background-color: azure;
  border-radius: 3px;
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

function ToggleList({ title, contentList, contentExtractor, ...rest }) {
  const isExtractorExist = (extractor) =>
    extractor
      ? true
      : console.log(`In ${title}, contentExtractor is not given`) || false;

  const listElements =
    isExtractorExist(contentExtractor) &&
    contentList.map((content, index) => {
      const fullContent = contentExtractor(content, index);
      return <ListElement key={index}>{fullContent}</ListElement>;
    });

  return (
    <StyledToggleList>
      <ListCover>{title}</ListCover>
      {listElements}
    </StyledToggleList>
  );
}

export default ToggleList;
