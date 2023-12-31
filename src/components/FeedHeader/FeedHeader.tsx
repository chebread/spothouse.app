import { currentUserDataAtom } from 'atom/authAtom';
import {
  addedPosAtom,
  centerPosAtom,
  currentPosAtom,
  isApproximatePosLoadedAtom,
  isFocusedAtom,
  isHeaderVisibleAtom,
  isMenuClickedAtom,
  isMovedAtom,
  isPostSearchClickedAtom,
  isUploadClickedAtom,
  zoomLevelAtom,
} from 'atom/feedAtom';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
// svgs
import NavigationIcon from 'assets/NavigationIcon.svg';
import FilledNavigationIcon from 'assets/FilledNavigationIcon.svg';
import MenuIcon from 'assets/MenuIcon.svg';
import AddIcon from 'assets/AddIcon.svg';
import NotificationsIcon from 'assets/NotificationsIcon.svg';
import SearchIcon from 'assets/SearchIcon.svg';
import BackIcon from 'assets/BackIcon.svg';
import styled from 'styled-components';
import disableHighlight from 'styles/disableHighlight';
import disableSelection from 'styles/disableSelection';
import Link from 'next/link';

// (0): loading 하는거 idb 체크해서 안하게 하자!

const FeedHeader = () => {
  const searchParams = useSearchParams();
  const paramRoutes = searchParams
    .toString()
    .substring(0, searchParams.toString().indexOf('='));
  const isNeededBack = paramRoutes === 'user' || paramRoutes === 'post'; // 유저가 없으면 이거 작동시키면 안됨. => 아니다 그냥 프로필 에서 404 때려버리자.

  const paramUsername = searchParams.get('u');
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [isMoved, setIsMoved] = useAtom(isMovedAtom); // 사용자가 지도를 움직일 시 => 다시 데이터 로딩 필요!
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom); // 사용자 위치 추적
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const [isPostSearchClicked, setIsPostSearchClicked] = useAtom(
    isPostSearchClickedAtom
  );
  // (0): uploadedPos로 바꾸자!
  const [addedPos, setAddedPos] = useAtom(addedPosAtom); // 추가한 위치 정보
  const [isApproximatePosLoaded, setIsApproximatePosLoaded] = useAtom(
    isApproximatePosLoadedAtom
  ); // 대략 위치 로드시
  const [isUploadClicked, setIsUploadClicked] = useAtom(isUploadClickedAtom); // 위치 추가 토글
  const [currentPos, setCurrentPos] = useAtom(currentPosAtom); // 현재 위치 정보
  const [centerPos, setCenterPos] = useAtom(centerPosAtom); // Map center 위치 정보
  const [zoomLevel, setZoomLevel] = useAtom(zoomLevelAtom);
  const [isHeaderVisble, setIsHeaderVisible] = useAtom(isHeaderVisibleAtom);

  // 메뉴 클릭시
  const onMenu = (e: any) => {
    e.stopPropagation();
    setIsMenuClicked(!isMenuClicked);
  };
  // 게시물 검색 클릭시
  const onPostSearch = () => {
    setIsPostSearchClicked(true);
    // test code //
    setTimeout(() => {
      // 데이터 페칭 완료시
      setIsPostSearchClicked(false);
      setIsMoved(false);
    }, 1000);
  };
  // 현재 위치 추가
  const onUpload = async () => {
    if (isApproximatePosLoaded) {
      setIsUploadClicked(true);
      const lat = currentPos.lat;
      const lng = currentPos.lng;
      setCenterPos({
        lat: lat,
        lng: lng,
      }); // focus on
      setAddedPos({
        lat: lat,
        lng: lng,
      });
    }
  };
  // 현재 위치 추적 기능
  const onFocus = () => {
    if (isApproximatePosLoaded) {
      setCenterPos({
        lat: currentPos.lat,
        lng: currentPos.lng,
      });
    }
  };

  return (
    <Container onClick={() => setIsMenuClicked(false)}>
      <BtnWrapper>
        <LeftBtnWrapper>
          <BackBtn
            as={Link}
            href="/"
            $visible={!isHeaderVisble} // (0): 개선할꺼면 개선하기
          >
            <BackIcon />
          </BackBtn>
          <MenuBtn $visible={isHeaderVisble} onClick={onMenu}>
            <MenuIcon />
          </MenuBtn>
          <ProfileBtn
            $visible={isHeaderVisble}
            href={
              paramUsername === currentUserData.username
                ? '/'
                : `/?user=${currentUserData.username}`
            }
            style={{
              backgroundImage: `url(${currentUserData.profileFileUrl})`,
            }}
          ></ProfileBtn>
        </LeftBtnWrapper>
        <CenterBtnWrapper>
          {isMoved ? (
            <PostSearchBtnWrapper>
              <PostSearchBtn
                onClick={(e: any) => {
                  onPostSearch();
                }}
              >
                {isPostSearchClicked ? '읽어들이는 중...' : '이 지역 검색'}
              </PostSearchBtn>
            </PostSearchBtnWrapper>
          ) : (
            ''
          )}
        </CenterBtnWrapper>
        <RightBtnWrapper>
          <UploadBtn $visible={isHeaderVisble} onClick={onUpload}>
            <AddIcon />
          </UploadBtn>
          <SearchBtn $visible={isHeaderVisble} as={Link} href="/?search">
            <SearchIcon />
          </SearchBtn>
          <FocusBtn
            onClick={(e: any) => {
              onFocus();
              setIsFocused(true);
            }}
          >
            {isFocused ? <FilledNavigationIcon /> : <NavigationIcon />}
          </FocusBtn>
        </RightBtnWrapper>
      </BtnWrapper>
    </Container>
  );
};

