import { CustomOverlayMap, Map as MapProvider } from 'react-kakao-maps-sdk';
import useMap from 'lib/map/useMap';
import {
  addedPosAtom,
  centerPosAtom,
  currentPosAtom,
  isApproximatePosLoadedAtom,
  isCurrentPosLoadedAtom,
  isFocusedAtom,
  isMenuClickedAtom,
  isMovedAtom,
  isUploadClickedAtom,
  zoomLevelAtom,
} from 'atom/mapAtom';
import { useAtom } from 'jotai';
import styled from 'styled-components';

const FeedMap = () => {
  useMap(); // Map 사용
  const [centerPos, setCenterPos] = useAtom(centerPosAtom);
  const [currentPos, setCurrentPos] = useAtom(currentPosAtom); // 현재 위치 정보
  const [addedPos, setAddedPos] = useAtom(addedPosAtom); // 추가한 위치 정보
  const [zoomLevel, setZoomLevel] = useAtom(zoomLevelAtom);
  const [isMoved, setIsMoved] = useAtom(isMovedAtom); // 사용자가 지도를 움직일 시 => 다시 데이터 로딩 필요!
  const [isFocused, setIsFocused] = useAtom(isFocusedAtom); // 사용자 위치 추적
  const [isUploadClicked, setIsUploadClicked] = useAtom(isUploadClickedAtom); // 위치 추가 토글
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const [isCurrentPosLoaded, setIsCurrentPosLoaded] = useAtom(
    isCurrentPosLoadedAtom
  ); // 현재 위치 로드시
  const [isApproximatePosLoaded, setIsApproximatePosLoaded] = useAtom(
    isApproximatePosLoadedAtom
  ); // 대략 위치 로드시

  const onZoomChanged = (map: any) => {
    setZoomLevel(map.getLevel());
  };
  const onCenterPosChanged = (map: any) => {
    setCenterPos({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };
  // 움직임 발생시
  const onMove = () => {
    setIsMoved(true); // 움직임이 발생했음을 알림
    setIsFocused(false); // 자동 추적 기능 비활성화
  };
  // 현재 외 위치 추가 함수
  // const onAddSpot = async (_t: any, mouseEvent: any) => {
  //   setIsUploadClicked(true);
  //   const lat = mouseEvent.latLng.getLat();
  //   const lng = mouseEvent.latLng.getLng();
  //   setCenterPos({
  //     lat: lat,
  //     lng: lng,
  //   }); // focus on
  //   setAddedPos({
  //     lat: lat,
  //     lng: lng,
  //   });
  // };
  // 위치 실시간 추적시
  const onFocus = () => {
    if (isApproximatePosLoaded) {
      setCenterPos({
        lat: currentPos.lat,
        lng: currentPos.lng,
      });
    }
  };

  return (
    <>
      <MapViewer
        center={centerPos}
        level={zoomLevel}
        onZoomChanged={onZoomChanged}
        onCenterChanged={onCenterPosChanged}
        onZoomStart={onMove}
        onDragStart={onMove}
        disableDoubleClickZoom={true}
        // onDoubleClick={onAddSpot}
        onClick={() => {
          setIsMenuClicked(false);
        }}
        isPanto
      >
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
const MapViewer = styled(MapProvider)`
  position: absolute;
  height: 100%;
  width: 100%;
`;

export default FeedMap;
