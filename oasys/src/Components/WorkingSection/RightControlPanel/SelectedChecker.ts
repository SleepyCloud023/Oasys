import { BoxContent, CategoryContent, TagContent } from './RightControlPanel';

export type SelectedInfo = {
  selectedBoxSet: Set<number>;
  selectedCategorySet: Set<string>;
  selectedTagSet: Set<string>;
};

export type ToggleListType = 'box' | 'category' | 'tag';

export type ContentType = BoxContent | CategoryContent | TagContent;

type CheckInput =
  | { type: 'box'; boxObject: BoxContent }
  | { type: 'category'; categoryName: CategoryContent }
  | { type: 'tag'; tagName: TagContent };

class SelectedChecker {
  selectedBoxSet: Set<number>;
  selectedCategorySet: Set<string>;
  selectedTagSet: Set<string>;

  constructor({
    selectedBoxSet,
    selectedCategorySet,
    selectedTagSet,
  }: SelectedInfo) {
    this.selectedBoxSet = selectedBoxSet;
    this.selectedCategorySet = selectedCategorySet;
    this.selectedTagSet = selectedTagSet;
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
}

export default SelectedChecker;