const Container = styled.div``;
const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftBtnWrapper = styled(BtnWrapper)`
  left: 0;
  position: absolute;
  z-index: 1;
  margin: 1rem 0 0 1.5rem;
  gap: 0.5rem;
`;
const RightBtnWrapper = styled(BtnWrapper)`
  right: 0;
  position: absolute;
  z-index: 1;
  margin: 1rem 1.5rem 0 0;
  gap: 0.5rem;
`;
const CenterBtnWrapper = styled(BtnWrapper)`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;
const PostSearchBtnWrapper = styled.div`
  will-change: transform;

  z-index: 1;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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
const PostSearchBtn = styled.button`
  all: unset;
  cursor: pointer;
  will-change: transform;
  ${disableHighlight}
  ${disableSelection}

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }
  padding: 0 1rem;
  background-color: #fff;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 2rem;
    width: 2rem;
  }
  border-radius: 9999px;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  font-weight: 500;
`;

const RoundBtn = styled.button`
  all: unset;
  cursor: pointer;
  will-change: transform;
  ${disableHighlight}
  ${disableSelection}

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }

  background-color: #fff;
  /* height: 3rem;
  width: 3rem;
  @media (min-width: 640px) {
    height: 3.5rem;
    width: 3.5rem;
  } */
  height: 3.5rem;
  width: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 2rem;
    width: 2rem;
  }
  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;
const BackBtn = styled(RoundBtn)<{
  $visible: boolean;
}>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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
const UploadBtn = styled(RoundBtn)<{
  $visible: boolean;
}>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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
const SearchBtn = styled(RoundBtn)<{
  $visible: boolean;
}>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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
  /* @media (max-width: 639.9px) {
    display: none;
  } */
`;
// const MobileSearchBtn = styled(RoundBtn)`
//   @media (min-width: 640px) {
//     display: none;
//   }
// `;
const ProfileBtn = styled(Link)<{
  $visible: boolean;
}>`
  all: unset;
  cursor: pointer;
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }
  background-color: #fff;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  height: 3.5rem;
  width: 3.5rem;
  justify-content: center;
  align-items: center;
  svg {
    height: 2rem;
    width: 2rem;
  }
  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;

const MenuBtn = styled(RoundBtn)<{
  $visible: boolean;
}>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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

const FocusBtn = styled(RoundBtn)`
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
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

export default FeedHeader;
