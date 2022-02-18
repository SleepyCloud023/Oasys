import React, { useState } from 'react';
import { BoxObject } from '../types';
import { Chip, Divider, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledListElement_legacy = styled(ListItem)(({ theme }) => ({
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '3px',
  fontSize: '0.75rem',
  padding: '0 4px',
}));

const StyledItemContainer = styled(ListItem)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 3px;
  font-size: 0.75rem;
  padding: 4px 8px;
`;

const StyledItemText = styled(ListItemText)`
  margin: auto 6px;
`;

export function BoxListItem(boxObject: BoxObject, index: number) {
  // const [hover, setHover] = useState(false);
  const { ObjectId, ClassName, Bbox, Extra } = boxObject;
  const text_primary = `
    ${'Class: '}${ClassName.length > 0 ? ClassName : '[]'}
    `;
  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={ObjectId} size={'small'} />;
  console.log(`Bbox: ${Bbox}`);
  console.log(`Extra: `, Extra);

  // const text_extra = true && Extra.map((extraObject) => extraObject.text);
  const new_content = (
    <StyledItemContainer key={index}>
      {optionalDivider}
      {numberChip}
      <StyledItemText primary={text_primary} />
    </StyledItemContainer>
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
