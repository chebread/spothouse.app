'use client';

import useMap from 'lib/map/useMap';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import NavigationIcon from 'assets/NavigationIcon.svg';
import FilledNavigationIcon from 'assets/FilledNavigationIcon.svg';
import MenuIcon from 'assets/MenuIcon.svg';
import AddIcon from 'assets/AddIcon.svg';
import Link from 'next/link';
import { currentUserDataAtom } from 'atom/authAtom';
import { useAtom } from 'jotai';
import Loading from 'app/(Loading)';
import { useSearchParams } from 'next/navigation';
import { isApproximatePosLoadedAtom } from 'atom/mapAtom';
import MenuModal from 'components/MenuModal';
import AddSpotModal from 'components/AddSpotModal';
import Router from 'components/Router';
import disableHighlight from 'styles/disableHighlight';
import disableSelection from 'styles/disableSelection';

// (0): /#u/(USERNAME) 의 형태로 바꾸기
// (0): 플러스 누르면 현재위치의 스팟이 추가됨. 지도상에서 꾹 누르거나 더블 클릭하면 그 위치에서 스팟이 추가됨! (장소만 다르지 기능적 측면은 완전일치함) => 현재위치 추가의 국한되지 않기!
// (0): 현 위치 추가후 그 추가한 위치는 오프라인상에서 추가됨(상태에 추가됨 (서버는 이미 추가도미)), 완전히 다시 불러오는 것은 아님을 유의 (비용 절감 위해)
// (0): 지도 다시 로딩시에만 다시 불러옴 ("이 지역 검색")
// (0): markerId = postId (같이 공유함)
// (0): 일단 하나의 사진만 게시물에 포함하고, 나중에 다중 사진 포함시키기 (그다지 어려운거 아니니까, 썸네일만 추가하기!)
// (0): 실시간 위치 추적기능 만들기 (포커싱)
// min-width: 639.9px 부터 모바일로 간주함

