import LogoSvg from 'assets/LogoSvg.svg';
import CreatorSvg from 'assets/CreatorSvg.svg';
import styled from 'styled-components';
import disableSelection from 'styles/disableSelection';
// import BackgroundImage from 'assets/BackgroundImage.jpg';

const Loading = () => {
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
      <InfoWrapper>
        <Info>
          <CreatorSvg />
        </Info>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  ${disableSelection}
  position: fixed;
  height: 100%;
  width: 100%;
  // disable scroll
  overflow: hidden;
  touch-action: none;

  /* background-repeat: repeat;
  background-size: auto auto; */
`;
const Info = styled.div`
  svg {
    height: 0.6rem;
    @media (min-width: 639.9px) {
      height: 0.75rem;
    }
    /* path {
      fill: rgb(191, 191, 191); // #748293 // #67778a
    } */
  }
  margin: 1rem;
`;
const InfoWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
    @media (min-width: 639.9px) {
      height: 2rem;
    }
  }
`;

export default Loading;
