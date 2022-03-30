import React from 'react';
import { ACTION, WorkState } from './types';

interface KeyboardEventListener {
  (event: KeyboardEvent): any;
}

class KeyboardEventHandler {
  private workState: WorkState;
  private workDispatch: React.Dispatch<ACTION>;

  constructor(workState: WorkState, workDispatch: React.Dispatch<ACTION>) {
    this.workState = workState;
    this.workDispatch = workDispatch;
  }

  editSelected: KeyboardEventListener = (event) => {
    const pushedCategory = this.getPushedCategory(event.key);

    if (pushedCategory) {
      this.workDispatch({
        type: 'EDIT_SELECTED',
        newCategory: pushedCategory,
        isAppend: false,
      });
    }
    console.log(`pushed key: ${pushedCategory}`);
    console.log(this.workState.box_object_list);
  };

  // return -1 when failed
  getPushedNumber = (rawString: string) => {
    if (isNotNumber(rawString)) {
      return -1;
    }

    const pushedNumber = parseInt(rawString) - 1;
    if (
      pushedNumber < 0 ||
      pushedNumber >= this.workState.category_list.length
    ) {
      return -1;
    }

    return pushedNumber;
  };

  getPushedCategory = (key: string) => {
    const pushedNumber = this.getPushedNumber(key);
    const category =
      pushedNumber !== -1
        ? this.workState.category_list[pushedNumber]
        : undefined;

    return category;
  };
}

function isNotNumber(rawString: string) {
  if (typeof rawString !== 'string' || isNaN(Number(rawString))) {
    return true;
  } else {
    return false;
  }
}

export default KeyboardEventHandler;
