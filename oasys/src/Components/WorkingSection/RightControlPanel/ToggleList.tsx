/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  styled,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box, { BoxProps } from '@mui/system/Box/Box';

type SectionProps = {
  readonly upperFixed?: boolean;
  readonly expandRatio?: number;
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

const StyledToggleCover = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: theme.palette.divider,
  borderRadius: '3px',
  minHeight: '1.5rem',
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: '1rem',
  margin: 0,
  padding: '1px 4px',
  alignItems: 'center',
  /* 커버 상단 고정 */
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

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
}: PropsToggleList<T>) {
  const listCover = (
    <StyledToggleCover expandIcon={<ExpandMoreIcon />}>
      {title}
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
