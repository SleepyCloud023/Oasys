/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ObjectIdGenerator } from '../WorkingSection';

function useObjectIdGenerator() {
  const objectIdGenerator = React.useContext(ObjectIdGenerator);
  // NOTE: 여기에서 예외처리, 디버그 등등 가능
  return objectIdGenerator;
}

export default useObjectIdGenerator;