const Feed = () => {
  useMap(); // Map 사용

  const searchParams = useSearchParams();
  const paramRoutes = searchParams
    .toString()
    .substring(0, searchParams.toString().indexOf('='));
  const paramUsername = searchParams.get('u');
  const paramPosts = searchParams.get('p');
  const [level, setLevel] = useState<number>(4); // level 정보
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.575857,
    lng: 126.976805,
  }); // Map center 위치 정보
  const [currentPos, setCurrentPos] = useState<{ lat: number; lng: number }>({
    lat: 37.575857,
    lng: 126.976805,
  }); // 현재 위치 정보
  const [addedPos, setAddedPos] = useState<{ lat: number; lng: number }>({
    lat: 37.575857,
    lng: 126.976805,
  }); // 추가한 위치 정보
  const [isApproximatePosLoaded, setIsApproximatePosLoaded] = useAtom(
    isApproximatePosLoadedAtom
  ); // 대략 위치 로드시
  const [isCurrentPosLoaded, setIsCurrentPosLoaded] = useState<boolean>(false); // 현재 위치 로드시
  const [isFocused, setIsFocused] = useState<boolean>(false); // 사용자 위치 추적
  const [watcher, setWatcher] = useState<any>();
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 되었는가? => isMoved시 false됨
  const [isMoved, setIsMoved] = useState<boolean>(false); // 사용자가 지도를 움직일 시 => 다시 데이터 로딩 필요!
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false); // Search 버튼 클릭시
  const [isAdded, setIsAdded] = useState<boolean>(false); // 위치 추가 토글
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [markers, setMarkers] = useState({});
  const [personalMarkers, SetPersonalMarkers] = useState({}); // 사용자 자신이 추가되고 삭제되고 수정된 마커들 (다시 불러오지 않고 자신이 한 것은 이렇게 한다!)

  useEffect(() => {
    const onLoad = async () => {
      // get outline current position from ip address
      // 여기서 한 번 데이터 패칭, 정확한 지도에서 한 번 패칭 함
      fetch('') // https://ipapi.co/json/ / http://ip-api.com/json
        .then(response => response.json())
        .then(json => {
          const { latitude, longitude } = json;
          setCenter(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
          }));
          setCurrentPos(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude,
          }));
          setIsApproximatePosLoaded(true);
        })
        .catch(error => {
          handleGeolocationError(error);
          setIsApproximatePosLoaded(true);
        });
      // get accurate current position
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            handleGeolocation(position);
            setIsCurrentPosLoaded(true);
          },
          error => {
            handleGeolocationError(error);
            setIsCurrentPosLoaded(true);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000,
          }
        );
      } else {
        handleGeolocationError('Geolocation을 사용할 수 없습니다');
        setIsCurrentPosLoaded(true);
      }
    };
    onLoad();
  }, []);

  const handleGeolocation = (position: any) => {
    const currentLat = position.coords.latitude;
    const currentLng = position.coords.longitude;
    setCenter(prev => ({
      ...prev,
      lat: currentLat,
      lng: currentLng,
    }));
    setCurrentPos(prev => ({
      ...prev,
      lat: currentLat,
      lng: currentLng,
    }));
  };
  const handleGeolocationError = (error: any) => {
    // console.log(error);
  };
  const onFocus = () => {
    if (isApproximatePosLoaded) {
      setCenter({
        lat: currentPos.lat,
        lng: currentPos.lng,
      });
    }
  };
  const onZoomChanged = (map: any) => {
    setLevel(map.getLevel());
  };
  const onCenterChanged = (map: any) => {
    setCenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };
  const onSearch = () => {
    // test code //
    setIsSearchClicked(true);
    setTimeout(() => {
      // 데이터 페칭 완료시
      setIsSearchClicked(false);
      setIsMoved(false);
    }, 1000);
  };
  // 움직임 발생시 동작하는 함수
  const onMove = () => {
    setIsMoved(true); // 움직임이 발생했음을 알림
    setIsFocused(false); // 자동 추적 기능 비활성화
  };
  // 현재 위치 추가 함수
  const onAddCurrentSpot = async () => {
    if (isApproximatePosLoaded) {
      setIsAdded(true);
      const lat = currentPos.lat;
      const lng = currentPos.lng;
      setCenter({
        lat: lat,
        lng: lng,
      }); // focus on
      setAddedPos({
        lat: lat,
        lng: lng,
      });
    }
  };
  // 현재 외 위치 추가 함수
  const onAddSpot = async (_t: any, mouseEvent: any) => {
    setIsAdded(true);
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setCenter({
      lat: lat,
      lng: lng,
    }); // focus on
    setAddedPos({
      lat: lat,
      lng: lng,
    });
  };
  const onMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <Container>
        {isApproximatePosLoaded ? (
          <>
            <MapViewer
              center={center}
              level={level}
              onZoomChanged={onZoomChanged}
              onCenterChanged={onCenterChanged}
              onZoomStart={onMove}
              onDragStart={onMove}
              disableDoubleClickZoom={true}
              onDoubleClick={onAddSpot}
              onClick={() => {
                setIsMenuClicked(false);
              }}
              isPanto
            >
              {/* {isAdded ? (
                // 추가한 장소 마커 (임시 마커라고 생각하자)
                // <CustomOverlayMap position={addedPos}>
                //   <AddedPosMarker onClick={onFocus}></AddedPosMarker>
                // </CustomOverlayMap>
                <MapMarker // 마커를 생성합니다
                  position={addedPos}
                  clickable={false}
                />
              ) : (
                ''
              )} */}
              {isCurrentPosLoaded ? (
                <>
                  <CustomOverlayMap position={currentPos}>
                    <CurrentPosMarker onClick={onFocus}></CurrentPosMarker>
                  </CustomOverlayMap>
                </>
              ) : (
                ''
              )}
            </MapViewer>
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
            <MenuModal visible={isMenuClicked} onCollapse={onMenu} />
            {/* {(() => {
              // Router 컴포넌트로 전환함
              switch (paramRoutes) {
                case 'u':
                  return paramUsername != '' ? <Profile /> : '';
                case 's':
                  return <Settigns />;
                case 'n':
                  return <Notifications />;
                case 'p':
                  return paramPosts != '' ? '' : '';
                case 'policy':
                  return <Policy />;
                default:
                  return null;
              }
            })()} */}
            <Router />
            {/* 모달 */}
            <AddSpotModal
              open={isAdded}
              lat={addedPos.lat}
              lng={addedPos.lng}
              onDismiss={() => setIsAdded(!isAdded)}
            />
          </>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

const CurrentPosMarker = styled.div`
  height: 1rem;
  width: 1rem;
  background-color: rgb(66, 132, 243);
  opacity: 0.9;
  border-radius: 50%;
  border: white solid 3px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
`;
const AddedPosMarker = styled.div`
  height: 1rem;
  width: 1rem;
  background-color: #000;
  opacity: 0.9;
  border-radius: 50%;
  border: white solid 3px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.08);
`;

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

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const MapViewer = styled(Map)`
  position: absolute;
  height: 100%;
  width: 100%;
`;
export default Feed;
