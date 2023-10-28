'use client';

import { useRef } from 'react';
import styled from 'styled-components';

// (0): Threads 처럼 구성하기 (아래에서 위로 나오는 것 처럼)

const Modal = ({ children, onCollapse }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  const onBackgroundClick = (e: any) => {
    if (backgroundRef.current === e.target) {
      onCollapse();
    }
  };

  return (
    <Background ref={backgroundRef} onClick={onBackgroundClick}>
      <Container>
        <CloseBtnContainer onClick={onCollapse}>
          <CloseBtnWrapper>
            <CloseBtn></CloseBtn>
          </CloseBtnWrapper>
        </CloseBtnContainer>
        <div>
          <Wrapper>{children}</Wrapper>
        </div>
      </Container>
    </Background>
  );
};

const Wrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const Background = styled.div`
  position: fixed;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5); // rgba(0, 0, 0, 0.65);
`;
const CloseBtnContainer = styled.div`
  cursor: ns-resize;
  position: sticky;
  top: 0;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  padding: 0.75rem; // padding: 0.75rem 0 0 0 /  padding: 0.75rem
`;
const CloseBtn = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  background-color: rgb(219, 219, 219);
  border-radius: 2px;
  box-sizing: border-box;
  height: 4px;
  width: 48px;
`;

const Container = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  flex-direction: column;
  bottom: 0;
  background: #fff;
  width: 100%;
  max-height: 87.5%;
  overflow-y: scroll;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;

  box-shadow: 0 -10.5px 21px rgba(0, 0, 0, 0.08);
`;

export default Modal;
