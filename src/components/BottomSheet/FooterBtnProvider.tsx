import styled from 'styled-components';

const FooterBtnWrapperProvider = styled.div`
  display: flex;
  justify-content: center;
`;

const FooterBtnProvider = styled.button`
  all: unset;
  cursor: pointer;
  will-change: transform;

  transition-property: transform background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  background-color: rgb(245, 245, 245);
  box-sizing: border-box;
  border: 1px solid rgb(203, 213, 225);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 640px;
  height: 3rem;
  &:active {
    background-color: rgb(235, 235, 235);
    transform: scale(0.96);
  }
  span {
    font-size: 1rem;
    line-height: 130%;
    font-weight: 600;
  }
`;

export { FooterBtnWrapperProvider, FooterBtnProvider };
