import { atom } from 'jotai';

const isApproximatePosLoadedAtom = atom(false);
const isMovedAtom = atom(false);
const isCurrentPosLoadedAtom = atom(false);
const isFocusedAtom = atom(false);
const isDataLoadedAtom = atom(false);
const isAddedAtom = atom(false);
const isMenuClickedAtom = atom(false);

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
  isAddedAtom,
  isMenuClickedAtom,
};
