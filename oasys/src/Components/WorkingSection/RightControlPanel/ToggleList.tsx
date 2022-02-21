/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  css,
  IconButton,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box, { BoxProps } from '@mui/system/Box/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type SectionProps = {
  readonly upperFixed?: boolean;
  readonly expandRatio?: number;
  readonly addButton?: boolean;
  readonly onAddButton?: React.MouseEventHandler<HTMLButtonElement>;
};

const StyledToggleSection = (props: SectionProps & BoxProps) => {
  const StyledToggleBox = styled(Box)<SectionProps>`
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: auto;
    min-height: 2rem;
    margin-bottom: ${({ upperFixed }) => (upperFixed ? 'auto' : null)};
    &::-webkit-scrollbar {
      display: none;
    }
  `;
  return (
    <StyledToggleBox id={'toggle-section'} component={'section'} {...props} />
  );
};

const StyledToggleList = (props: AccordionProps) => (
  <Accordion
    disableGutters
    defaultExpanded
    sx={{ backgroundColor: 'transparent' }}
    {...props}
  />
);

const StyledToggleCover = styled(AccordionSummary)(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    border-bottom: solid ${theme.palette.divider} 1px;
    border-radius: 3px;
    min-height: 1.5rem;
    font-weight: bold;
    font-style: italic;
    font-size: 1rem;
    margin: 0;
    padding: 1px 6px;
    align-items: center;
    /* 커버 상단 고정 */
    position: sticky;
    top: 0;
    z-index: 1;
  `,
);

const StyledToggleContent = styled(AccordionDetails)(({ theme }) => ({
  padding: '0',
}));

type Extractor<T> = (content: T, index: number) => string | React.ReactNode;

type PropsToggleList<T> = {
  readonly title: string;
  readonly contentList: Array<T>;
  readonly ListItemGenerator: Extractor<T>;
} & SectionProps;

function ToggleList<T>({
  title,
  contentList,
  ListItemGenerator,
  expandRatio,
  upperFixed,
  addButton,
  onAddButton: onAddClick,
}: PropsToggleList<T>) {
  const optinalAddButton = addButton && (
    <IconButton onClick={onAddClick} sx={{ padding: 0, marginLeft: 'auto' }}>
      <AddCircleOutlineIcon fontSize="small" />
    </IconButton>
  );
  const listCover = (
    <StyledToggleCover expandIcon={<ExpandMoreIcon />}>
      {title}
      {optinalAddButton}
    </StyledToggleCover>
  );
  const listContent = (
    <StyledToggleContent>
      {contentList.map((content, index) => ListItemGenerator(content, index))}
    </StyledToggleContent>
  );

  return (
    <StyledToggleSection expandRatio={expandRatio} upperFixed={upperFixed}>
      <StyledToggleList aria-controls={`${title} object list`}>
        {listCover}
        {listContent}
      </StyledToggleList>
    </StyledToggleSection>
  );
}

export default ToggleList;
