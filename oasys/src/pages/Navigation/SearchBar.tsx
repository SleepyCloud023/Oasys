/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Box, BoxProps } from '@mui/material';
import { css, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const searchBarHeight = 2;
const iconHeightRatio = 0.5;

const StyledSection = styled((props: BoxProps) => (
  <Box component="section" {...props} />
))`
  flex: 50 1 0;
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  color: gray;
`;

const styleSearchBar = css`
  width: 30rem;
  height: ${searchBarHeight}rem;
  border: none;
  border-radius: ${0.5 * searchBarHeight}rem;
  padding-inline-start: ${(0.8 + iconHeightRatio) * searchBarHeight}rem;
`;

const styleSearchIcon = css`
  position: absolute;
  left: ${0.5 * searchBarHeight}rem;
  width: ${iconHeightRatio * searchBarHeight}rem;
  height: ${iconHeightRatio * searchBarHeight}rem;
`;

// type SearchBarProps = {};
function SearchBar() {
  return (
    <StyledSection>
      <input
        css={styleSearchBar}
        name="search-bar"
        placeholder="type dataset or image file name"
      />
      <SearchIcon css={styleSearchIcon} />
    </StyledSection>
  );
}
//
export default SearchBar;
