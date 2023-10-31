'use client';

import { currentUserDataAtom, isLoggedInAtom } from 'atom/authAtom';
import BottomSheet from 'components/BottomSheet';
import useConfirm from 'hooks/useConfirm';
import { useAtom } from 'jotai';
import deleteUser from 'lib/supabase/deleteUser';
import logoutUser from 'lib/supabase/logoutUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Preferences = () => {
  const confirmWithdrawal = useConfirm(
    '서비스를 탈퇴하시겠습니까?',
    () => {
      deleteUser({
        uid: currentUserData,
      });
      setIsLoggedIn(false);
      router.push('/');
      alert('삭제됨');
    },
    () => {}
  );
  const router = useRouter();
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const onDismiss = () => {
    router.push('/');
  };
  const onLogout = async () => {
    await logoutUser({
      success: () => {
        setIsLoggedIn(false);
        router.push('/');
      },
      error: () => {
        alert('로그아웃중 오류가 발생하였습니다.');
      },
    });
  };

  return (
    <BottomSheet open={true} onDismiss={onDismiss}>
      <h2>계정</h2>
      <button onClick={onLogout}>로그아웃하기</button>
      <button onClick={confirmWithdrawal}>서비스 탈퇴하기</button>
    </BottomSheet>
  );
};

export default Preferences;
