import { ACTION } from '../types';
import { BoxContent, CategoryContent, TagContent } from './RightControlPanel';

export type SelectedInfo = {
  selectedBoxSet: Set<number>;
  selectedCategorySet: Set<string>;
  selectedTagSet: Set<string>;
  isOwnEvent: boolean;
};

export type ToggleListType = 'box' | 'category' | 'tag';

export type ContentType = BoxContent | CategoryContent | TagContent;

type CheckInput =
  | { type: 'box'; boxObject: BoxContent }
  | { type: 'category'; categoryName: CategoryContent }
  | { type: 'tag'; tagName: TagContent };

type SelectInput =
  | {
      type: 'box';
      newSelected: Set<number>;
    }
  | { type: 'category'; categoryName: string }
  | { type: 'tag'; tagName: string };

class SelectedHandler {
  private selectedBoxSet: Set<number>;
  private selectedCategorySet: Set<string>;
  private selectedTagSet: Set<string>;
  private setSelectedInfo: React.Dispatch<React.SetStateAction<SelectedInfo>>;
  private workDispatch: React.Dispatch<ACTION>;

  constructor(
    { selectedBoxSet, selectedCategorySet, selectedTagSet }: SelectedInfo,
    setSelectedInfo: React.Dispatch<React.SetStateAction<SelectedInfo>>,
    workDispatch: React.Dispatch<ACTION>,
  ) {
    this.selectedBoxSet = selectedBoxSet;
    this.selectedCategorySet = selectedCategorySet;
    this.selectedTagSet = selectedTagSet;
    this.setSelectedInfo = setSelectedInfo;
    this.workDispatch = workDispatch;
  }

  checkSelected(content: CheckInput) {
    switch (content.type) {
      case 'box':
        return this.selectedBoxSet.has(content.boxObject.id);
      case 'category':
        return this.selectedCategorySet.has(content.categoryName);
      case 'tag':
        return this.selectedTagSet.has(content.tagName);
    }
  }

  onSelect(content: SelectInput) {
    switch (content.type) {
      case 'box':
        this.updateSelectedBox(content.newSelected);
        this.clearSelectedCategory();
        break;
      case 'category':
        this.updateSelectedBox(content.categoryName);
        this.updateSelectedCategory(content.categoryName);
        break;
      case 'tag':
        console.log('tag selected:', content.tagName);
        this.clearSelectedCategory();
        return;
      default:
        throw new Error('Undefined itemType on ListItem select');
    }
  }

  private updateSelectedBox(newSelected: Set<number> | string) {
    this.workDispatch({
      type: 'UPDATE_SELECTED',
      newSelected: newSelected,
    });
    this.setSelectedInfo((prevSelectedInfo) => ({
      ...prevSelectedInfo,
      isOwnEvent: true,
    }));
  }

  private updateSelectedCategory(categoryName: string) {
    this.setSelectedInfo((prevSelectedInfo) => ({
      ...prevSelectedInfo,
      selectedCategorySet: new Set<string>([categoryName]),
    }));
  }
  private clearSelectedCategory() {
    this.setSelectedInfo((prevSelectedInfo) => ({
      ...prevSelectedInfo,
      selectedCategorySet: new Set<string>(),
    }));
  }
}

export default SelectedHandler;
