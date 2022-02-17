import React, { useState } from 'react';
import { BoxObject } from '../types';
import { Chip, Divider, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

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
      {ClassName.length > 0 ? ClassName : '[]'}
    </>
  );
  // const text_extra = true && Extra.map((extraObject) => extraObject.text);
  const new_content = (
    <StyledListElement key={index}>
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
