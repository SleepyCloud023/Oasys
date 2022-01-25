import React, { cloneElement } from "react";
import styled, { css } from "styled-components";

// params= (areaPercent: number)
// 이 함수를 호출하는 태그와 sibling 태그들의 영역 퍼센트 합은 100이 되어야 함
const areaPortion = css`
  ${(props) => {
    // console.log(props);
    const areaPercent = props.areaPercent;
    return (
      areaPercent &&
      css`
        flex: ${areaPercent} 0 0;
      `
    );
  }}
`;

// flex: flex-grow flex-shrink flex-basis

const header = styled.header`
  background-color: gray;
  flex: 15 0 0;
  ${areaPortion}
  display: flex;
`;

const footer = styled.footer`
  background-color: gray;
  flex: 15 0 0;
  ${areaPortion}
  display: flex;
`;

const workingSection = styled.div`
  /* 색상 */
  background-color: #252c2c;

  /* 정렬 */
  flex: 70 0 0;
  ${areaPortion}
  display: flex;
`;

const sectionMap = {
  header,
  footer,
  workingSection,
};

function Container({ children, sectionType, ...rest }) {
  // TODO: type-checking
  const NewSection = sectionMap[sectionType];
  const wrapper_children = React.Children.map(children, (child, idx) =>
    cloneElement(child, { areaPortion })
  );

  return (
    <NewSection sectionType={sectionType} areaPortion={areaPortion} {...rest}>
      {wrapper_children}
    </NewSection>
  );
}

export default Container;
