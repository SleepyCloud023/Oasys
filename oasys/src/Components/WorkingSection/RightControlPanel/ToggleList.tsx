import React, { useState } from 'react';
import styled, { css } from 'styled-components';

type PropsStyled = {
  readonly upperFixed?: boolean;
  readonly expandRatio?: number;
};

const StyledToggleList = styled.ul<PropsStyled>`
  margin: 0;
  padding: 0;
  width: 100%;
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
`;

// ${({ expandRatio }) => {
//   expandRatio &&
//     css`
//       flex: ${expandRatio} 0 0;
//     `;
// }}

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

type Extractor<T> = (content: T, index: number) => string;

type PropsToggleList<T> = {
  readonly title: string;
  readonly contentList: Array<T>;
  readonly contentExtractor: Extractor<T>;
} & PropsStyled;

function ToggleList<T>({
  title,
  contentList,
  contentExtractor,
  expandRatio,
  upperFixed,
}: PropsToggleList<T>) {
  const [fold, setFold] = useState(false);
  const onToggle = () => setFold(!fold);

  const listElements =
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
