import React, { useState } from 'react';
import { BoxObject } from '../types';
import { Chip, Divider, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

export const ListCover = `
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

export const StyledListCover = styled(ListItem)({
  backgroundColor: 'azure',
  borderRadius: '3px',
  border: '1px solid black',
  color: 'black',
  minHeight: '1.5rem',
  fontStyle: 'italic',
  fontSize: '1rem',
  padding: '1px 4px',
  alignItems: 'center',
  /* 커버 상단 고정 */
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

export const ListElement = `
  background-color: gray;
  border: 1px solid black;
  border-radius: 3px;
  color: white;
  font-size: 0.75rem;
  padding: auto 4px;
`;

export const StyledListElement = styled(ListItem)({
  backgroundColor: 'gray',
  border: '1px solid black',
  borderRadius: '3px',
  color: 'white',
  fontSize: '0.75rem',
  padding: 'auto 4px',
});

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
    <>
      <StyledListElement key={index} sx={{ px: '4px' }}>
        {index > 0 && <Divider light />}
        <Chip label={ObjectId} size={'small'} />
        <ListItemText sx={{ mx: '6px' }} primary={text_primary} />
      </StyledListElement>
    </>
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
