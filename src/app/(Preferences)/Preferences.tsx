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

  const onDismiss = (e: any) => {
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
    <>
      <h2>계정</h2>
      <button onClick={onLogout}>로그아웃하기</button>
      <button onClick={confirmWithdrawal}>서비스 탈퇴하기</button>
      <h2>정보</h2>
      <p>
        <Link href="/?s=t">서비스 이용약관</Link>
      </p>
      <p>
        <Link href="/?s=p">개인정보 취급 방침</Link>
      </p>
      <p>
        <Link href="/?s=l">오픈소스 라이센스</Link>
      </p>
      <p>
        <Link href="https://github.com/chebread" target="_self">
          만든이
        </Link>
      </p>
    </>
  );
};

export default Preferences;
