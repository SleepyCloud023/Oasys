import React from 'react';
import Counter from './Counter';
import MockData from './MainView2.json';

function App() {
  const { ObjectList, ClassList, TagList } = MockData;

  function objectExtractor(element, index) {
    const { ClassName, Bbox } = element.Object;
    const [x1, y1] = Bbox[0];
    const [x2, y2] = Bbox[1];
    return [x1, y1, x2 - x1, y2 - y1];
  }

  const boxElements = ObjectList.map((content, index) => {
    const fullContent = objectExtractor(content, index);
    console.log(fullContent);
    return (
      <rect
        x={fullContent[0]}
        y={fullContent[1]}
        width={fullContent[2]}
        height={fullContent[3]}
        stroke="green"
        fill="transparent"
        stroke-width="3"
      />
    );
  });

  return (
    <div>
      <svg version="1.1" baseProfile="full" width="320" height="204">
        <image href="img/test_image.jpg" />
        {boxElements}
      </svg>
    </div>
  );
}

export default App;
