const FeedMap = () => {
  return (
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

export default FeedMap;
