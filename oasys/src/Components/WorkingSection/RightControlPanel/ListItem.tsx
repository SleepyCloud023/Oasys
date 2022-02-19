import React, { useState } from 'react';
import { BoxObject, ExtraInfo } from '../types';
import { Chip, Divider, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';

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

  const optionalDivider = index > 0 && <Divider light />;
  const numberChip = <Chip label={ObjectId} size={'small'} />;
  const textMainInfo = `
    ${'Class: '}${ClassName.length > 0 ? ClassName : '[]'}
    `;

  // const textExtraInfo = Extra.map(
  //   (extraObject: ExtraInfo) => `${extraObject.key}: ${extraObject.value}`,
  // );

  console.log(`Bbox: ${Bbox}`);
  console.log(`Extra: `, Extra);

  return (
    <StyledItemContainer key={index}>
      {optionalDivider}
      {numberChip}
      <StyledItemText primary={textMainInfo} />
    </StyledItemContainer>
  );
}

export function ClassListItem(className: string, index: number) {
  const content = `[${index}]: ${className}`;
  return content;
}

export function TagListItem(tagName: string, index: number) {
  const content = `[${index}]: ${tagName}`;
  return content;
}
