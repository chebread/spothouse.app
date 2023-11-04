'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { currentUserDataAtom } from 'atom/authAtom';
import { useAtom } from 'jotai';
import Loading from 'app/(Loading)';
import {
  addedPosAtom,
  centerPosAtom,
  currentPosAtom,
  isApproximatePosLoadedAtom,
  isCurrentPosLoadedAtom,
  isDataLoadedAtom,
  isFocusedAtom,
  isMenuClickedAtom,
  isMovedAtom,
  isPostSearchClickedAtom,
  isSearchClickedAtom,
  isUploadClickedAtom,
  zoomLevelAtom,
} from 'atom/mapAtom';
import MenuModal from 'components/MenuModal';
import UploadSpotModal from 'components/UploadSpotModal';
import FeedHeader from 'components/FeedHeader';
import FeedMap from 'components/FeedMap';
import SearchModal from 'app/(Search)';
import FeedTabBar from 'components/FeedTabBar';

// (0): /#u/(USERNAME) 의 형태로 바꾸기
// (0): 플러스 누르면 현재위치의 스팟이 추가됨. 지도상에서 꾹 누르거나 더블 클릭하면 그 위치에서 스팟이 추가됨! (장소만 다르지 기능적 측면은 완전일치함) => 현재위치 추가의 국한되지 않기!
// (0): 현 위치 추가후 그 추가한 위치는 오프라인상에서 추가됨(상태에 추가됨 (서버는 이미 추가도미)), 완전히 다시 불러오는 것은 아님을 유의 (비용 절감 위해)
// (0): 지도 다시 로딩시에만 다시 불러옴 ("이 지역 검색")
// (0): markerId = postId (같이 공유함)
// (0): 일단 하나의 사진만 게시물에 포함하고, 나중에 다중 사진 포함시키기 (그다지 어려운거 아니니까, 썸네일만 추가하기!)
// (0): 실시간 위치 추적기능 만들기 (포커싱)
// min-width: 640px 부터 모바일로 간주함
// (0): 여기서 Feed map data 로딩하고 Feed에 뿌려주기 (이곳은 완전한 유저와 환경일때만 보이는 곳이니까) => 로드하고 idb에 모든 정보 저장함. 데이터 변경시에만 불러옴 (전체적인 api 변경 인식)

const Feed = () => {
  const [level, setLevel] = useAtom(zoomLevelAtom); // level 정보
  const [center, setCenter] = useAtom(centerPosAtom); // Map center 위치 정보
  const [currentPos, setCurrentPos] = useAtom(currentPosAtom); // 현재 위치 정보
  const [addedPos, setAddedPos] = useAtom(addedPosAtom); // 추가한 위치 정보
  const [isApproximatePosLoaded, setIsApproximatePosLoaded] = useAtom(
    isApproximatePosLoadedAtom
  ); // 대략 위치 로드시
  const [isCurrentPosLoaded, setIsCurrentPosLoaded] = useAtom(
    isCurrentPosLoadedAtom
  ); // 현재 위치 로드시
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom); // 사용자 위치 추적
  const [watcher, setWatcher] = useState<any>();
  const [isDataLoaded, setIsDataLoaded] = useAtom(isDataLoadedAtom); // 데이터 로딩 되었는가? => isMoved시 false됨
  const [isMoved, setIsMoved] = useAtom(isMovedAtom); // 사용자가 지도를 움직일 시 => 다시 데이터 로딩 필요!
  // const [isSearchClicked, setIsSearchClicked] = useAtom(isSearchClickedAtom); // Search 버튼 클릭시
  const [isUploadClicked, setIsUploadClicked] = useAtom(isUploadClickedAtom); // 위치 추가 토글
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [markers, setMarkers] = useState({});
  const [personalMarkers, SetPersonalMarkers] = useState({}); // 사용자 자신이 추가되고 삭제되고 수정된 마커들 (다시 불러오지 않고 자신이 한 것은 이렇게 한다!)

  useEffect(() => {
    const onLoad = async () => {
      // get outline current position from ip address
      // 여기서 한 번 데이터 패칭, 정확한 지도에서 한 번 패칭 함
      fetch('https://ipapi.co/json/') // https://ipapi.co/json/ / http://ip-api.com/json
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

  return (
    <>
      <Container>
        {isApproximatePosLoaded ? (
          // 대략위치 로드시
          <>
            {/* 지도 */}
            <FeedMap />
            {/* 헤더 */}
            <FeedHeader />
            {/* 탭바 */}
            <FeedTabBar />
            {/* 모달 */}
            <MenuModal />
            <UploadSpotModal
              open={isUploadClicked}
              lat={addedPos.lat}
              lng={addedPos.lng}
              onDismiss={() => setIsUploadClicked(!isUploadClicked)}
            />
            {/* <SearchModal
              open={isSearchClicked}
              onDismiss={() => setIsSearchClicked(!isSearchClicked)}
            /> */}
          </>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export default Feed;
