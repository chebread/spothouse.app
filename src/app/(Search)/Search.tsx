import BottomSheet from 'components/BottomSheet';
import { useRouter } from 'next/navigation';

// 인스타 그 팔로잉 확인 하는 것 처럼 모드 변경하기!

const SearchModal = () => {
  const router = useRouter();

  const onDismiss = () => {
    router.push('/');
  };

  return (
    <BottomSheet open={true} onDismiss={onDismiss} header="검색">
      <h2>유저 검색</h2>
      <h2>게시물 검색</h2>
    </BottomSheet>
  );
};

export default SearchModal;
