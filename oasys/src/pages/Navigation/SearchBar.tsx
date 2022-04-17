/** @jsxImportSource @emotion/react */
import { Box, BoxProps } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import * as React from 'react';

const StyledSection = styled((props: BoxProps) => (
  <Box component="section" {...props} />
))`
  flex: 50 1 0;
`;

const styleSearchBar = css`
  margin: auto;
`;

// type SearchBarProps = {};
function SearchBar() {
  return (
    <StyledSection>
      <input css={styleSearchBar} name="search-bar" placeholder="search" />
    </StyledSection>
  );
}
//
export default SearchBar;
