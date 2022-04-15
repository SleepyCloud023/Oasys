/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { Link as RouterLink, To } from 'react-router-dom';

type PropsLink = {
  to: To;
} & MuiLinkProps;

function Link(props: PropsLink) {
  return <MuiLink underline="none" component={RouterLink} {...props} />;
}

export default Link;
