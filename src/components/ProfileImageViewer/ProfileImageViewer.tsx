// like Threads

'use cleint';
import styled from 'styled-components';
import CancelIcon from 'assets/CancelIcon.svg';

const ProfileImageViewer = ({ src, onClick }) => {
  return (
    <Container onClick={onClick}>
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
  top: 2.5rem;
  left: 2.5rem;
`;
const CancelBtn = styled.button`
  all: unset;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent; // rgb(239, 239, 239)

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }
  svg {
    height: 1rem;
  }
`;
const ProfileImage = styled.div`
  all: unset;
  cursor: pointer;

  background-color: #fff;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* transition-property: transform;
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
const Container = styled.div`
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
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
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
