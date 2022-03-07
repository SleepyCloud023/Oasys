import * as React from 'react';
import { WorkStore } from '../WorkingSection';

function useWorkStore() {
  const workStore = React.useContext(WorkStore);
  if (workStore === null) {
    throw new Error('Cannot find WorkStore Provider!');
  }
  return workStore;
}

export default useWorkStore;
