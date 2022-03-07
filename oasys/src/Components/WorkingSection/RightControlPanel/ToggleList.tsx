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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddForm from './AddForm';
import { ACTION } from '../types';
import { useWorkStore } from '../utils';
import SelectedChecker, { ContentType } from './SelectedChecker';

type SectionProps = {
  readonly upperFixed?: boolean;
  readonly expandRatio?: number;
};

const StyledToggleSection = styled(
  ({ upperFixed, expandRatio, ...props }: SectionProps & BoxProps) => (
    <Box className={'toggle-section'} component={'section'} {...props} />
  ),
)(
  ({ upperFixed, expandRatio }) => css`
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: auto;
    min-height: 2rem;
    margin-bottom: ${upperFixed ? 'auto' : null};
    &::-webkit-scrollbar {
      display: none;
    }
  `,
);

const StyledToggleList = styled((props: AccordionProps) => (
  <Accordion disableGutters defaultExpanded {...props} />
))(
  ({ theme }) => css`
    background-color: transparent;
  `,
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
    padding: 0 6px;
    align-items: center;
    /* 커버 상단 고정 */
    position: sticky;
    top: 0;
    /* NOTE: MuiInputLabel의 css속성 중 z-index: 1이 설정되어 있다 */
    z-index: 10;
    & .MuiAccordionSummary-content {
      margin: 6px 0;
    }
  `,
);

const StyledToggleContent = styled(AccordionDetails)(({ theme }) => ({
  padding: '0',
}));

type ContentProps<T> = {
  readonly content: T;
  readonly index: number;
  readonly dispatch: React.Dispatch<ACTION>;
  readonly selectedChecker: SelectedChecker;
};

type Extractor<T> = (props: ContentProps<T>) => React.ReactElement;

type PropsToggleList<T> = {
  readonly title: string;
  readonly contentList: Array<T>;
  readonly selectedChecker: SelectedChecker;
  readonly ListItemGenerator: Extractor<T>;
  readonly addButton?: boolean;
} & SectionProps;

function ToggleList<T extends ContentType>({
  title,
  contentList,
  selectedChecker,
  ListItemGenerator,
  upperFixed,
  expandRatio,
  addButton,
}: PropsToggleList<T>) {
  const [activateForm, setActivateForm] = useState(false);
  const [, workDispatch] = useWorkStore();

  const optinalAddButton = addButton && (
    <IconButton
      onClick={() => setActivateForm(!activateForm)}
      sx={{ padding: 0, marginLeft: 'auto' }}
    >
      {activateForm ? (
        <RemoveIcon fontSize="small" />
      ) : (
        <AddIcon fontSize="small" />
      )}
    </IconButton>
  );

  const listCover = (
    <StyledToggleCover expandIcon={<ExpandMoreIcon />}>
      {title}
      {optinalAddButton}
    </StyledToggleCover>
  );

  const optionalAddForm = addButton ? (
    <AddForm title={title} activateForm={activateForm} />
  ) : null;

  // TODO: isSelected 판단하는 로직 추가
  const listContent = (
    <StyledToggleContent>
      {contentList.map((content, index) => {
        return (
          <ListItemGenerator
            key={index}
            content={content}
            index={index}
            dispatch={workDispatch}
            selectedChecker={selectedChecker}
          />
        );
      })}
    </StyledToggleContent>
  );

  return (
    <StyledToggleSection expandRatio={expandRatio} upperFixed={upperFixed}>
      <StyledToggleList aria-controls={`${title} object list`}>
        {listCover}
        {optionalAddForm}
        {listContent}
      </StyledToggleList>
    </StyledToggleSection>
  );
}

export default ToggleList;
