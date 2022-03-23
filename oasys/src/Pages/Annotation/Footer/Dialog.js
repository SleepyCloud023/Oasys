import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity: 1;    
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0px);
  }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  /* 애니메이션 */
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  /* 사라질 때 애니메이션 */
  ${({ disappear }) =>
    disappear &&
    css`
      animation-direction: reverse;
    `}
`;
/* animation: name duration timing-function delay iteration-count direction fill-mode; */

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background-color: white;
  border-radius: 2px;

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.25rem;
  }
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;
  /* 사라질 때 애니메이션 */
  ${({ disappear }) =>
    disappear &&
    css`
      animation-direction: reverse;
    `}
`;

// animation-name: ${slideDown};
const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;

  button + button {
    margin-left: 0.5rem;
  }
`;

function Dialog({
  children,
  dialogOn,
  setDialogOn,
  title,
  confirmText,
  cancelText,
}) {
  const [animate, setAnimate] = useState(false);
  const [preDialog, setPreDialog] = useState(false);

  useEffect(() => {
    // 확인or취소 버튼 클릭, Dialog 밖의 영역 클릭
    if (preDialog && !dialogOn) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 250);
    }
    setPreDialog(dialogOn);
  }, [dialogOn, preDialog]);

  if (!dialogOn && !animate) return null;
  return (
    <DarkBackground disappear={!dialogOn}>
      <DialogBlock disappear={!dialogOn}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <button onClick={() => setDialogOn(false)}>{cancelText}</button>
          <button onClick={() => setDialogOn(false)}>{confirmText}</button>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  title: '저장하시겠습니까?',
  confirmText: '확인',
  cancelText: '취소',
};

export default Dialog;
