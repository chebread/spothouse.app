import { currentUserDataAtom } from 'atom/authAtom';
import {
  addedPosAtom,
  centerPosAtom,
  currentPosAtom,
  isAddedAtom,
  isApproximatePosLoadedAtom,
  isFocusedAtom,
  isMenuClickedAtom,
  isMovedAtom,
} from 'atom/mapAtom';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
// svgs
import NavigationIcon from 'assets/NavigationIcon.svg';
import FilledNavigationIcon from 'assets/FilledNavigationIcon.svg';
import MenuIcon from 'assets/MenuIcon.svg';
import AddIcon from 'assets/AddIcon.svg';
import { useState } from 'react';
import styled from 'styled-components';
import disableHighlight from 'styles/disableHighlight';
import disableSelection from 'styles/disableSelection';
import Link from 'next/link';

const FeedHeader = () => {
  const searchParams = useSearchParams();
  const paramUsername = searchParams.get('u');
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [isMoved, setIsMoved] = useAtom(isMovedAtom); // 사용자가 지도를 움직일 시 => 다시 데이터 로딩 필요!
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom); // 사용자 위치 추적
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const [addedPos, setAddedPos] = useAtom(addedPosAtom); // 추가한 위치 정보
  const [isApproximatePosLoaded, setIsApproximatePosLoaded] = useAtom(
    isApproximatePosLoadedAtom
  ); // 대략 위치 로드시
  const [isAdded, setIsAdded] = useAtom(isAddedAtom); // 위치 추가 토글
  const [currentPos, setCurrentPos] = useAtom(currentPosAtom); // 현재 위치 정보
  const [centerPos, setCenterPos] = useAtom(centerPosAtom); // Map center 위치 정보

  // 메뉴 클릭시
  const onMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };
  // 검색 클릭시
  const onSearch = () => {
    setIsSearchClicked(true);
    // test code //
    setTimeout(() => {
      // 데이터 페칭 완료시
      setIsSearchClicked(false);
      setIsMoved(false);
    }, 1000);
  };
  // 현재 위치 추가
  const onAddCurrentSpot = async () => {
    if (isApproximatePosLoaded) {
      setIsAdded(true);
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
  const onFocus = () => {
    if (isApproximatePosLoaded) {
      setCenterPos({
        lat: currentPos.lat,
        lng: currentPos.lng,
      });
    }
  };

  return (
    <BtnWrapper>
      <LeftBtnWrapper>
        <MenuBtn
          onClick={(e: any) => {
            onMenu();
          }}
        >
          <MenuIcon />
        </MenuBtn>
        <ProfileBtn
          href={
            paramUsername === currentUserData.username
              ? '/'
              : `?u=${currentUserData.username}`
          }
          style={{
            backgroundImage: `url(${currentUserData.profileFileUrl})`,
          }}
        ></ProfileBtn>
      </LeftBtnWrapper>
      <CenterBtnWrapper>
        {isMoved ? (
          <SearchBtnWrapper>
            <SearchBtn
              onClick={(e: any) => {
                onSearch();
              }}
            >
              {isSearchClicked ? '읽어들이는 중...' : '이 지역 검색'}
            </SearchBtn>
          </SearchBtnWrapper>
        ) : (
          ''
        )}
      </CenterBtnWrapper>
      <RightBtnWrapper>
        <AddBtn onClick={onAddCurrentSpot}>
          <AddIcon />
        </AddBtn>
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
  );
};

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
const SearchBtnWrapper = styled.div`
  // (0): 나타날때 부드럽게 나타나기, 사라질때는 부드럽게 하지 않아도 됨
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
const SearchBtn = styled.button`
  all: unset;
  cursor: pointer;
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
  @media (min-width: 639.9px) {
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
const AddBtn = styled(RoundBtn)``;
const ProfileBtn = styled(Link)`
  all: unset;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

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

const MenuBtn = styled(RoundBtn)``;

const FocusBtn = styled(RoundBtn)``;

export default FeedHeader;
