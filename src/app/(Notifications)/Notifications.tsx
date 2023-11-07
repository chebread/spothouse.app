import { useRouter } from 'next/navigation';
import Modal from 'components/Modal';
import BottomSheet from 'components/BottomSheet';

// 팔로워가 늘어나면 여기 알림에 뜸
// 팔로잉하는 사람의 게시물이 추가되면 여기에 뜸
// 특정 알림 옆으로 밀면 없에기 가능

const Notifications = ({ open }) => {
  const router = useRouter();

  const onDismiss = () => {
    router.push('/');
  };

  return (
    <BottomSheet open={open} onDismiss={onDismiss} header="알림">
      <h2>팔로워 알림</h2>
      <p>새로운 팔로워가 없습니다.</p>
    </BottomSheet>
  );
};

export default Notifications;
