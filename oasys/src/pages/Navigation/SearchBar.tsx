/** @jsxImportSource @emotion/react */
import { css } from '@mui/material/styles';
import * as React from 'react';

const styleSearchBar = css`
  margin: auto;
`;

// type SearchBarProps = {};
function SearchBar() {
  return (
    <>
      <input css={styleSearchBar} name="search-bar" placeholder="search" />
    </>
  );
}
//
export default SearchBar;
