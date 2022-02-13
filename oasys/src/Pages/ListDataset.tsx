import React from 'react';
import { Link } from 'react-router-dom';

function ListDataset() {
  return (
    <>
      <h1>Display list of Dataset Here</h1>
      <Link to={'/annotation'}>Annotation</Link>
    </>
  );
}

export default ListDataset;
