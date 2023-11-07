import BottomSheet from 'components/BottomSheet';
import searchUsername from 'lib/supabase/searchUsername';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 인스타 그 팔로잉 확인 하는 것 처럼 모드 변경하기!
// (0): 검색기능은 제공하지 않음. 그냥 피드에서 사용자들을 검색해야함 (나중에 검색기능 추가)

const SearchModal = ({ open }) => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const onDismiss = () => {
    router.push('/');
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      header="검색"
      blocking={false}
    >
      <h2>유저 검색</h2>
      <input
        type="text"
        onChange={e => setUsername(e.target.value)}
        value={username}
      />
      <button onClick={() => searchUsername(username)}>검색</button>
      <h2>게시물 검색</h2>
    </BottomSheet>
  );
};

export default SearchModal;
