import React, { useState } from 'react';
import { BoxObject } from '../types';
import {
  AccordionSummary,
  Box,
  Chip,
  Divider,
  ListItem,
  ListItemText,
} from '@mui/material';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import { css } from '@emotion/react';

export const StyledListCover = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: theme.palette.divider,
  borderRadius: '3px',
  minHeight: '1.5rem',
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: '1rem',
  padding: '1px 4px',
  alignItems: 'center',
  /* 커버 상단 고정 */
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

export const StyledListElement = styled(ListItem)(({ theme }) => ({
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '3px',
  fontSize: '0.75rem',
  padding: '0 4px',
}));

export function BoxListItem(boxObject: BoxObject, index: number) {
  // const [hover, setHover] = useState(false);
  const { ObjectId, ClassName, Bbox, Extra } = boxObject;
  const text_primary = (
    <>
      {'Class: '}
      {ClassName.length > 0 ? ClassName : 'Empty'}
    </>
  );
  // const text_extra = true && Extra.map((extraObject) => extraObject.text);
  const new_content = (
    <StyledListElement key={index} sx={{ px: '4px' }}>
      {index > 0 && <Divider light />}
      <Chip label={ObjectId} size={'small'} />
      <ListItemText sx={{ mx: '6px' }} primary={text_primary} />
    </StyledListElement>
  );
  return new_content;
}
export function ClassListItem(className: string, index: number) {
  const content = `[${index}]: ${className}`;
  return content;
}
export function TagListItem(tagName: string, index: number) {
  const content = `[${index}]: ${tagName}`;
  return content;
}
