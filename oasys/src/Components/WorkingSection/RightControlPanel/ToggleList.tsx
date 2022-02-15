/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Accordion, AccordionDetails, Box, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledListCover } from './ListItem';
import { css } from '@emotion/react';

type PropsStyled = {
  readonly upperFixed?: boolean;
  readonly expandRatio?: number;
};

const StyledToggleList = styled(Box)<PropsStyled>`
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-y: auto;
  min-height: 2rem;
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
  const listCover = (
    <StyledListCover expandIcon={<ExpandMoreIcon />} sx={{ margin: 0 }}>
      {title}
    </StyledListCover>
  );
  const listElements =
    // !fold &&
    contentList.map((content, index) => ListItemGenerator(content, index));

  return (
    <StyledToggleList expandRatio={expandRatio} upperFixed={upperFixed}>
      <Accordion
        disableGutters
        sx={{ backgroundColor: 'transparent' }}
        defaultExpanded
        // expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title} object List`}
        id={`${title} Accordion`}
      >
        {listCover}
        <AccordionDetails sx={{ padding: 0 }}>{listElements}</AccordionDetails>
        {/* <List sx={{ py: 0 }}>{listElements}</List> */}
      </Accordion>
    </StyledToggleList>
  );
}

export default ToggleList;
