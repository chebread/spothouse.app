import { atom } from 'jotai';

const isApproximatePosLoadedAtom = atom(false);
const isMovedAtom = atom(false);
const isCurrentPosLoadedAtom = atom(false);
const isFocusedAtom = atom(false);
const isDataLoadedAtom = atom(false);
const isUploadClickedAtom = atom(false);
const isMenuClickedAtom = atom(false);
const isSearchClickedAtom = atom(false);
const isPostSearchClickedAtom = atom(false);

const currentPosAtom = atom<{ lat: number; lng: number }>({
  lat: 37.575857,
  lng: 126.976805,
}); // 현재 위치 정보
const addedPosAtom = atom<{ lat: number; lng: number }>({
  lat: 37.575857,
  lng: 126.976805,
});
const centerPosAtom = atom<{ lat: number; lng: number }>({
  lat: 37.575857,
  lng: 126.976805,
});
const zoomLevelAtom = atom(4);
const isHeaderVisibleAtom = atom(true);

export {
  isApproximatePosLoadedAtom,
  isMovedAtom,
  centerPosAtom,
  currentPosAtom,
  addedPosAtom,
  zoomLevelAtom,
  isCurrentPosLoadedAtom,
  isFocusedAtom,
  isDataLoadedAtom,
  isUploadClickedAtom,
  isMenuClickedAtom,
  isSearchClickedAtom,
  isPostSearchClickedAtom,
  isHeaderVisibleAtom,
};
