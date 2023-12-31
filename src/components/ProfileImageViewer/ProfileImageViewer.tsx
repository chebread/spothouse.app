// like Threads

'use cleint';
import styled from 'styled-components';
import CancelIcon from 'assets/CancelIcon.svg';

const ProfileImageViewer = ({ visible, onDismiss, src }) => {
  return (
    <Container $visible={visible} onClick={onDismiss}>
      <CancelBtnWrapper>
        <CancelBtn>
          <CancelIcon />
        </CancelBtn>
      </CancelBtnWrapper>

      <ProfileImage
        style={{
          backgroundImage: `url(${src})`,
        }}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      ></ProfileImage>
    </Container>
  );
};
const CancelBtnWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem 0 0 1.5rem;
`;
const CancelBtn = styled.button`
  all: unset;
  top: 0;
  left: 0;
  cursor: pointer;
  will-change: transform;

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }

  background-color: transparent;
  height: 3.5rem;
  width: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 1rem;
    width: 1rem;
  }
  border-radius: 50%;
`;
const ProfileImage = styled.div`
  all: unset;
  will-change: transform;

  background-color: #fff;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /*
  cursor: pointer;
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  } */

  min-height: 262px;
  min-width: 262px;

  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;
const Container = styled.div<{ $visible: boolean }>`
  will-change: transform;

  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  position: fixed;
  z-index: 2;
  // 제일 높은 위치의 z-index
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(2rem);
  -webkit-backdrop-filter: blur(2rem);
  background-color: rgba(255, 255, 255, 0.55); // 0.85
  justify-content: center;
  align-items: center;

  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
  animation-name: smooth;

  @keyframes smooth {
    from {
      opacity: 0;
      transform: scale(0);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
export default ProfileImageViewer;
