import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { List } from '@mui/material';
import { StyledListCover } from './ListItem';

type PropsStyled = {
  readonly upperFixed?: boolean;
  readonly expandRatio?: number;
};

const StyledToggleList = styled.div<PropsStyled>`
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-y: auto;
  min-height: 1.6rem;
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

type Extractor<T> = (content: T, index: number) => string | React.ReactNode;

type PropsToggleList<T> = {
  readonly title: string;
  readonly contentList: Array<T>;
  readonly ListItemGenerator: Extractor<T>;
} & PropsStyled;

function ToggleList<T>({
  title,
  contentList,
  ListItemGenerator,
  expandRatio,
  upperFixed,
}: PropsToggleList<T>) {
  const [fold, setFold] = useState(false);
  const onToggle = () => setFold(!fold);

  const listCover = (
    <StyledListCover onClick={onToggle}>
      {fold ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      {title}
    </StyledListCover>
  );
  const listElements =
    !fold &&
    contentList.map((content, index) => ListItemGenerator(content, index));

  return (
    <StyledToggleList expandRatio={expandRatio} upperFixed={upperFixed}>
      <List sx={{ py: 0 }}>
        {listCover}
        {listElements}
      </List>
    </StyledToggleList>
  );
}

export default ToggleList;
