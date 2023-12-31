import LogoSvg from 'assets/LogoSvg.svg';
import CreatorSvg from 'assets/CreatorSvg.svg';
import styled from 'styled-components';
import disableSelection from 'styles/disableSelection';
import themedPalette from 'styles/themes/themedPalette';
import LoadingSvg from 'assets/LoadingSvg.svg';
// import BackgroundImage from 'assets/BackgroundImage.jpg';

const X = () => {
  return (
    <Container
    // style={{
    //   backgroundImage: `url(${BackgroundImage.src})`,
    // }}
    >
      <LogoWrapper>
        <Logo>
          <LogoSvg />
        </Logo>
      </LogoWrapper>
      <Wrapper>
        <LoadingWrapper>
          <Load>
            <LoadingSvg />
          </Load>
        </LoadingWrapper>
        <InfoWrapper>
          <Info>
            <CreatorSvg />
          </Info>
        </InfoWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  ${disableSelection}
  z-index: 1;
  position: fixed;
  height: 100%;
  width: 100%;
  ${disableSelection}
  background-color: ${themedPalette.background_color};

  svg {
    transition-property: height;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
`;
const LogoWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  svg {
    height: 1.5rem;
    @media (min-width: 640px) {
      height: 2rem;
    }
    path {
      fill: ${themedPalette.color};
    }
  }
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 1rem;
`;
const InfoWrapper = styled.div``;
const LoadingWrapper = styled.div``;
const Info = styled.div`
  svg {
    height: 0.6rem;
    @media (min-width: 640px) {
      height: 0.75rem;
    }
    path {
      fill: ${themedPalette.color};
    }
    /* path {
      fill: rgb(191, 191, 191); // #748293 // #67778a
    } */
  }
`;
const Load = styled.div`
  will-change: transform;

  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  height: 1.25rem;
  @media (min-width: 640px) {
    height: 1.5rem;
  }

  svg {
    height: 1.25rem;
    @media (min-width: 640px) {
      height: 1.5rem;
    }
  }

  animation-duration: 0.8s;
  animation-timing-function: steps(8);
  animation-iteration-count: infinite;
  animation-name: spin;

  @keyframes spin {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(540deg);
    }
  }
`;

export default X;
