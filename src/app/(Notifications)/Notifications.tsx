import { useRouter } from 'next/navigation';
import Modal from 'components/Modal';

// 팔로워가 늘어나면 여기 알림에 뜸
// 팔로잉하는 사람의 게시물이 추가되면 여기에 뜸
// 특정 알림 옆으로 밀면 없에기 가능

const Notifications = () => {
  const router = useRouter();
  const onCollapse = () => {
    router.push('/');
  };

  return <></>;
};

export default Notifications;
