import styled from 'styled-components';
import MenuIcon from 'assets/MenuIcon.svg';
import AddIcon from 'assets/AddIcon.svg';
import SearchIcon from 'assets/SearchIcon.svg';
import NotificationsIcon from 'assets/NotificationsIcon.svg';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { BottomSheet as BottomSheetProvider } from 'react-spring-bottom-sheet';
import useResize from 'hooks/useResize';
import Link from 'next/link';
import {
  isMenuClickedAtom,
  isSearchClickedAtom,
  isUploadClickedAtom,
} from 'atom/mapAtom';
import { useAtom } from 'jotai';

// 640px 미만 부터 켜짐

// 게시물 업로드
// 검색
// 프로필
// 알림
// 메뉴

const FeedTabBar = () => {
  const { width } = useResize();
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const [isSearchClicked, setIsSearchClicked] = useAtom(isSearchClickedAtom);
  const [isUploadClicked, setIsUploadClicked] = useAtom(isUploadClickedAtom);

  const onMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };
  const onSearch = () => {
    setIsSearchClicked(!isSearchClicked);
  };
  const onUploadSpot = () => {
    setIsUploadClicked(true);
  };

  return (
    <Container open={width < 640} blocking={false}>
      <Wrapper>
        <>
          <Nav onClick={onMenu}>
            <MenuIcon />
          </Nav>
        </>
        <>
          <Nav onClick={onSearch}>
            <SearchIcon />
          </Nav>
        </>
        <>
          <Nav onClick={onUploadSpot}>
            <AddIcon />
          </Nav>
        </>
        <>
          <Nav as={Link} href="/?n">
            <NotificationsIcon />
          </Nav>
        </>
        <>
          <Nav as={Link} href="/?u=unseulson">
            <Profile
              style={{
                backgroundImage: `url(https://newjeans.kr/imgs/getup/photos/NJ_GetUp_23.jpg)`,
              }}
            ></Profile>
          </Nav>
        </>
      </Wrapper>
    </Container>
  );
};

const Container = styled(BottomSheetProvider)`
  // 모달
  [data-rsbs-overlay] {
    z-index: 1;
    box-shadow: 0 -10.5px 21px rgba(0, 0, 0, 0.08);
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
  // 배경 설정
  [data-rsbs-backdrop] {
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  // 헤더
  [data-rsbs-header] {
    display: none;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Nav = styled.button`
  all: unset;
  cursor: pointer;

  will-change: transform;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem;
  svg {
    height: 2rem;
    width: 2rem;
  }

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }
  &:first-child {
    border-top-left-radius: 1.5rem;
  }
  &:last-child {
    border-top-right-radius: 1.5rem;
  }
`;

const Profile = styled.div`
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background-color: #fff;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;

export default FeedTabBar;
