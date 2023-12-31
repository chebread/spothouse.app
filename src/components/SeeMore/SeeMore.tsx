// 차단한 사람, 팔로워, 팔로잉 하는 사람 확인 가능
// 아직 차단기능은 추가하지 않음 (기술적으로 어려움)
// 타인의 팔로워, 팔로잉도 확인 불가능 (비공개 기능을 특정 사용자가 켰다면)
// (0): 공유 기능 추가
// (0): 팔로우 기능 추가

import BottomSheet from 'components/BottomSheet';

const SeeMore = ({ open, onDismiss, uid }) => {
  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      header="더보기"

      // snapPoints={({ maxHeight }) => maxHeight - maxHeight / 15}
    >
      <h2>팔로워</h2>
      <h2>팔로잉</h2>
    </BottomSheet>
  );
};

export default SeeMore;
