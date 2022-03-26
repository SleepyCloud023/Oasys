import React from 'react';
import { ACTION, WorkState } from './types';

interface KeyboardInterface {
  updateSelected: React.KeyboardEventHandler<HTMLElement>;
}

class KeyboardEventHandler implements KeyboardInterface {
  private workStore: WorkState;
  private workDispatch: React.Dispatch<ACTION>;

  constructor(workStore: WorkState, workDispatch: React.Dispatch<ACTION>) {
    this.workStore = workStore;
    this.workDispatch = workDispatch;
  }

  updateSelected: React.KeyboardEventHandler<HTMLElement> = (event) => {
    console.log(`key: ${event.key} pressed`);
    console.log(this.workStore.selectedBoxList);
    console.log(this.workStore.category_list);
  };
}

export default KeyboardEventHandler;
