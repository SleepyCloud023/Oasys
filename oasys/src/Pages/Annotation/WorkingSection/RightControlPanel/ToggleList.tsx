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
import SelectedHandler, {
  ContentType,
  ToggleListType,
} from './SelectedHandler';

type SectionProps = {
  readonly upperFixed?: boolean;
  readonly contentLength: number;
  readonly hasAddForm: boolean;
  readonly spread: boolean;
};

const StyledToggleSection = styled(
  ({
    upperFixed,
    contentLength,
    hasAddForm,
    ...props
  }: SectionProps & BoxProps) => (
    <Box className={'toggle-section'} component={'section'} {...props} />
  ),
)(({ upperFixed, contentLength, hasAddForm, spread }) => {
  const coverHeight = 2;
  const formHeight = hasAddForm ? 2.2 : 0;
  const itemHeight = 1.75;
  const contentHeight = spread ? formHeight + contentLength * itemHeight : 0;
  const listContainsFour = coverHeight + formHeight + itemHeight * 4;
  const minHeight = Math.min(coverHeight + contentHeight, listContainsFour);

  return css`
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-y: auto;
    min-height: ${minHeight + 'rem'};
    /* max-height: 50%; */
    margin-bottom: ${upperFixed ? 'auto' : null};
    &::-webkit-scrollbar {
      display: none;
    }
  `;
});

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
  readonly selectedHandler: SelectedHandler;
};

type Extractor<T> = (props: ContentProps<T>) => React.ReactElement;

type PropsToggleList<T> = {
  readonly upperFixed?: boolean;
  readonly title: string;
  readonly contentList: Array<T>;
  readonly type: ToggleListType;
  readonly ListItemGenerator: Extractor<T>;
  readonly selectedHandler: SelectedHandler;
  readonly addButton?: boolean;
};

function ToggleList<T extends ContentType>({
  title,
  contentList,
  type,
  ListItemGenerator,
  selectedHandler,
  upperFixed,
  addButton,
}: PropsToggleList<T>) {
  const [spread, setSpread] = useState(true);
  const [activateForm, setActivateForm] = useState(false);
  const [, workDispatch] = useWorkStore();

  const onAddButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setActivateForm(!activateForm);
  };

  const optinalAddButton = addButton && (
    <IconButton onClick={onAddButton} sx={{ padding: 0, marginLeft: 'auto' }}>
      {activateForm ? (
        <RemoveIcon fontSize="small" />
      ) : (
        <AddIcon fontSize="small" />
      )}
    </IconButton>
  );

  const listCover = (
    <StyledToggleCover
      expandIcon={<ExpandMoreIcon />}
      onClick={() => setSpread((state) => !state)}
    >
      {`${title} #${contentList.length}`}
      {optinalAddButton}
    </StyledToggleCover>
  );

  const optionalAddForm = activateForm ? <AddForm title={title} /> : null;

  const listContent = (
    <StyledToggleContent>
      {contentList.map((content, index) => {
        return (
          <ListItemGenerator
            key={index}
            content={content}
            index={index}
            dispatch={workDispatch}
            selectedHandler={selectedHandler}
          />
        );
      })}
    </StyledToggleContent>
  );

  return (
    <StyledToggleSection
      upperFixed={upperFixed}
      contentLength={contentList.length}
      hasAddForm={activateForm}
      spread={spread}
    >
      <StyledToggleList aria-controls={`${title} object list`}>
        {listCover}
        {optionalAddForm}
        {listContent}
      </StyledToggleList>
    </StyledToggleSection>
  );
}

export default ToggleList;
