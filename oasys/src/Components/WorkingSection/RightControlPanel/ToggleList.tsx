import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { List } from '@mui/material';

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
  ${({ upperFixed }) => {
    return upperFixed
      ? css`
          margin-bottom: auto;
        `
      : null;
  }}
`;

const ListCover = styled.div`
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
  z-index: 1;
`;

const ListElement = styled.div`
  background-color: gray;
  border: 1px solid black;
  border-radius: 3px;
  color: white;
  font-size: 0.75rem;
  padding: auto 4px;
`;

type Extractor<T> = (content: T, index: number) => string | React.ReactNode;

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
      <List sx={{ py: 0 }}>
        <ListCover onClick={onToggle}>
          {fold ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {title}
        </ListCover>
        {listElements}
      </List>
    </StyledToggleList>
  );
}

export default ToggleList;
